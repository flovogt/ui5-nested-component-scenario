sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/base/util/deepClone"
], (UIComponent, deepClone) => {
	"use strict";

	return UIComponent.extend("my.lib.sample.base.Component", {
		init(...args) {
			UIComponent.prototype.init.apply(this, args);

			const oRouter = this.getRouter();
			oRouter.getViews().attachCreated(this._processEventMappingOnTargetCreated, this);
			oRouter.initialize();
		},
		/**
		 * This function is attached to the 'created' event from the target cache of a router.
		 *
		 * Once a component target is created, this function is called. Within this function,
		 * the 'eventMappings' property which is defined in the subclass component is processed.
		 * To each of the events defined within a target under 'eventMappings', a handler is
		 * attached. The handler calls the 'navTo' method on the current router by providing
		 * the route information and the information for the component targets within this route.
		 *
		 * With this mechanism, a nested component can fire specific events to inform the parent
		 * component that:
		 * <ul>
		 * <li>A navigation needs to be done with the router in the parent component.</li>
		 * <li>The event needs to be forwarded along the parent chain with the same parameter</li>
		 * </ul>
		 *
		 * @private
		 * @param {object} oEvent The event object which is provided by the 'created' event from
		 *   router's target cache
		 */
		_processEventMappingOnTargetCreated(oEvent) {
			if (!this.eventMappings) {
				return;
			}

			const sType = oEvent.getParameter("type"),
			 oObject = oEvent.getParameter("object"),
			 oOptions = oEvent.getParameter("options"),
			 that = this,
			 processComponentTargetInfo = (oComponentTargetInfo, oEv) => {
				Object.keys(oComponentTargetInfo).forEach((sTargetName) => {
					const oInfo = oComponentTargetInfo[sTargetName];

					if (oInfo.parameters) {
						Object.keys(oInfo.parameters).forEach((sName) => {
							const sParamName = oInfo.parameters[sName],
							 sEventValue = oEv.getParameter(sParamName);

							/*
							 * Expand the parameter mapping with the parameter value from
							 * the event
							 */
							oInfo.parameters[sName] = sEventValue;
						});
					}

					if (oInfo.componentTargetInfo) {
						processComponentTargetInfo(oInfo.componentTargetInfo, oEv);
					}
				});
			};

			if (sType === "Component") {
				const aEvents = this.eventMappings[oOptions.usage];
				if (Array.isArray(aEvents)) {
					aEvents.forEach((oEventMapping) => {
						oObject.attachEvent(oEventMapping.name, (oEv) => {
							let oComponentTargetInfo = {};
							if (oEventMapping.route) { // Route information defined, call 'navTo'
								if (oEventMapping.componentTargetInfo) {
									/*
									 * If there's information for component target defined, replace the
									 * event parameter mapping with the value from the event object
									 */
									oComponentTargetInfo = deepClone(oEventMapping.componentTargetInfo);
									processComponentTargetInfo(oComponentTargetInfo, oEv);
								}

								that.getRouter().navTo(oEventMapping.route, {}, oComponentTargetInfo);
							} else if (oEventMapping.forward) { // Event should be forwarded with the same parameters
								that.fireEvent(oEventMapping.forward, oEv.getParameters());
							}
						});
					});
				}
			}
		}
	});
});
