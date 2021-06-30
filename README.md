# strapi-provider-upload-github-plus

Github API provider for Strapi CMS file upload.

This project is a fork of [strapi-provider-upload-github-api](https://github.com/nhvu1988/strapi-provider-upload-github-api).

## Prerequisite

- Max upload file size is 100MB but smaller 50MB is recommended. See [Conditions for large files](https://docs.github.com/en/github/managing-large-files/conditions-for-large-files)
- Enable Git LFS for your respository if planning to store large files. See [Versioning large files](https://docs.github.com/en/github/managing-large-files/versioning-large-files)
- Use GitHub page or [vercel](https://vercel.com/), [surge](https://surge.sh/), [netlify](https://www.netlify.com/) for publishing.

## Installation

```
npm install strapi-provider-upload-github-plus
```

## Configurations

`./config/plugins.js`

```javascript
module.exports = ({ env }) => ({
  upload: {
    provider: 'github-plus',
    providerOptions: {
      repo: env('GITHUB_UPLOAD_REPO'),
      user: env('GITHUB_UPLOAD_USER'),
      token: env('GITHUB_UPLOAD_TOKEN'),
      publicUrl: env('GITHUB_UPLOAD_PUBLIC_URL'),
      directory: env('GITHUB_UPLOAD_DIR')
    }
  },
});
```

`.env`

```ini
GITHUB_UPLOAD_REPO=uploads
GITHUB_UPLOAD_USER=user-name
GITHUB_UPLOAD_TOKEN=***
GITHUB_UPLOAD_PUBLIC_URL=https://user-name.github.io/uploads
GITHUB_UPLOAD_DIR=assets
```

## Parameters

- repo - github repository name
- user - github user name
- token - github user token [(Creating a personal access token - GitHub Docs)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
- publicUrl - the publishing url without slash (`/`) at the end.

## Credits
- [nhvu1988](https://github.com/nhvu1988)
