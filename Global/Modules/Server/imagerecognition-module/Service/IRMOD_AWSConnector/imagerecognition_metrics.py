#!/usr/bin/env python
import datetime
import json
import logging
import optparse

import requests
from influxdb import InfluxDBClient, __version__ as influxdb_version


def read_data():
    metrics = send_jolokia_request(
        '/read/de.espirit.cxt.modules.firstspirit.imagerecognition.server:name=metrics')

    return metrics["value"]


def send_jolokia_request(endpoint):
    """
    Send a prepared request to jolokia.

    :param endpoint: Usually the name of the bean to check for. Should contain a prefixed '/'.
    :return: JSON data of the response as dict
    :rtype: dict
    """
    protocol = 'http'
    hostname = 'localhost'
    port = 7777

    check_url = protocol + '://' + hostname + ':' + str(
        port) + '/jolokia' + endpoint

    response = None
    try:
        logging.info('Send metrics request to jolokia api.')
        response = requests.get(check_url)
    except requests.RequestException:
        logging.error(
            'Request failed for an unknown reason. Service or host down?')
        raise SystemExit(1)

    if response is None:
        logging.error('Response is empty.')
        raise SystemExit(1)
    elif response.status_code != 200:
        logging.error('Request failed with HTTP ' + str(
            response.status_code) + '. Reason: ' + response.reason)
        raise SystemExit(1)

    response_as_dict = {}
    try:
        response_as_dict = json.loads(response.text)
    except Exception:
        logging.error('Response could not be parsed: No JSON')
        raise SystemExit(1)

    return response_as_dict


def push_data(data, options):
    """
    Takes data points with metrics and pushes those to influxdb.
    :param data:
    :param options:
    :return:
    """
    data_points = []
    total_data_point = dict(
        measurement='image_recognition',
        tags=dict(
            hostname=options.int_hostname,
            customer=options.customer_name,
        ),
        time=str(datetime.datetime.utcnow()),
        fields=dict(
            transferred_bytes_to_s3=data['TransferredBytesToS3'],
            number_of_api_calls=data['NumberOfApiCalls']
        )
    )
    data_points.append(total_data_point)

    logging.info('Establish connection to influxdb.')
    influxdb = connect_to_influxdb(options.hostname, options.user, options.password, options.database)
    logging.info('Write data point into table.')
    influxdb.write_points(data_points)
    influxdb.close()


def connect_to_influxdb(hostname, user, password, database):
    """
    This will connect to influxDB
    :return: InfluxDBClient
    """
    args = dict(
        host=hostname,
        port=8086,
        username=user,
        password=password,
        database=database,
        ssl=False,
        verify_ssl=True,
        timeout=5
    )
    influxdb_api_version = tuple(influxdb_version.split("."))
    if influxdb_api_version >= ('4', '1', '0'):
        # retries option is added in version 4.1.0
        args.update(retries=3)

    return InfluxDBClient(**args)


if __name__ == '__main__':
    parser = optparse.OptionParser(conflict_handler='resolve',
                                   description='This script queries the local jolokia agent on a FirstSpirit host to gather ImageRecognition metrics and sent those to an InfluxDB.')

    parser.add_option('-h', '--hostname', type='string', dest='hostname',
                      help='Hostname of the InfluxDB to be used for pushing metrics.')
    parser.add_option('-d', '--database', type='string', dest='database',
                      help='Database name in which metrics are stored.')
    parser.add_option('-u', '--user', type='string', dest='user',
                      help='InfluxDB Username to use for login authentication.')
    parser.add_option('-p', '--password', type='string', dest='password',
                      help='Password of the provided InfluxDB user in plain text.')

    parser.add_option('-i', '--inthost', type='string', dest='int_hostname',
                      help='Hostname for which the metrics are collected.')
    parser.add_option('-c', '--customername', type='string', dest='customer_name',
                      help='Customer name for which the metrics are collected.')

    (options, p_args) = parser.parse_args()

    if not options.hostname:
        parser.error("Parameter 'hostname' missing")
    if not options.database:
        parser.error("Parameter 'database' missing")
    if not options.user:
        parser.error("Parameter 'user' missing")
    if not options.password:
        parser.error("Parameter 'password' missing")
    if not options.int_hostname:
        parser.error("Parameter 'int_hostname' missing")
    if not options.customer_name:
        parser.error("Parameter 'customer_name' missing")

    metric_data = read_data()
    push_data(metric_data, options)
