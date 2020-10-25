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
    const rows = await promisify(sheet.getRows)({
      offset: 1
    });
    let rowsArray = [];
    rowsArray.push(rows);
    return rowsArray
  }

  @Get('/error-test')
  errorTest(): ActionResponse<void> {
    throw new BadRequest('This is an error!');
  }
}