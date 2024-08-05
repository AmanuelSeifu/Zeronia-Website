const express = require("express");
//const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const app = express();
const path = require("path");
var fs = require('fs');
var files = fs.readdirSync('./minigames/');

app.get("/api",(req, res)=> {
    var descs = [];
    var thumbnails = [];
    for (let i = 0; i < files.length; i++) {
        descs.push(require("./minigames/"+files[i]+"/desc.json"));
        thumbnails.push("/minigames/"+files[i]+"/thumbnail.png");
    }
    res.json({
        "name":files,
        "descs":descs,
        "thumbnails":thumbnails
    });
})

files.forEach(element => {
    app.use("/minigames/"+element,express.static(path.join(__dirname, 'minigames',element)));
});


app.listen(5001,()=>"server on port 5000")

//npm run dev