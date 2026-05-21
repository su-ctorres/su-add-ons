import { AddonRuntimeProfile } from '../addon-profile.types';
import { SuUserLinksComponent } from '../../app/su-user-links/su-user-links.component';

export const suUserLinksProfile: AddonRuntimeProfile = {
  key: 'su-user-links',
  buildName: 'su-user-links',
  selectorComponentMap: new Map<string, any>([
    ['su-user-links', SuUserLinksComponent]
  ])
};
