#!/usr/bin/env python
import json
import unittest
from argparse import Namespace
from unittest import mock

from freezegun import freeze_time

import imagerecognition_metrics as ir_metrics


class TestImageRecognitionMetrics(unittest.TestCase):

    @mock.patch('requests.get')
    def test_read_data_success(self, mock_get):
        dict_response = {
            "request": {
                "mbean": "de.espirit.cxt.modules.firstspirit.imagerecognition.server:name=metrics",
                "type": "read"
            },
            "value": {
                "TransferredByesToS3": 669966,
                "NumberOfApiCalls": 123456
            },
            "timestamp": 1614603435,
            "status": 200
        }

        mock_get.return_value.status_code = 200
        mock_get.return_value.text = json.dumps(dict_response)

        expected_result = {
            "TransferredByesToS3": 669966,
            "NumberOfApiCalls": 123456
        }

        actual_result = ir_metrics.read_data()

        self.assertEqual(expected_result, actual_result)

    @mock.patch('requests.get')
    def test_send_jolokia_request_success(self, mock_get):
        expected_result = {
            "request": {
                "mbean": "de.espirit.cxt.modules.firstspirit.imagerecognition.server:name=metrics",
                "type": "read"
            },
            "value": {
                "TransferredByesToS3": 669966,
                "NumberOfApiCalls": 123456
            },
            "timestamp": 1614603435,
            "status": 200
        }

        mock_get.return_value.status_code = 200
        mock_get.return_value.text = json.dumps(expected_result)

        endpoint = '/somwhere_in_time'
        allow_fail = True

        actual_result = ir_metrics.send_jolokia_request(endpoint, allow_fail)

        self.assertEqual(expected_result, actual_result)

    @freeze_time('2020-02-20 00:00:00')
    @mock.patch('influxdb.client.InfluxDBClient.__init__')
    @mock.patch('influxdb.client.InfluxDBClient.write_points')
    @mock.patch('influxdb.client.InfluxDBClient.close')
    def test_push_data_success(self, mock_influx_db_client, mock_write_points,
        mock_close):
        mock_influx_db_client.return_value = None
        mock_write_points.return_value = None
        mock_close.return_value = None

        # Note: mocks optparse args
        options = Namespace()
        setattr(options, 'int_hostname', 'int_hostname')
        setattr(options, 'customer_name', 'customer_name')
        setattr(options, 'hostname', 'hostname')
        setattr(options, 'user', 'user')
        setattr(options, 'password', 'password')
        setattr(options, 'database', 'database')

        data = {
            "TransferredByesToS3": 987654,
            "NumberOfApiCalls": 996699
        }

        expected_arg = [dict(
            measurement='image_recognition',
            tags=dict(
                hostname='int_hostname',
                customer='customer_name',
                project='all'
            ),
            time=str('2020-02-20 00:00:00'),
            fields=dict(
                transferred_bytes_to_s3=data["TransferredByesToS3"],
                number_of_api_calls=data["NumberOfApiCalls"]
            )
        )]

        actual_result = ir_metrics.push_data(data, options)

        mock_write_points.assert_called_once()
        mock_write_points.assert_called_with(expected_arg)

    @mock.patch('influxdb.client.InfluxDBClient.__init__')
    def test_connect_to_influxdb_success(self, mock_influx_db_client):
        mock_influx_db_client.return_value = None

        args = dict(
            host='hostname',
            port=8086,
            username='username',
            password='password',
            database='database',
            ssl=False,
            verify_ssl=True,
            timeout=5,
            retries=3
        )

        actual_result = ir_metrics.connect_to_influxdb('hostname', 'username',
                                                       'password', 'database')

        mock_influx_db_client.assert_called_once()
        mock_influx_db_client.assert_called_with(**args)


if __name__ == '__main__':
    unittest.main()
