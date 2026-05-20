import { AddonRuntimeProfile } from '../addon-profile.types';
import { SuTestBannerComponent } from '../../app/su-test-banner/su-test-banner.component';

export const suTestBannerProfile: AddonRuntimeProfile = {
  key: 'su-test-banner',
  buildName: 'su-test-banner',
  selectorComponentMap: new Map<string, any>([
    ['nde-main-menu-after', SuTestBannerComponent]
  ])
};
