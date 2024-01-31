import { InjectionToken, Provider } from '@angular/core';

export const BINGMAPS_KEY = new InjectionToken<string>('An8JNymYeoGzMUqXfVJlMm_9CLeMcpx_5NB0N1G9cUEUxIadv7XX5zVc008au1N1');

export function provideBingmapsKey(key: string): Provider {
  return { provide: BINGMAPS_KEY, useValue: key };
}