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
    this.hideRequestCardWhenSummitHoldingsRender();
    this.observePageChanges();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observePageChanges(): void {
    this.observer = new MutationObserver(() => this.hideRequestCardWhenSummitHoldingsRender());

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private hideRequestCardWhenSummitHoldingsRender(): void {
    const summitHoldingsSection = Array.from(document.querySelectorAll(summitHoldingsSelector))
      .find((element) => element.textContent?.includes(summitHoldingsLabel));

    if (summitHoldingsSection) {
      document.querySelector(requestCardSelector)?.remove();
    }
  }
}
