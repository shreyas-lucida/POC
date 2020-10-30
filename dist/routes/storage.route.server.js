"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_controller_server_1 = require("../controllers/storage.controller.server");
class StorageRoutes {
    constructor(app) {
        this.setupRoutes(app);
    }
    // define the default route (Path -> '/')
    setupRoutes(app) {
        app.post('/api/storage', storage_controller_server_1.default.uploadControl);
        app.get('/getFile/:name', storage_controller_server_1.default.getFile);
    }
}
exports.default = StorageRoutes;
//# sourceMappingURL=storage.route.server.js.map