const { Router } = require('express');
const  extractData = require('../utils/extractData')
const router = Router();
const fetch = require('cross-fetch')
const API_URL_BASE = "https://opendata.aemet.es/opendata/api/";
const config = require('../../config');
const api_key=config.API_KEY || 'tu_apiKey';
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
    const response=[];
    data.filter(item =>  item.nombre.includes(req.query.prefMpio))
    .filter(item => {
      itemMun={}
      itemMun ["codigo"] = item.id.substring(2);
      itemMun ["nombre"]=item.nombre;
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
    res.status(200).json(await (extractData.getData(data.datos,unidad)));
  })
  .catch((err) => res.status(400).json({mensaje: err}));
});

module.exports = router;
