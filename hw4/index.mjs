import express from 'express';
import GitHubLanguagesClient from "github-languages-client";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get('/languages', async (req, res)=>{
    const preferredLanguages = ["JavaScript", "Python", "Java", "C", "C++", "C#", "Ruby", "Rust", "HTML", "PHP", "SQL"];

    const languages = GitHubLanguagesClient
    .getAllLanguages()
    .filter(language => preferredLanguages.includes(language.name));


    const url = `https://api.github.com/repos/nodejs/node/languages`
    const response = await fetch(url)

    const repoLanguages = await response.json();


    res.render("languages", {languages, repoLanguages});
});

app.get('/datastructures', (req, res)=>{
    res.render("datastructures");
});

app.get('/networking', (req, res)=>{
    res.render("networking");
});

app.get('/operatingsystems', (req, res)=>{
    res.render("operatingsystems");
});

app.get('/', (req, res)=>{
    res.render("index");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
   console.log(`server started on port ${PORT}`);
});