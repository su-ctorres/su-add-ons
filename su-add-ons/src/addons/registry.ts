import { AddonRuntimeProfile } from './addon-profile.types';
import { suTestBannerProfile } from './su-test-banner';
import { orcaExternalSearchProfile } from './orca-external-search';
import { orcaDisplayMmsidProfile } from './orca-display-mmsid';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'su-test-banner': suTestBannerProfile,
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
