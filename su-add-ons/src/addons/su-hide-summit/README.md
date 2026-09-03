# su-hide-summit

## Details

- Name: `su-hide-summit`
- URL: `https://su-ctorres.github.io/su-add-ons/su-hide-summit/`
- Configuration JSON Template: [su-hide-summit.json](./su-hide-summit.json)
- Placement: `nde-full-display-service-container-after`
- Component Folder: [`src/app/su-hide-summit`](../../app/su-hide-summit)
- Component Selector: `su-hide-summit`

## Description

Hides the existing NDE Summit resource sharing request card on OpenURL pages when the record has no OCLC/ISBN identifier or when NDE delivery state reports no Summit holdings.

The add-on does not render its own visible content. It watches the NDE page state and removes the existing `AlmaResourceSharing` request card only when Summit should not be offered.

## Configuration

The default configuration is empty:

```json
{}
```

Optional parameters are available for local testing or future slot changes.

| Parameter | Default | Description |
|---|---|---|
| `openUrlOnly` | `true` | Limits the hide behavior to OpenURL pages. |
| `requestCardSelector` | `nde-request-card[data-qa="AlmaResourceSharing"]` | CSS selector for the existing Summit request card. |

## Development

The add-on is registered in `src/addons/registry.ts` and `addon-profiles.json` under the key `su-hide-summit`.

The runtime mapping lives in `src/addons/su-hide-summit/index.ts`:

```ts
['nde-full-display-service-container-after', SuHideSummitComponent]
```

The component checks three things:

- The current page is an OpenURL page, unless `openUrlOnly` is set to `false`.
- The record has an OCLC number or ISBN from either the OpenURL parameters or the PNX record data.
- Summit holdings exist in NDE delivery state at `delivery.almaInstitutionList`.

If no identifier exists, or if the delivery state is ready and `almaInstitutionList` is empty, the component removes:

```css
nde-request-card[data-qa="AlmaResourceSharing"]
```

To build only this add-on, set `ADDON_KEY=su-hide-summit` in `build-settings.env`, then run:

```bash
npm run build:addon
```
