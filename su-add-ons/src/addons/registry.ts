import { AddonRuntimeProfile } from './addon-profile.types';
import { suTestBannerProfile } from './su-test-banner';
import { suActionButtonsProfile } from './su-action-buttons';
import { suUserLinksProfile } from './su-user-links';
import { orcaExternalSearchProfile } from './orca-external-search';
import { orcaDisplayMmsidProfile } from './orca-display-mmsid';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'su-test-banner': suTestBannerProfile,
  'su-action-buttons': suActionButtonsProfile,
  'su-user-links': suUserLinksProfile,
  'orca-external-search': orcaExternalSearchProfile,
  'orca-display-mmsid': orcaDisplayMmsidProfile
};

export function resolveAddonRuntimeProfile(addonKey: string): AddonRuntimeProfile {
  const profile = addonProfiles[addonKey];

  if (!profile) {
    throw new Error(`Unknown add-on runtime profile "${addonKey}".`);
  }

  return profile;
}
