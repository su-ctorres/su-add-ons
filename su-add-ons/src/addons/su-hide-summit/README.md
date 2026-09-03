# su-hide-summit

## Details

- Name: `su-hide-summit`
- URL: `https://su-ctorres.github.io/su-add-ons/su-hide-summit/`
- Configuration JSON Template: [su-hide-summit.json](./su-hide-summit.json)
- Placement: `nde-full-display-service-container-after`
- Component Folder: [`src/app/su-hide-summit`](../../app/su-hide-summit)
- Component Selector: `su-hide-summit`

## Description

Hides the existing NDE Summit resource sharing request card when the `Summit Holdings:` section is present on the page.

The add-on does not render its own visible content. It watches the NDE page DOM and removes the existing `AlmaResourceSharing` request card after the Summit holdings area renders.

## Configuration

The default configuration is empty:

```json
{}
```

There are no configurable parameters right now.

## Development

The add-on is registered in `src/addons/registry.ts` and `addon-profiles.json` under the key `su-hide-summit`.

The runtime mapping lives in `src/addons/su-hide-summit/index.ts`:

```ts
['nde-full-display-service-container-after', SuHideSummitComponent]
```

The component checks for the Summit holdings section in the rendered page:

```css
nde-full-display-service-container .getit_other
```

If that section contains the text `Summit Holdings:`, the component removes:

```css
nde-request-card[data-qa="AlmaResourceSharing"]
```

To build only this add-on, set `ADDON_KEY=su-hide-summit` in `build-settings.env`, then run:

```bash
npm run build:addon
```
