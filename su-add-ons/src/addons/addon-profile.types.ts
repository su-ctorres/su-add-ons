import { Type } from '@angular/core';

export interface AddonRuntimeProfile {
  key: string;
  buildName: string;
  selectorComponentMap: Map<string, Type<unknown>>;
}
