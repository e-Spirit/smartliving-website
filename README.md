# SmartLiving Website documentation
The new SmartLiving website is a reference implementation for the static generation of a website. It serves as a guideline and offers best practices for developers.
This also means: it is not a product, but rather provides example code and structure. 
The project uses Tailwindcss as CSS framework as basis. 

## Overview
The project has 2 possible settings regarding perfomance.
In the project setting at CSS Mode there is the possibility to set the project in Perfomance or in Development.

In the Perfomance mode the compiled CSS is used. If there are changes in the template, as well as adjustment of CSS colors, the CSS needs to be compiled again. The guide can be found here: https://tailwindcss.com/docs/installation. The Full Deployment has a script where the generated project is zipped and so the project can be executed with the CLI.

In the development mode, the Tailwindcss [Play CDN](https://tailwindcss.com/docs/installation/play-cdn) is added. This enables, for example, new templates to be developed directly in FirstSpirit and the design to be displayed on the fly. In this case, over 2 MB of CSS is loaded against 30 KB in the Performance Mode. It is not recommended to use the development mode for the production of a website.

To be able to use the location section, please add your google maps API key in the project settings. For more information see: https://developers.google.com/maps/documentation/javascript/get-api-key

The YouTube integration an [API key](https://developers.google.com/youtube/v3/getting-started) is required and can be set up in the project component. More information about the YouTube integration see: https://github.com/e-Spirit/youtube-dap-integration

## Installation
The project can be imported to your FirstSpirit server using the FSDevTools. FsDevTools can be found here: https://github.com/e-Spirit/FSDevTools/releases

After installation you can use the following command to import the project to your FirstSpirit server:
```
fs-cli import -c [connection_mode] -port [port] -u "[user_name]" -pwd "[user_password]" -h [hostname] -p "[project_name]" -lm "*:[db_layer_name]" -sd [local_sync_directory]
```
If you want to create a new db layer mapping and don't want to import the project using an existing db layer, please use -lm "*:CREATE_NEW"

### Example:
```
fs-cli import -c HTTP -port 8000 -u "Admin" -pwd "Admin" -h myhost.com -p "SmartLiving Website Reference" -lm "*:FirstSpiritDBA" -sd /home/smartliving-website
```

## Legal Notices
The FirstSpirit Smartliving Website provides example code and a guideline for best practices. It is not a product and therefore not covered by our maintenance standards. The FirstSpirit Smartliving Website is owned by Crownpeak Technology GmbH, Dortmund, Germany and subject to the Apache-2.0 license.

## Disclaimer
This document is provided for information purposes only. Crownpeak may change the contents hereof without notice. This document is not warranted to be error-free, nor subject to any other warranties or conditions, whether expressed orally or implied in law, including implied warranties and conditions of merchantability or fitness for a particular purpose. Crownpeak specifically disclaims any liability with respect to this document and no contractual obligations are formed either directly or indirectly by this document. The technologies, functionality, services, and processes described herein are subject to change without notice.