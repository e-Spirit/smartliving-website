# Smartliving Website

This is the FirstSpirit Smartliving Website Reference Demo project.

## Installation

The project can be imported to your FirstSpirit server using the FSDevTools. FsDevTools can be found here: https://github.com/e-Spirit/FSDevTools/releases<br/>

After installation you can use the following command to import the project to your FirstSpirit server:

`fs-cli import -c [connection_mode] -port [port] -u "[user_name]" -pwd "[user_password]" -h [hostname] -p "[project_name]" -lm "*:[db_layer_name]" -sd [local_sync_directory]`<br/><br/>

If you want to create a new db layer mapping and don't want to import the project using an existing db layer, please use `-lm "*:CREATE_NEW"`<br/><br/>


### Example

`fs-cli import -c HTTP -port 8000 -u "Admin" -pwd "Admin" -h myhost.com -p "SmartLiving Website Reference" -lm "*:FirstSpiritDBA" -sd /home/smartliving-website`

## Legal Notices
The FirstSpirit Smartliving Website Reference Demo is a product of Crownpeak Technology GmbH, Dortmund, Germany.
The FirstSpirit Smartliving Website Reference Demo is subject to the Apache-2.0 license.

## Disclaimer
This document is provided for information purposes only. Crownpeak may change the contents hereof without notice.
This document is not warranted to be error-free, nor subject to any other warranties or conditions, whether expressed
orally or implied in law, including implied warranties and conditions of merchantability or fitness for a particular
purpose. Crownpeak specifically disclaims any liability with respect to this document and no contractual obligations
are formed either directly or indirectly by this document. The technologies, functionality, services, and processes
described herein are subject to change without notice.