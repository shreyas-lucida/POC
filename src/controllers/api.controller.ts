import { ActionResponse } from '@shared';
import { Controller, Get } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { promisify } from 'util';
import * as responses from '../responses';
import { web } from './client_secret';
// import GoogleSpreadsheet from  '../../node_modules/google-spreadsheet/lib/GoogleSpreadsheet';
const GoogleSpreadsheet = require('google-spreadsheet');

@Controller('/')
export class ApiController {

  constructor() { }

  @Get('/test')
  test(): Promise<ActionResponse<any>> {
    return this.accessSpreadsheet().then((rows) => {
      const response = responses.getOkayResponse();
      const carddata = rows;
      return {
        ...response,
        data: {
          card: carddata,
        },
      };
    });
  }

  async accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1LqdfccWiPMgzUr16dbSNFtdCW2iOKlGpWC4ZzoRC2DU');
    await promisify(doc.useServiceAccountAuth)(web);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const configSheet = info.worksheets[1];
    const testSheet = info.worksheets[2];


    const rows = await promisify(sheet.getRows)({
      offset: 1
    });
    const config = await promisify(configSheet.getRows)({
      offset: 1
    });
    const test = await promisify(testSheet.getRows)({
      offset: 1
    });
    let rowsArray = [];
    rowsArray.push(rows);
    rowsArray.push(config);
    rowsArray.push(test);
    console.log('================', rowsArray)
    return rowsArray
  }

  @Get('/error-test')
  errorTest(): ActionResponse<void> {
    throw new BadRequest('This is an error!');
  }
}