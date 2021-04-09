"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var app = express();
var store = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + " " + file.originalname);
    }
});
var upload = multer({ storage: store });
app.post('/api/audio', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'vtt', maxCount: 1 }]), function (req, res) {
    var audioFile = req.files['audio'][0].filename;
    var vttFile = req.files['vtt'][0].filename;
    res.json({
        data: {
            audio: "" + audioFile,
            vtt: "" + vttFile
        }
    });
});
app.listen(process.env.PORT || 3000);
