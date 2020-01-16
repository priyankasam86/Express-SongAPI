let express = require("express");  //Express is a in-built module
let app = express(); // we have invoked 'express' module here and assigned it to the 'app' variable
//console.log(app);
let port = process.env.NODE_ENV || 4800;

let songs = [
    {id: 1, name:"AAAAAA", Singer: "Ashwini",  Duration: "4 min",   price:1000},
    {id: 2, name:"BBBBBB", Singer: "Priyanka", Duration: "4 min",   price:700},
    {id: 3, name:"CCCCCC", Singer: "Amruta",   Duration: "4.3 min", price:500},
    {id: 4, name:"DDDDDD", Singer: "MAdhuri",  Duration: "3.7 min", price:9000},
    {id: 5, name:"EEEEEE", Singer: "Neha",     Duration: "3.5 min", price:2000},
    {id: 6, name:"FFFFFF", Singer: "Pallavi",  Duration: "4.5 min", price:5000}
            ];

app.get("/api/allsongs", (req,res) => {
    //res.send("Hello");
    res.send(songs);
});

app.get("/api/song/:id", (req, res) => {
    // let id = req.params.id;
    // res.send(id);
    let song = songs.find(item => item.id === parseInt(req.params.id));
    if(!song){ return res.status(404).send({message : "Invalid song ID"}) };
    res.send(song);
})


app.listen(port, () => {console.log(`port working on ${port}`)});