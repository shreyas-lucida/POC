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
  clientId: 'bd8a697c-0795-4231-9764-8e4d1e5bcac5',
  authority: 'https://login.microsoftonline.com/1ca6df86-6785-4ffe-8dd3-b0c8527f33cc/',
  redirectUrl: 'https://cm3dapp.azurewebsites.net/home'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
