import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, timer } from 'rxjs';
import { selectDeliveryEntities } from '../utils/DeliveryRecordSelector';
import { filter, distinctUntilChanged, takeUntil, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StoreReadinessService {
    private storeReadySubject = new BehaviorSubject<boolean>(false);
    storeReady$ = this.storeReadySubject.asObservable();

    constructor(private store: Store) {
        // Watch for valid delivery entities
        this.store.select(selectDeliveryEntities).pipe(
            filter(entities => !!entities && Object.keys(entities).length > 0),
            take(1) // this line (instead of distinctUntilChanged) seems to keep the original set of URL links from reappearing after our desired processing
            // distinctUntilChanged()
        ).subscribe(() => {
            console.log('Store is ready — delivery entities found');
            this.storeReadySubject.next(true);
        });
    }
}
