import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let apiKey = "SIkj46CW5LluE3wRpnPPNxoBnvXg2VLYa4N5vk5iEWA";
	let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index",{"image":randomImage})
});

app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', {planetEarth});
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    console.log(planetMars);
    res.render('mars', {planetMars});
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    res.render('planet', { planetInfo, planetName });
});

app.get('/pod', async(req, res)=>{
    let apiKey ="9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
    let url =`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2026-11-22`;
    console.log(url);
    let response = await fetch(url);
    console.log("Status:", response.status);
    let data = await response.json();
    console.log(data.date);
    console.log(data.title);
    console.log(data.url);

    res.render('pod', {pod: data});
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
   console.log(`server started on port ${PORT}`);
});
