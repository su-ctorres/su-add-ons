import { AddonRuntimeProfile } from '../addon-profile.types';
import { SuActionButtonsComponent } from '../../app/su-action-buttons/su-action-buttons.component';

export const suActionButtonsProfile: AddonRuntimeProfile = {
  key: 'su-action-buttons',
  buildName: 'su-action-buttons',
  selectorComponentMap: new Map<string, any>([
    ['nde-main-actions-after', SuActionButtonsComponent]
  ])
};
