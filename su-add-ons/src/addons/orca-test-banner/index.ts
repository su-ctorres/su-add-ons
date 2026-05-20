import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaTestBannerComponent } from '../../app/orca-test-banner/orca-test-banner.component';

export const orcaTestBannerProfile: AddonRuntimeProfile = {
  key: 'orca-test-banner',
  buildName: 'orca-test-banner',
  selectorComponentMap: new Map<string, any>([
    ['nde-main-menu-after', OrcaTestBannerComponent]
  ])
};
