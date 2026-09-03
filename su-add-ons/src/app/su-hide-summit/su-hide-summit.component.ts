import { AfterViewInit, Component, OnDestroy } from '@angular/core';

const requestCardSelector = 'nde-request-card[data-qa="AlmaResourceSharing"]';
const summitHoldingsSelector = 'nde-full-display-service-container .getit_other';
const summitHoldingsLabel = 'Summit Holdings:';

@Component({
  selector: 'su-hide-summit',
  standalone: true,
  template: ''
})
export class SuHideSummitComponent implements AfterViewInit, OnDestroy {
  private observer?: MutationObserver;

  ngAfterViewInit(): void {
    this.hideRequestCardWhenSummitHoldingsIsMissing();
    this.observePageChanges();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observePageChanges(): void {
    this.observer = new MutationObserver(() => this.hideRequestCardWhenSummitHoldingsIsMissing());

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private hideRequestCardWhenSummitHoldingsIsMissing(): void {
    if (!this.summitHoldingsIsOnPage()) {
      document.querySelector(requestCardSelector)?.remove();
    }
  }

  private summitHoldingsIsOnPage(): boolean {
    return Array.from(document.querySelectorAll(summitHoldingsSelector))
      .some((element) => element.textContent?.includes(summitHoldingsLabel));
  }
}
