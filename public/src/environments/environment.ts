// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiServer: 'https://cm3dapp.azurewebsites.net',
  // clientId: 'bd8a697c-0795-4231-9764-8e4d1e5bcac5',
  // authority: 'https://login.microsoftonline.com/1ca6df86-6785-4ffe-8dd3-b0c8527f33cc/',
  // redirectUrl: 'https://cm3dapp.azurewebsites.net/home'
  apiServer: 'http://localhost:3000',
  clientId: '8c07b072-769b-4644-bc93-396ea8f60dda',
  authority: 'https://login.microsoftonline.com/af23612e-ff6b-4828-9293-0b2542fff338/',
  redirectUrl: 'http://localhost:4200/#/home'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.