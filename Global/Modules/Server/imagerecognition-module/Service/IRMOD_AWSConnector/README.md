# Image recognition metrics
The `imagerecognition_metrics.py` file is a script which queries the jolokia agent on the localhost. This is usually started by FirstSpirit JVM as a java agent.

## Overview
The following endpoints are checked by the script:

- /read/de.espirit.cxt.modules.firstspirit.imagerecognition.server:name=metrics

The output of the agent is expected to look like this:

```json
{
  "request": {
    "mbean": "de.espirit.cxt.modules.firstspirit.imagerecognition.server:name=metrics",
    "type": "read"
  },
  "value": {
    "TransferredByesToS3": 0,
    "NumberOfApiCalls": 0
  },
  "timestamp": 1614603435,
  "status": 200
}
```

Required parameters to call the script are:
- hostname
- database
- user
- password
- int_hostname
- customer_name

## Unit tests
This script is mostly unit tested to return expected results.. See `test_imagerecognition_metrics.py` for more information. 