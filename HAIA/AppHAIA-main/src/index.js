
const path = require('path');
const express = require('express'); 
const app = express();
const isWord = require('is-word');              
const cors = require("cors");
const bodyParser = require('body-parser');
const port = 5000;
const spaWords = isWord("spanish");
const cmd=require('node-cmd')

app.use(cors())
app.use(bodyParser.json())

// cmd.run("python " + path.join(__dirname + "/static/haia.py"),

//     function(err, data, stderr){
//         console.log('examples dir now contains the example file along with : ',data)
//         console.log('stderr : ',stderr)
//         console.log('err : ',err)
//     }
// )



app.get('/', (req, res) => { 
    
    res.sendFile(path.join(__dirname, 'static/index.html'));
});  
    
app.use(express.static(__dirname + "/static"));
app.listen(port, () => {           
    
    console.log(`Now listening on port ${port}`); 
});


app.post('/loadImages', async (req, res) => { 
    cmd.run("python " + path.join(__dirname + "/static/haia.py"), function(err, data, stderr){

        console.log('examples dir now contains the example file along with : ',data)
        console.log('stderr : ',stderr)
        console.log('err : ',err)
        let dataToSend = data.split('\n')
        console.log(typeof(dataToSend))
        dataToSend[0] = dataToSend[0].replace(/"/g, '').split('.')[0];
        let auxData = dataToSend[0]
        auxData = dataToSend[0].split('\r')[0];
        dataToSend[0] = auxData;
        dataToSend[1] = dataToSend[1].replace(/'/g, '"')
        console.log(dataToSend[0]);
        res.send({prompt: dataToSend[0], imagesLoaded: dataToSend[1]})
    }
)
    //let counter = fs.readdirSync(path.join(__dirname + "/static")).length
    //res.send({imagesLoaded: counter})
})

app.post('/check', (req, res) => {
    let valid = [];
    const { sentence } = req.body;
    console.log(sentence);
    sentence.split(' ').forEach(word => {
        valid.push(spaWords.check(word));
    })
    res.send({ valid: valid });
});


