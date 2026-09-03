import { AddonRuntimeProfile } from '../addon-profile.types';
import { SuHideSummitComponent } from '../../app/su-hide-summit/su-hide-summit.component';

export const suHideSummitProfile: AddonRuntimeProfile = {
  key: 'su-hide-summit',
  buildName: 'su-hide-summit',
  selectorComponentMap: new Map<string, any>([
    ['nde-full-display-service-container-after', SuHideSummitComponent]
  ])
};
