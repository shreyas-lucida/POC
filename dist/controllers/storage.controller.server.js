"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const PUBLIC_STORAGE_BASE = 'public/documents/';
const multer = require('multer');
// var upload = multer({dest:'public/src/assets/excel'}); //local
var upload = multer({ dest: 'uploads/' }); //server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './public/src/assets/excel'); //local
        cb(null, './uploads/'); //server
    },
    filename: function (req, file, cb) {
        cb(null, 'CM3D_Report_Inventory.xlsx');
    }
});
var upload = multer({ storage: storage });
class StorageController {
    uploadControl(req, resp) {
        upload.single('file')(req, resp, (err) => {
            if (err) {
                resp.status(400).send("Something went wrong!");
            }
            resp.send(req['file']);
        });
    }
    getFile(req, res) {
        res.status(200).send('API Working');
    }
}
const controller = new StorageController();
exports.default = controller;
//# sourceMappingURL=storage.controller.server.js.map