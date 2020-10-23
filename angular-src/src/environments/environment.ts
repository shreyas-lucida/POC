// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServer: 'http://localhost:3000',
  socialLogin: {
    'facebook': '223045385190067',
    'google': '1086867360709-69ko7vlgcc3uuq8a42dmmvgjng1vg02l.apps.googleusercontent.com'
  },
  clientId: '8c07b072-769b-4644-bc93-396ea8f60dda',
  authority: 'https://login.microsoftonline.com/af23612e-ff6b-4828-9293-0b2542fff338/',
  redirectUrl: 'http://localhost:4200/home'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
