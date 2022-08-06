/**
 * Nuke files
 *
 * @param {object} parameters Parameters
 * @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and
 * write resources
 * @param {module:@ui5/fs.AbstractReader} parameters.dependencies ReaderCollection to read
 * dependency resources
 * @param {object} parameters.taskUtil Specification Version dependent interface to a
 *                [TaskUtil]{@link module:@ui5/builder.tasks.TaskUtil} instance
 * @param {object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.projectNamespace] Project namespace
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been
 * written or rejecting in case of an error
 */
// eslint-disable-next-line no-unused-vars
module.exports = async function nuke({ workspace, dependencies, taskUtil, options }) {
  const config = options.configuration;
  const nukePatterns = config?.nukes;
  if (nukePatterns === undefined) {
    return;
  }
  const resources = await workspace.byGlob(nukePatterns);
  resources.forEach((resource) => {
    taskUtil.setTag(resource, taskUtil.STANDARD_TAGS.OmitFromBuildResult);
  });
};
