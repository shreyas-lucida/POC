// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //SERVER CONFIGS
  // apiServer: 'https://cm3dapp.azurewebsites.net',
  // clientId: 'bd8a697c-0795-4231-9764-8e4d1e5bcac5',
  // authority: 'https://login.microsoftonline.com/1ca6df86-6785-4ffe-8dd3-b0c8527f33cc/',
  // redirectUrl: 'https://cm3dapp.azurewebsites.net/home',
  // readFileUrl: './assets/excel/CM3D_Report_Inventory.xlsx',
  // uploadFileUrl: './assets/excel/'

  // LOCAL CONFIGS
  apiServer: 'http://localhost:3000',
  clientId: '6fbedafe-19cb-45e2-be2b-58f924c0eb9b',
  authority: 'https://login.microsoftonline.com/1ca6df86-6785-4ffe-8dd3-b0c8527f33cc/',
  redirectUrl: 'http://localhost:4200/home',
  readFileUrl: '../../assets/excel/CM3D_Report_Inventory.xlsx',
  uploadFileUrl: './public/src/assets/excel'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
