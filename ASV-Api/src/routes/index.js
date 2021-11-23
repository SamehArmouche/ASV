const { Router } = require('express');
const router = Router();

router.get('/municipios', (req, res) =>{
  if(req.query.prefMpio===undefined){
    res.status(400);
    res.send("Error");
  }else{
    res.status(200);
    res.send("Ok");
  }
});

router.get('/prediccion', (req, res) =>{
  if(req.query.idMpio===undefined){
    res.status(400);
    res.send("Error");
  }else{
    res.status(200);
    res.send("Ok");
  }
});


module.exports = router;