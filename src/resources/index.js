sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

	new ComponentContainer({
		name: "sap.ui.app.test",
		settings : {
			id : "test"
		},
		async: true
	}).placeAt("content");
});