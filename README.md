Smartliving Website
--------------------

This is the FirstSpirit Smartliving Website Reference Demo project which can be imported to your FirstSpirit server using the FSDevTools. FsDevTools can be found here: https://github.com/e-Spirit/FSDevTools/releases<br/>

After installation you can use the following command to import the project to your FirstSpirit server:

`fs-cli import -c [connection_mode] -port [port] -u "[user_name]" -pwd "[user_password]" -h [hostname] -p "[project_name]" -lm "*:[db_layer_name]" -sd [local_sync_directory]`<br/><br/>

If you want to create a new db layer mapping and don't want to import the project using an existing db layer, please use `-lm "*:CREATE_NEW"`<br/><br/>


Example:

`fs-cli import -c HTTP -port 8000 -u "Admin" -pwd "Admin" -h myhost.com -p "SmartLiving Website Reference" -lm "*:FirstSpiritDBA" -sd /home/smartliving-website`