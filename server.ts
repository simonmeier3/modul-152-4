import express = require('express');
import multer = require('multer');

const app = express();
const herokuUrl = "https://immense-eyrie-45228.herokuapp.com/";
let audioFile;
let vttFile;

let store = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

let upload = multer({storage: store});

app.post('/api/audio', upload.fields([{name: 'audio', maxCount: 1}, {name: 'vtt', maxCount: 1}]), (req, res) => {

    audioFile = req.files['audio'][0].filename;
    vttFile = req.files['vtt'][0].filename;

    res.json({
        data: {
            audio: herokuUrl + audioFile,
            vtt: herokuUrl + vttFile
        }
    })
})

app.use(express.static('uploads'));

app.listen(process.env.PORT || 3000);