const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.json('Este es un webscraper del sitio https://www.promiedos.com.ar/ (para ver los resultados ir a http://localhost:3000/results)');
});

app.get('/results', async (req, res) => {
    const partidos = await scraper.getPartidos(); // Ahora devuelve datos en vez de usar `res`
    
    if (partidos.error) {
        res.status(500).json(partidos);
    } else {
        res.json(partidos);
    }
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
