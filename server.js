const express = require('express')
const server = express()
const db = require('./db')

/* const ideas = [
    { 
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        alt: "Imagem de curso de programação",
        title: "Cursos de Programação",
        category: "Aprendizado",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
    { 
        img: "https://image.flaticon.com/icons/png/512/883/883977.png",
        alt: "Imagem de exercícios físicos",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
    { 
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        alt: "Imagem de meditação",
        title: "Meditação",
        category: "Saúde Mental",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
    { 
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        alt: "Imagem de karaokê",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
    { 
        img: "https://image.flaticon.com/icons/png/128/4814/4814462.png",
        alt: "Imagem de horta",
        title: "Horta",
        category: "Passa Tempo e Alimentação Saudável",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
    { 
        img: "https://image.flaticon.com/icons/png/512/4827/4827797.png",
        alt: "Imagem de Filme",
        title: "Filme",
        category: "Diversão",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        url: "http://www.rocketseat.com.br",
    },
] */

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true,
})
 
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){

        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []

        for (let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
        return res.render("index.html", {ideas: lastIdeas})
    }) 
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){

        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideas.html", {ideas: reversedIdeas})
    })
})

server.post("/", function(req, res) {
    const query = `
        INSERT INTO ideas(
            image,
            descriptionImage,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.descriptionImage,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        return res.redirect("/ideias")
    })
})

server.delete("/ideias", function(req, res) {
    db.run(`DELETE FROM ideas WHERE ideas`, [this], function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        console.log("DELETEI", this)
    })
})


server.listen(3000)