This is the FirstSpirit Smartliving Website Reference Demo project which can be imported to your FirstSpirit server using the FSDevTools.

FsDevTools can be found here: https://github.com/e-Spirit/FSDevTools/releases

After installation you can use the following command to import the project to your FirstSpirit server:

fs-cli import --layerMapping "*:CREATE_NEW"



If you do not want to create new db layer mapping and want to import the project using existing db layer, please use:

fs-cli import --layerMapping "*:[your_db_layer_name]"