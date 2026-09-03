# SU Add-Ons and Profiles

This repository hosts multiple add-ons that share the same `customModule-main` base.

## Add-ons

### Main

- [`su-test-banner`](./su-add-ons/src/addons/su-test-banner/README.md)

### Shared

- [`orca-display-mmsid`](./su-add-ons/src/addons/orca-display-mmsid/README.md)
- [`orca-external-search`](./su-add-ons/src/addons/orca-external-search/README.md)

### Development

- [`su-action-buttons`](./su-add-ons/src/addons/su-action-buttons/README.md)
- [`su-hide-summit`](./su-add-ons/src/addons/su-hide-summit/README.md) - hides the Summit resource sharing request card when the Summit holdings area is present.
- [`su-user-links`](./su-add-ons/src/addons/su-user-links/README.md)

## Adding a New Component

Creating a new component is the same as in `customModule-main`. Add-on names should use the `su-` prefix, for example `su-test-banner`.

Before making changes:

1. Start from the latest `main` branch.
2. Create a new branch for your add-on work.
3. Create the new component inside [`su-add-ons`](./su-add-ons).
4. Update the add-on profiles so the new component can be built in this repo.

## Updating Profiles for Build

After creating the component, update the add-on profile files so it can be built in this repo.

1. Add a new add-on entry in [su-add-ons/addon-profiles.json](./su-add-ons/addon-profiles.json).

Example:

```json
{
  "addons": {
    "su-test-banner": {
      "buildName": "su-test-banner",
      "remoteName": "suTestBanner",
      "exposedModule": "./su-test-banner"
    }
  }
}
```

2. Create a runtime profile file at `su-add-ons/src/addons/<addon-name>/index.ts`.

Example:

```ts
import { AddonRuntimeProfile } from '../addon-profile.types';
import { SuTestBannerComponent } from '../../app/su-test-banner/su-test-banner.component';

export const suTestBannerProfile: AddonRuntimeProfile = {
  key: 'su-test-banner',
  buildName: 'su-test-banner',
  selectorComponentMap: new Map<string, any>([
    ['nde-your-selector', SuTestBannerComponent]
  ])
};
```

3. Register the new profile in [su-add-ons/src/addons/registry.ts](./su-add-ons/src/addons/registry.ts).

Example:

```ts
import { AddonRuntimeProfile } from './addon-profile.types';
import { suTestBannerProfile } from './su-test-banner';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'su-test-banner': suTestBannerProfile
};
```



## Merging Changes

When your add-on changes are ready:

1. Push your branch to GitHub.
2. Create a pull request targeting the `main` branch.
3. After review, merge the pull request into `main`.

## Add-on URL

The GitHub Pages URL for an add-on will look like:

`https://su-ctorres.github.io/su-add-ons/<addon-name>/`

Example:

`https://su-ctorres.github.io/su-add-ons/su-test-banner/`

## Local Builds

Run build commands from the inner project folder:

```bash
cd su-add-ons
```

`npm run build` builds all add-ons listed in [su-add-ons/addon-profiles.json](./orca-add-ons/addon-profiles.json). The build output is written to `su-add-ons/dist/addons/`, with one folder per add-on.

To build only one add-on for local development, set `ADDON_KEY` in [su-add-ons/build-settings.env](./su-add-ons/build-settings.env), then run:

```bash
npm run build:addon
```

Changing `ADDON_KEY` only affects single add-on builds and local generated settings. Leave optional overrides such as `BUILD_NAME`, `REMOTE_NAME`, and `PACKAGE_NAME` commented out unless you need to change the packaged output names.

## Fork

If you fork this repository, enable GitHub Pages for your fork before sharing add-on URLs.

1. In your fork on GitHub, open **Settings**.
2. Go to **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Go to **Actions** and run the **Deploy GitHub Pages** workflow.

After the workflow finishes, use your fork's GitHub Pages URL. The add-on URL will look like:

`https://<your-github-username>.github.io/su-add-ons/<addon-name>/`

For example, if your fork is under `my-repo`, the `su-test-banner` URL would be:

`https://my-repo.github.io/su-add-ons/su-test-banner/`
