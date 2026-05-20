import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SuActionButtonsConfig {
  label?: string;
  ariaLabel?: string;
  link?: string;
  url?: string;
  target?: string;
  iconUrl?: string;
  tooltip?: string;
}

interface SuActionButton {
  label: string;
  ariaLabel: string;
  link: string;
  target: string;
  iconUrl: string;
  iconMaskUrl: string;
  iconLoadFailed: boolean;
  tooltip: string;
}

const defaultExclamationCircleIconUrl = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 -960 960 960%22%3E%3Cpath fill=%22%235f6368%22 d=%22M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z%22/%3E%3C/svg%3E';

@Component({
  selector: 'su-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './su-action-buttons.component.html',
  styleUrls: ['./su-action-buttons.component.scss']
})
export class SuActionButtonsComponent implements AfterViewInit, OnDestroy {
  @Input() hostComponent?: any;
  @Input() parentCtrl?: any;

  actions: SuActionButton[];
  shouldRender = true;
  private tooltipElement?: HTMLSpanElement;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject('MODULE_PARAMETERS') moduleParameters?: SuActionButtonsConfig
  ) {
    this.actions = this.normalizeAction(moduleParameters);
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.initializePlacement());
  }

  ngOnDestroy(): void {
    this.destroyTooltipElement();
  }

  private normalizeAction(config?: SuActionButtonsConfig): SuActionButton[] {
    const action = {
      label: config?.label || 'Report an error',
      ariaLabel: config?.ariaLabel || config?.label || 'Report an error with this record',
      link: config?.link || config?.url || 'mailto:youremail@domain.com',
      target: config?.target || '_blank',
      iconUrl: config?.iconUrl || defaultExclamationCircleIconUrl,
      tooltip: config?.tooltip || 'Click to report an error'
    };

    return [
      {
        ...action,
        iconMaskUrl: this.toCssUrl(action.iconUrl),
        iconLoadFailed: false
      }
    ];
  }

  markIconFailed(action: SuActionButton): void {
    action.iconLoadFailed = true;
  }

  showTooltip(event: Event, action: SuActionButton): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const tooltip = this.getTooltipElement();

    tooltip.textContent = action.tooltip;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;
    tooltip.hidden = false;
  }

  hideTooltip(): void {
    if (this.tooltipElement) {
      this.tooltipElement.hidden = true;
    }
  }

  private initializePlacement(): void {
    if (this.isInsideSearchResultsTopBar()) {
      this.shouldRender = false;
      this.elementRef.nativeElement.style.display = 'none';
      return;
    }

    this.elementRef.nativeElement.style.display = '';
    this.moveIntoRecordActionsContainer();
  }

  private moveIntoRecordActionsContainer(): void {
    const host = this.elementRef.nativeElement;
    const injectedWrapper = host.parentElement;
    const actionsPresenter = host.closest('nde-actions-presenter');
    const recordActionsContainer = actionsPresenter?.querySelector('.record-actions-container');

    if (!recordActionsContainer || host.parentElement === recordActionsContainer) {
      return;
    }

    recordActionsContainer.appendChild(host);

    if (injectedWrapper && injectedWrapper.childElementCount === 0) {
      injectedWrapper.remove();
    }
  }

  private isInsideSearchResultsTopBar(): boolean {
    return Boolean(this.elementRef.nativeElement.closest('nde-search-results-top-bar'));
  }

  private getTooltipElement(): HTMLSpanElement {
    if (this.tooltipElement) {
      return this.tooltipElement;
    }

    const tooltip = document.createElement('span');
    tooltip.id = 'su-action-buttons-tooltip';
    tooltip.className = 'su-action-button-global-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    Object.assign(tooltip.style, {
      background: '#000',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16px',
      maxWidth: '180px',
      padding: '6px 8px',
      pointerEvents: 'none',
      position: 'fixed',
      textAlign: 'center',
      transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
      zIndex: '2147483647'
    });

    document.body.appendChild(tooltip);
    this.tooltipElement = tooltip;
    return tooltip;
  }

  private destroyTooltipElement(): void {
    this.tooltipElement?.remove();
    this.tooltipElement = undefined;
  }

  private toCssUrl(url: string): string {
    return `url("${url.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
  }
}
