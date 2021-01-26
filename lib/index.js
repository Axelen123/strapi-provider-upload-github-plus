const GitHub = require('./github');
const {normalizeFilePath} = require('./utils');

module.exports = {
  init(config) {
    // Init GitHub Rest Client
    const github = new GitHub({
      owner: config.user,
      token: config.token,
      repo: config.repo
    });

    return {
      /**
       * Upload file to GitHub
       * @param {*} file
       * @param {*} customParams
       */
      async upload(file, customParams = {}) {
        const filePath = normalizeFilePath(file);
        try {
          strapi.log.debug(`GITHUB-API Uploading file="${file.name}" filePath=${filePath} mime=${file.mime} size=${file.size}KB`);
          const content = await github.upload(file, filePath);
          file.provider_metadata = {
            sha: content.sha,
            path: content.path
          }
          file.url = config.publicUrl + '/' + content.path;
          strapi.log.debug(`GITHUB-API Uploaded file="${file.name}" sha=${file.provider_metadata.sha} path="${file.provider_metadata.path}"`);
        } catch (err) {
          strapi.log.error(`GITHUB-API Error onUpload file="${file.name}" filePath=${filePath}`, err);
          throw strapi.errors.badRequest("GitHubApiProvider", {errors: [err]});
        }
      },

      /**
       * Delete file from GitHub
       * @param {*} file
       * @param {*} customParams
       */
      async delete(file, customParams = {}) {
        try {
          strapi.log.debug(`GITHUB-API Deleting file="${file.name}" sha=${file.provider_metadata.sha} path="${file.provider_metadata.path}"`);
          await github.deleteFile(file, file.provider_metadata.path, file.provider_metadata.sha);
          strapi.log.debug(`GITHUB-API Deleted file="${file.name}" sha=${file.provider_metadata.sha} path="${file.provider_metadata.path}"`);
        } catch (err) {
          strapi.log.error(`GITHUB-API Error onDelete file="${file.name}" metadata=${JSON.stringify(file.provider_metadata)}`, err);
          throw strapi.errors.badRequest("GitHubApiProvider", {errors: [err]});
        }
      },
    };
  }
};
