const fetch = require('cross-fetch')

getData = async (url) => {
  return fetch(url)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    let decoder = new TextDecoder("iso-8859-1");
    let data = JSON.parse(decoder.decode(buffer));
    const dataRequierida=[];
    const dataPrecipitacion=[];
    const fechaDiaSiguiente=data[0].prediccion.dia[1].fecha;
    
    const result = data.filter(item =>  {
      itemTemperatura={}
      itemPrecipitacion={}
      precipitacion={}
      itemTemperatura["mediaTemperatura"] = (item.prediccion.dia[1].temperatura.maxima+item.prediccion.dia[1].temperatura.maxima)/2;
      item.prediccion.dia[1].probPrecipitacion.filter(precipitacionItem =>  {
        itemPrecipitacion["probabilidad"]= precipitacionItem.value;
        itemPrecipitacion["periodo"]= precipitacionItem.periodo; 
        dataPrecipitacion.push(itemPrecipitacion)
      });
      precipitacion['probPrecipitacion'] = dataPrecipitacion;
      dataRequierida.push(itemTemperatura)
      dataRequierida.push(precipitacion);
    });
    return dataRequierida;
  })
  .catch((err) => {return err;} );
};
exports.getData = getData;