import { Component, Inject, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SuActionButtonConfig {
  label?: string;
  ariaLabel?: string;
  link?: string;
  url?: string;
  target?: string;
  iconUrl?: string;
}

interface SuActionButtonsConfig {
  actions?: SuActionButtonConfig[];
}

interface SuActionButton {
  label: string;
  ariaLabel: string;
  link: string;
  target: string;
  iconUrl: string;
  iconMaskUrl: string;
  iconLoadFailed: boolean;
}

const defaultExclamationCircleIconUrl = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 -960 960 960%22%3E%3Cpath fill=%22%235f6368%22 d=%22M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z%22/%3E%3C/svg%3E';

@Component({
  selector: 'su-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './su-action-buttons.component.html',
  styleUrls: ['./su-action-buttons.component.scss']
})
export class SuActionButtonsComponent {
  @Input() hostComponent?: any;
  @Input() parentCtrl?: any;

  actions: SuActionButton[];

  constructor(
    @Optional() @Inject('MODULE_PARAMETERS') moduleParameters?: SuActionButtonsConfig
  ) {
    this.actions = this.normalizeActions(moduleParameters?.actions);
  }

  private normalizeActions(actions?: SuActionButtonConfig[]): SuActionButton[] {
    const configuredActions = Array.isArray(actions) && actions.length > 0
      ? actions
      : [
          {
            label: 'Report an error',
            ariaLabel: 'Report an error with this record',
            link: 'mailto:youremail@domain.com',
            target: '_blank',
            iconUrl: defaultExclamationCircleIconUrl
          }
        ];

    return configuredActions
      .map((action) => ({
        label: action.label || 'Record action',
        ariaLabel: action.ariaLabel || action.label || 'Record action',
        link: action.link || action.url || '',
        target: action.target || '_blank',
        iconUrl: action.iconUrl || defaultExclamationCircleIconUrl,
        iconMaskUrl: this.toCssUrl(action.iconUrl || defaultExclamationCircleIconUrl),
        iconLoadFailed: false
      }))
      .filter((action) => action.link);
  }

  markIconFailed(action: SuActionButton): void {
    action.iconLoadFailed = true;
  }

  private toCssUrl(url: string): string {
    return `url("${url.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
  }
}
