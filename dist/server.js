"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// configure (default as dev) or pick environment
process.env.MYSQL_ENV = process.env.MYSQL_ENV || process.argv[2] || 'development';
const PORT = process.env.APP_PORT || 3000;
// load modules
const express_1 = require("./configs/express");
express_1.default.listen(+PORT, function () {
    console.log('Server connection success !!!');
});
process.on('SIGTERM', () => endServer);
process.on('SIGINT', () => endServer);
function endServer() {
    console.info('SIGTERM signal received.');
    console.log('Closing server.');
    express_1.default.close();
}
// re-export app instance for testing purpose
module.exports = express_1.default;
//# sourceMappingURL=server.js.map