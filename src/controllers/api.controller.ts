import { ActionResponse, LoginActionResponse, UserProfile } from '@shared';
import { BodyParams, Controller, Get, Post, QueryParams, UseBefore } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { promisify } from 'util';
import { RequestUser } from '../decorators/request-user.decorator';
import { RegisterForm } from '../forms';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserProfileDbModel } from '../models';
import * as responses from '../responses';
import { AuthService } from '../services/auth.service';
import { web } from './client_secret';
// import GoogleSpreadsheet from  '../../node_modules/google-spreadsheet/lib/GoogleSpreadsheet';
const GoogleSpreadsheet = require('google-spreadsheet');

@Controller('/')
export class ApiController {

  constructor(private authService: AuthService) { }

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

    const rows = await promisify(sheet.getRows)({
        offset: 1
    });
    const config = await promisify(configSheet.getRows)({
      offset: 1
  });
    let rowsArray = [];
    rowsArray.push(rows);
    rowsArray.push(config);
  console.log('================', rowsArray)
    return rowsArray
  }


  @Get('/error-test')
  errorTest(): ActionResponse<void> {
    throw new BadRequest('This is an error!');
  }

  @Get('/say-something')
  saySomething(
    @QueryParams('whatToSay') whatToSay: string
  ): ActionResponse<string> {
    return responses.getOkayResponse<string>(whatToSay);
  }

  @Post('/login')
  login(
    @BodyParams('username') username: string,
    @BodyParams('password') password: string
  ): Promise<LoginActionResponse> {
    return this.authService.authenticate(username, password).then((user) => {
      if (!user) throw new BadRequest(`Username or password are invalid!`);

      const token = this.authService.generateToken(user.toJSON());
      const response = responses.getOkayResponse();

      return {
        ...response,
        data: {
          token: token,
          profile: user,
        },
      };
    });
  }

  @Get('/profile')
  @UseBefore(AuthMiddleware)
  getProfile(@RequestUser() user: UserProfile): UserProfile {
    return user;
  }

  @Get('/admin')
  @UseBefore(AuthMiddleware)
  adminTest(): Promise<ActionResponse<void>> {
    return this.test();
  }

  @Get('/logout')
  @UseBefore(AuthMiddleware)
  logout(): Promise<ActionResponse<void>> {
    // TODO: Implement your own logout mechanisem (JWT token blacklists, etc...)
    return Promise.reject(`Logout has not been implemented!`);
  }

  // TODO: Maybe move to model validations of Ts.ED? http://v4.tsed.io/docs/model.html#example
  @Post('/register')
  register(
    // Don't validate using the built in models
    @BodyParams() registerForm: RegisterForm
  ): Promise<UserProfile> {
    // Hash the user password and create it afterwards
    return registerForm.getHashedPassword().then((hashedPassword) => {
      return UserProfileDbModel.create({
        ...registerForm,
        password: hashedPassword,
      });
    });
  }
}