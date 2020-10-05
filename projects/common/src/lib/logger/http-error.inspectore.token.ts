import { InjectionToken } from '@angular/core';

export interface IHttpErrorInspectoreConfig {
  moduleName: string;
  production?: boolean;
  retryCount?: number;
}
export const HTTP_ERROR_INSPECTORE_CONFIG = new InjectionToken<IHttpErrorInspectoreConfig>('HTTP_ERROR_INSPECTORE_CONFIG');

