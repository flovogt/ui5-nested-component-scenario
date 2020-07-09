const stringReplacer = require("@ui5/builder").processors.stringReplacer;

/** Replace Bootstrap File in all HTML files with sap-ui-custom.js 
*
* @param {Object} parameters Parameters
* @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and write files
* @param {module:@ui5/fs.AbstractReader} parameters.dependencies Reader or Collection to read dependency files
* @param {Object} parameters.options Options
* @param {string} parameters.options.projectName Project name
* @param {string} [parameters.options.projectNamespace] Project namespace if available
* @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
* @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been written
*/
module.exports = async function ({ workspace, dependencies, options }) {
    return workspace.byGlob(options.configuration.pattern).then((allResources) => {
        return stringReplacer({
            resources: allResources,
            options: {
                pattern: "sap-ui-core.js",
                replacement: "sap-ui-custom.js"
            }
        });
    }).then((processedResources) => {
        return Promise.all(processedResources.map((resource) => {
            return workspace.write(resource);
        }));
    });;
};