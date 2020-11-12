import { Request, Response } from 'express';
import * as fs from 'fs';
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './public/src/assets/excel'); //local
        cb(null, './assets/excel/'); //server
    },
    filename: function (req, file, cb) {
        cb(null, 'CM3D_Report_Inventory.xlsx');
    }
});
var upload = multer({ storage: storage })

class StorageController {

    public uploadControl(req: Request, resp: Response) {
        upload.single('file')(req, resp, (err) => {
            if (err) {
                resp.status(400).send("Something went wrong!");
            }
            resp.send(req['file']);
        });
    }

    public getFile(req: Request, res: Response) {

        res.status(200).send('API Working');
    }

}

const controller = new StorageController();
export default controller;