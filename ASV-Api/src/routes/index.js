const { Router } = require('express');
const  extractData = require('../utils/extractData')
const router = Router();
const fetch = require('cross-fetch')
const API_URL_BASE = "https://opendata.aemet.es/opendata/api/";
const api_key='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYTc0QGFsdS51YS5lcyIsImp0aSI6ImY2OWYwOTVlLThhNjItNGMxZi1hZDJlLWI3YzYxZjA2MWM1NCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjM3NjcwODkyLCJ1c2VySWQiOiJmNjlmMDk1ZS04YTYyLTRjMWYtYWQyZS1iN2M2MWYwNjFjNTQiLCJyb2xlIjoiIn0.ljG2L_wcF4NvQFAipiQ5AvXXMN9Eg-LS1roprTMs0QI';
const headers ={
  'Content-Type': 'application/json',
  'api_key': api_key
}

router.get('/municipios', async (req, res) =>{
  if(!req.query.prefMpio){
    res.status(400).json({mensaje: "Bad request - falta el parametro prefMpio"});
    return;
  }
  
  fetch(API_URL_BASE+'maestro/municipios',
    {
      headers:headers
    })
  .then(response => response.arrayBuffer())
  .then(buffer => {
    let decoder = new TextDecoder("iso-8859-1");
    let data = JSON.parse(decoder.decode(buffer));
    const result = data.filter(item =>  item.nombre.includes(req.query.prefMpio));
    const response=[];
    result.filter(item => {
      itemMun={}
      itemMun ["nombre"]=item.nombre;
      itemMun ["id"] = item.id.substring(2);
      response.push(itemMun);
    });
    res.status(200).json(response)
  })
  .catch((err) => res.status(400).json({mensaje: err}));
});

router.get('/prediccion', async (req, res) =>{
  var unidad;
  
  if(req.query.unidad && req.query.unidad!="G_FAH" && req.query.unidad!="G_CEL"){
    res.status(400).json({mensaje: "Bad request - unidad de temperatura errónea!"});
    return;
  }
  unidad = (!req.query.unidad) ? 'G_CEL' : req.query.unidad;

  if(!req.query.idMpio){
    res.status(400).json({mensaje: "Bad request - falta el parametro idMpio"});
    return;
  }

  fetch(API_URL_BASE+'prediccion/especifica/municipio/diaria/'+req.query.idMpio,
  {
    headers: headers
  })
  .then(response => response.json())
  .then(async data  =>  {
    const dataProcesada = await (extractData.getData(data.datos,unidad));
    res.status(200).json(dataProcesada);
  })
  .catch((err) => res.status(400).json({mensaje: err}));
});

module.exports = router;
