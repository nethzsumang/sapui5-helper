module.exports = {
    getIndexHtmlContents: function (sProjectName) {
        return `<html>
    <head>
        <meta charset="utf-8">
        <title> SAPUI5 Application </title>
        <script
            id="sap-ui-bootstrap"
            src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_belize"
            data-sap-ui-libs="sap.m"
            data-sap-ui-preload=""
            data-sap-ui-compatVersion="edge"
            data-sap-ui-async="true"
            data-sap-ui-oninit="module:sap/ui/core/ComponentSupport"
            data-sap-ui-resourceroots='{
                "sap.ui.app.${sProjectName}": "./"
		    }'>
        </script>
    </head>
    <body class="sapUiBody" id="content">
    <div data-sap-ui-component data-name="sap.ui.app.${sProjectName}" data-id="container" data-settings='{"id" : "${sProjectName}"}'></div>
    </body>
</html>`;
    },
    getIndexJsContents: function (sProjectName) {
        return `sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

	new ComponentContainer({
		name: "sap.ui.app.${sProjectName}",
		settings : {
			id : "${sProjectName}"
		},
		async: true
	}).placeAt("content");
});`;
    },
    getAppViewXmlContents: function () {
        return `<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Text text="Hello World"/>
</mvc:View>`;
    },
    getAppControllerJsContents: function () {
        return `sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("", {
    });
});`;
    },
    getAppViewJsContents: function (sProjectName) {
        return `sap.ui.jsview("${sProjectName}.${sProjectName}", {
    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf test.test
     */ 
    getControllerName : function() {
        return "${sProjectName}.${sProjectName}";
    },
        
    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf test.test
     */ 
    createContent : function(oController) {
        return new sap.m.Page({
            title: "${sProjectName}",
            content: []
        });
    }
});`;
    },
    getManifestJsonContents(oParams) {
        const path = require('path');
        let sProjectName = path.basename(process.cwd());
        return `{
    "_version": "1.12.0",
    "sap.app": {
        "id": "${oParams.id}",
        "type": "application",
        "i18n": "i18n/i18n.properties",
        "title": "${oParams.appTitle}",
        "description": "${oParams.description}",
        "applicationVersion": {
            "version": "${oParams.appVersion}"
        }
    },
    "sap.ui": {
        "technology": "UI5",
        "deviceTypes": {
            "desktop": ${oParams.desktopSupport},
            "tablet": ${oParams.tabletSupport},
            "phone": ${oParams.phoneSupport}
        }
    },
    "sap.ui5": {
        "rootView": {
            "viewName": "sap.ui.app.${sProjectName}.view.App",
            "type": "XML",
            "async": true,
            "id": "app"
        },
        "dependencies": {
            "minUI5Version": "1.60",
            "libs": {
                "sap.m": {}
            }
        }
    }
}`;
    },
    getComponentJsContents(sProjectName) {
        return `sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.app.${sProjectName}.Component", {
        metadata : {
            rootView: {
                "viewName": "sap.ui.app.${sProjectName}.view.App",
                "type": "XML",
                "async": true,
                "id": "app"
            }
        },
        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
         
            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName : "sap.ui.app.${sProjectName}.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
 });`;
    }
};