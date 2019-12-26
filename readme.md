## SAPUI5 Helper
A SAPUI5 helper package for creating new projects and running it on Node server.

To install:
`npm install -g sapui5-helper`

To create a new SAPUI5 application:
* Run `sapui5-new-project <project-name>`.

<small>Just note that the directory with that name must not exist.</small>

To run the SAPUI5 application:
* Transfer to the root of application. `cd <project-name>`
* Run `sapui5-run <port-number>` i.e. `sapui5-run 8080`.

File Creation:    
* You can run `sapui5-new-file controller <name>` to create a controller at the `/controller` folder.
* You can run `sapui5-new-file model <name>` to create a JSON model at the `/model` folder. Note that this command automatically creates the `model` folder if it does not exist.
* You can run `sapui5-new-file view <name>` to create a view at the `/view` folder. You will choose what type of view you are creating.
* You can run `sapui5-create-manifest` to create a `manifest.json` at the current folder.

<small>Note that you must not include the `.controller.js` for controller or `.json` for model in the name of the file in the command argument.