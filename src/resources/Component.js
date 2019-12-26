sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.app.test.Component", {
        metadata : {
            rootView: {
                "viewName": "sap.ui.app.test.view.App",
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
                bundleName : "sap.ui.app.test.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
 });