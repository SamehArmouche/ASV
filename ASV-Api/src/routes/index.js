const { Router } = require('express');
const router = Router();
const fetch = require('cross-fetch')

const API_URL_BASE = "https://opendata.aemet.es/opendata/api/";
const api_key='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYTc0QGFsdS51YS5lcyIsImp0aSI6ImY2OWYwOTVlLThhNjItNGMxZi1hZDJlLWI3YzYxZjA2MWM1NCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjM3NjcwODkyLCJ1c2VySWQiOiJmNjlmMDk1ZS04YTYyLTRjMWYtYWQyZS1iN2M2MWYwNjFjNTQiLCJyb2xlIjoiIn0.ljG2L_wcF4NvQFAipiQ5AvXXMN9Eg-LS1roprTMs0QI';

router.get('/municipios', async (req, res) =>{
  if(!req.query.prefMpio){
    res.status(400).json({mensaje: "Bad request - falta el parametro prefMpio"});
    return;
  }
  
  fetch(API_URL_BASE+'maestro/municipios',
    {
      headers: {
        'Content-Type': 'application/json',
        'api_key': api_key
      }
    })
  .then(response => response.arrayBuffer())
  .then(buffer => {
    let decoder = new TextDecoder("iso-8859-1");
    let data = JSON.parse(decoder.decode(buffer));
    const result = data.filter(item =>  item.nombre.includes(req.query.prefMpio));
    const response=[];
    Object.keys(result).forEach(function(key) {
      item = {}
      item ["nombre"] = result[key].nombre;
      item ["id"] = result[key].id.substring(2);;
      response.push(item);
    })
    res.status(200).send(response)
  })
  .catch((err) => res.status(400).json({mensaje: err}));
});



router.get('/prediccion', (req, res) =>{
  if(!req.query.idMpio){
    res.status(400).json({mensaje: "Bad request - falta el parametro idMpio"});
    return;
  }
    res.status(200).send("Ok");
});


module.exports = router;
