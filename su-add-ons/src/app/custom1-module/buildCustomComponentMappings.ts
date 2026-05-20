import { activeAddonKey, useBuildAddonMapping } from '../state/active-addon.generated';
import { resolveAddonRuntimeProfile } from '../../addons/registry';
import { selectorComponentMap as localSelectorComponentMap } from './customComponentMappings';

export const buildSelectorComponentMap =
  useBuildAddonMapping && activeAddonKey
    ? resolveAddonRuntimeProfile(activeAddonKey).selectorComponentMap
    : localSelectorComponentMap;
