// load modules
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser'
const helmet = require('helmet');
var cors = require('cors')

const allowedMethods = ['OPTIONS', 'GET','HEAD','POST', 'DELETE', 'PUT'];
// Configuration setup 
import ConfigInitialize from './setups.config.server';

// controller imports


// Routes imports
import StorageRoutes from '../routes/storage.route.server';


class App {
   public app: any;
   private cronTask: any;

   constructor() {
      this.app = express();
      this.config();
      this.routes();
      // initialize the env with default db records.
      this.init();
      this.configureFinalHandlers();
   }

   // App level exception handler
      configureFinalHandlers = () => {
         // application level exception handler
         this.app.use(function (err, req, res, next) {
             console.error(err.stack)
             res.status(500).send('Please contact admin or support team!')
         });
     }

   private config(): void {
      // configure middlewares
      this.app.use(require('express-status-monitor')())

       // --------- Logger configuration
       this.app.use(morgan('short'));


      // ------- to protect your app from some well-known web vulnerabilities by setting 
      // ------- HTTP headers appropriately.
      this.app.use(helmet());

      this.configHelmet();
      // ------- end of vulnerability 

      // to avoid revealing Tech stack through header
      this.app.disable('x-powered-by');

      // --------- request content parser

      // For Express Validation
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }))

      this.app.use(cors())
      // -------- CORS configuration
      const origins = [
         'http://localhost:3000', 'http://localhost:4200', 'http://localhost:8200', 'ionic://localhost', 'http://localhost'
      ];

      this.app.use(function (req, resp, next) {
         if (req.headers.origin && origins.indexOf(req.headers.origin) > -1) {
            resp.setHeader('Access-Control-Allow-Origin', req.headers.origin);
         }
          // To allow request methods like OPTIONS, GET,HEAD,POST, DELETE, PUT
          if (!allowedMethods.includes(req.method)){
            resp.status(405).send('Method Not Allowed');
         }

         resp.setHeader('Access-Control-Allow-Origin',
            '*');
         resp.setHeader('Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PUT, DELETE');
         resp.setHeader('Access-Control-Allow-Headers',
            'application/json, X-Requested-With,application/x-www-form-urlencoded, image/png, Content-Type, Authorization, Origin, Accept, multipart/form-data , application/octet-stream');
         resp.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Access-Control-Allow-Origin');
         next();
      });
      // configure request token verifiation middleware
      // this.app.use(Authentication.decodeAuthToken);

      // -------- to serve static resoc and includes
      this.app.use(express.static('./public'));

   }

   private routes(): void {
      new StorageRoutes(this.app);
      console.log('routes initialized');
      // initialise and configure routes against app instance
   }

   public init(): void {
      ConfigInitialize.init((err) => {
         // if (err) {
         //    console.log('Failed to initialize environment please restart!\nError:' + err.message);
         //    return;
         // }
         console.log('App ready!');
      });
   }

   public listen(port: number, fn: any): void {
      this.app.listen(port, fn); // without socket.io and express app
   }

   public close() {
      this.app.close(() => {     // stopping http server
         console.log('Http server closed.');
         process.exit(0);        // stop the server process
      });
   }
   
   /** 
    * Handling vulnerability tweaks using helmet
   */
  public configHelmet() {
   //-- to enable Content Security Policy
   this.app.use(helmet.contentSecurityPolicy({
      directives: {
         defaultSrc: ["'self'", 'https:', 'wss:'],
             scriptSrc: ["'self'", "'unsafe-inline'", 'https:', 'wss:'],
             styleSrc: ["'self'", "'unsafe-inline'", 'https:','wss:'],
             imgSrc: ["'self'", 'data:', 'https:'],
             fontSrc: ["'self'", 'data:'],
             objectSrc: ["'none'"],
             mediaSrc: ["'self'"],
             frameSrc: ["'self'"],
             frameAncestors: ["'none'"],
             childSrc: ["'self'"],
             connectSrc:["'self'",'wss:','https','https://login.microsoftonline.com']

      },
      browserSniff: false
   }));

   //-- to disable browser caching
   this.app.use(helmet.noCache());

   //-- prevent browsers from trying to guess (“sniff”) the MIME type
   this.app.use(helmet.noSniff());

   //-- set by web browsers to tell a server where it’s coming from
   this.app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

   //-- to enable Web Browser XSS Protection
   this.app.use(helmet.xssFilter());

   //-- Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header
   this.app.use(helmet.frameguard({ action: 'deny' }));

   //-- to allow Strict-Transport-Security over https
   this.app.use(helmet.hsts({ includeSubDomains: true, maxAge:31536000, preload: true }));

   this.app.use(helmet.expectCt({enforce: true, maxAge: 7776000, reportUri: 'https://ctl.digicet-ct.com'}));
   
   //-- to prevents Adobe Flash and Adobe Acrobat from loading content
   this.app.use(helmet.permittedCrossDomainPolicies());

   // -- to remove the X-Powered-By header to make it slightly harder for attackers
   // this.app.use(helmet.hidePoweredBy({ setTo: 'private' }))

   // to avoid revealing Tech stack through header
   this.app.disable('x-powered-by');
}

}
const app = new App();

export default app;
