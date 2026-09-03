import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { selectDeliveryEntities } from '../utils/DeliveryRecordSelector';
import { selectFullDisplayRecord } from '../utils/fullDisplayRecordSelector';

interface SuHideSummitConfig {
  openUrlOnly?: boolean;
  requestCardSelector?: string;
}

@Component({
  selector: 'su-hide-summit',
  standalone: true,
  imports: [CommonModule],
  template: ''
})
export class SuHideSummitComponent implements OnInit, OnDestroy {
  private readonly openUrlOnly: boolean;
  private readonly requestCardSelector: string;
  private readonly urlHasIdentifier: boolean;
  private storeSubscription?: Subscription;
  private requestCardObserver?: MutationObserver;
  private shouldHideRequestCard = false;

  constructor(
    @Optional() private store: Store | null = null,
    @Optional() @Inject('MODULE_PARAMETERS') moduleParameters?: SuHideSummitConfig
  ) {
    this.openUrlOnly = moduleParameters?.openUrlOnly ?? true;
    this.requestCardSelector =
      moduleParameters?.requestCardSelector ?? 'nde-request-card[data-qa="AlmaResourceSharing"]';
    this.urlHasIdentifier = this.hasIdentifierInUrl();
  }

  ngOnInit(): void {
    if (this.openUrlOnly && !this.isOpenUrlPage()) {
      return;
    }

    this.observeRequestCard();

    if (!this.store) {
      if (!this.urlHasIdentifier) {
        this.hideRequestCard();
      }
      return;
    }

    this.storeSubscription = combineLatest([
      this.store.select(selectFullDisplayRecord),
      this.store.select(selectDeliveryEntities)
    ]).subscribe(([record, deliveryEntities]) => {
      const hasRecordIdentifier = this.hasIdentifierInRecord(record);

      if (!this.urlHasIdentifier && record && !hasRecordIdentifier) {
        this.hideRequestCard();
        return;
      }

      if (!this.urlHasIdentifier && !hasRecordIdentifier) {
        return;
      }

      if (!this.deliveryIsReady(deliveryEntities)) {
        return;
      }

      if (!this.hasSummitHoldings(deliveryEntities)) {
        this.hideRequestCard();
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.requestCardObserver?.disconnect();
  }

  private observeRequestCard(): void {
    this.requestCardObserver = new MutationObserver(() => {
      if (this.shouldHideRequestCard) {
        this.removeRequestCard();
      }
    });

    this.requestCardObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private hideRequestCard(): void {
    this.shouldHideRequestCard = true;
    this.removeRequestCard();
  }

  private removeRequestCard(): void {
    document.querySelector(this.requestCardSelector)?.remove();
  }

  private isOpenUrlPage(): boolean {
    return window.location.pathname.includes('/openurl');
  }

  private hasIdentifierInUrl(): boolean {
    const params = new URLSearchParams(window.location.search);
    const rftIds = params.getAll('rft_id').join(' ').toLowerCase();

    return (
      rftIds.includes('info:oclcnum') ||
      rftIds.includes('urn:isbn') ||
      params.has('rft.isbn')
    );
  }

  private hasIdentifierInRecord(record: any): boolean {
    const addata = record?.pnx?.addata;
    return Boolean(addata?.oclcid?.length || addata?.isbn?.length);
  }

  private deliveryIsReady(deliveryEntities: Record<string, any> | null | undefined): boolean {
    return Object.values(deliveryEntities ?? {}).some((entity: any) =>
      Array.isArray(entity?.delivery?.almaInstitutionList)
    );
  }

  private hasSummitHoldings(deliveryEntities: Record<string, any> | null | undefined): boolean {
    return Object.values(deliveryEntities ?? {}).some((entity: any) =>
      entity?.delivery?.almaInstitutionList?.length > 0
    );
  }
}
