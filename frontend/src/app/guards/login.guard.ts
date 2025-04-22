import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Solo lato browser è sicuro usare document
  const isBrowser = isPlatformBrowser(platformId);
  const hasToken = isBrowser && document.cookie.includes('auth_token=');

  if (hasToken) {
    console.info('[LoginGuard] Utente già loggato, redirect a /home');
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
