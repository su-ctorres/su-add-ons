
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Define the shape of the Delivery state
interface DeliveryState {
  entities: { [key: string]: any };
}

// Feature selector to access the 'Delivery' slice
const selectDeliveryState = createFeatureSelector<DeliveryState>('Delivery');

// Selector to get the entities from the Delivery state
export const selectDeliveryEntities = createSelector(
  selectDeliveryState,
  (deliveryState: DeliveryState) => deliveryState.entities
);
