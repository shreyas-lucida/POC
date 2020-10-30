import controller from '../controllers/storage.controller.server';

export default class StorageRoutes {
   constructor(app: any) {
      this.setupRoutes(app);
   }
   // define the default route (Path -> '/')
   private setupRoutes(app: any) {
      app.post('/api/storage', controller.uploadControl)
      app.get('/getFile/:name', controller.getFile)
   }
}