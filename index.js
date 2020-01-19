let express = require("express");  //Express is a in-built module
let app = express(); // we have invoked 'express' module here and assigned it to the 'app' variable
//console.log(app);
let port = process.env.NODE_ENV || 4800;
app.use(express.json()); // in-built middleware to accept JSON data in express js
let Joi = require("@hapi/joi");

let songs = [
    {id: 1, name:"AAAAAA", singer: "Ashwini",  duration: "4 min",   price:1000},
    {id: 2, name:"BBBBBB", singer: "Priyanka", duration: "4 min",   price:700},
    {id: 3, name:"CCCCCC", singer: "Amruta",   duration: "4.3 min", price:500},
    {id: 4, name:"DDDDDD", singer: "MAdhuri",  duration: "3.7 min", price:9000},
    {id: 5, name:"EEEEEE", singer: "Neha",     duration: "3.5 min", price:2000},
    {id: 6, name:"FFFFFF", singer: "Pallavi",  duration: "4.5 min", price:5000}
            ];

// -----Fetch All Song Data
app.get("/api/allsongs", (req,res) => {
    //res.send("Hello");    
    res.send(songs);
});

// -----Fetch Song Data by Id
app.get("/api/song/:id", (req, res) => {
    // let id = req.params.id;
    // res.send(id);
    let song = songs.find(item => item.id === parseInt(req.params.id));
    if(!song){ return res.status(404).send({message : "Invalid song ID"}) };
    //res.send(song);
    let {id, name, singer, duration, price} = song;
    res.send(name);
});

//------Create a new Song data
app.post("/api/song/newsong", ( req, res ) =>{
    let {error} = validationError(req.body);
    if(error){ return res.send(error.details[0].message)}

    let song = {
        id : songs.length + 1,
        name : req.body.name, 
        singer : req.body.singer,
        duration : req.body.duration,
        price : req.body.price
    }
    songs.push(song);
    res.send(songs);

});

//------Update song-------

app.put("/api/song/updatesong/:id", (req, res) => { 

    // ID Check
    let song = songs.find(item => item.id === parseInt(req.params.id));
    if(!song){ return res.status(404).send({message : "Invalid song ID"}) };

    //Validate using Joi 
    let {error} = validationError(req.body);
    if(error){ return res.send(error.details[0].message)}

    //Save
    song.name = req.body.name;
    song.singer = req.body.singer;
    song.duration = req.body.duration;
    song.price = req.body.price;
    res.send(songs);
});

//------Remove Song------
app.delete("/api/song/removesong/:id", (req,res) => {

    //ID Check
    let song = songs.find(item => item.id === parseInt(req.params.id));
    if(!song){ return res.status(404).send({message : "Invalid song ID"}) };

    let index = songs.indexOf(song);
    songs.splice(index,1);
    res.sen({message: "Removed the selected Song", s: songs});

});

function validationError(error)
{
    let Schema = Joi.object({
        name : Joi.string().min(3).required(),
        singer : Joi.string().min(3).required(),
        duration : Joi.string().alphanum().required(),
        price : Joi.number().required()
    });
    return Schema.validate(error);
}

app.listen(port, () => {console.log(`port working on ${port}`)});
