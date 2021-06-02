const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){
     db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT, 
            descriptionImage TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    /*  db.run(`DELETE FROM ideas WHERE ideas`, [], function(err){
        if(err) return console.log(err)
        console.log("DELETEI", this)
    })*/  
})

module.exports = db 