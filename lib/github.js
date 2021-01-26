const { Octokit } = require('@octokit/rest');
const retry = require('async-retry');

class GitHub {
  constructor({ owner, repo, token }) {
    this.owner = owner;
    this.repo = repo;
    this.committer = {
      name: 'Strapi Uploader',
      email: 'uploader@strapi.com'
    };
    this.github = new Octokit({ auth: token });
  }

  async upload(file, filePath) {

    try {
      return await retry(async bail => {

        const response = await this.github.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          message: `add-file:: ${file.name}`,
          committer: this.committer,
          content: file.buffer.toString('base64')
        });

        if (response.status !== 201) {
          strapi.log.warn(`GITHUB-API Upload-Fail response="${JSON.stringify(response)}"`);
        }
        if (response.status === 409 || response.status === 422) {
          bail(new Error('GITHUB-API Upload-Fail')); // no need to retry
          return;
        }
        return response.data.content;
      }, {
        retries: 5
      });
    } catch (error) {
      throw {
        id: 'Upload.status.githubApiUploadFailure',
        message: `unable to upload ${file.name} to github.`,
        values: { ...error }
      };
    }
  }

  async deleteFile(file, filePath, sha) {
    try {
      await retry(async bail => {
        const response = await this.github.repos.deleteFile({
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          sha: sha,
          message: `remove-file:: ${file.name}`,
          committer: this.committer,
        });

        if (response.status !== 200) {
          strapi.log.warn(`GITHUB-API DeleteFile-Fail response="${JSON.stringify(response)}"`);
        }
        if (response.status === 409 || response.status === 422) {
          bail(new Error('GITHUB-API DeleteFile-Fail')); // no need to retry
        }
      }, {
        retries: 5
      });
    } catch (error) {
      throw {
        id: 'Upload.status.gitApiDeleteFileFailure',
        message: `unable to delete ${file.name} to github.`,
        values: { ...error },
      };
    }
  }
}

module.exports = GitHub;
