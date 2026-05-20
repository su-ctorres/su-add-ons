# su-action-buttons

## Mapping

- Name: `su-action-buttons`
- URL: `https://su-ctorres.github.io/su-add-ons/su-action-buttons/`
- Configuration JSON Template: [su-action-buttons.json](./su-action-buttons.json)
- NDE Mapping Slot: `nde-record-actions-bottom`
- Component Folder: [`src/app/su-action-buttons`](../../app/su-action-buttons)
- Component Selector: `su-action-buttons`

## Description

This add-on provides a starter action button component registered under the `su-action-buttons` add-on profile and mapped to the end of the `nde-record-actions` slot.

## Configuration

Use `actions` to add one or more icon links to the record actions area.

```json
{
  "actions": [
    {
      "label": "Report a problem",
      "ariaLabel": "Report a problem with this record",
      "link": "https://example.com/report",
      "target": "_blank",
      "iconUrl": "https://example.com/exclamation-circle.svg"
    }
  ]
}
```

Use `iconUrl` for a hosted SVG, PNG, or other browser-supported image. The icon is rendered as a CSS mask, so it inherits the same one-color styling as the other record action icons. Simple single-color SVGs work best.

The URL can be absolute:

```json
"iconUrl": "https://example.com/icons/exclamation-circle.svg"
```

Or it can point to an asset included with the hosted add-on:

```json
"iconUrl": "assets/icons/exclamation-circle.svg"
```

If `iconUrl` is omitted, the component uses a built-in exclamation-circle icon.
