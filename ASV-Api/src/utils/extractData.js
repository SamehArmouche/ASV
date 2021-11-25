const fetch = require('cross-fetch')

getData = async (url, unidad) => {
  return fetch(url)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    let decoder = new TextDecoder("iso-8859-1");
    let data = JSON.parse(decoder.decode(buffer));
    const dataRequierida={};
    const dataPrecipitacion=[];
    const fechaDiaSiguiente=data[0].prediccion.dia[1].fecha;
    
    const result = data.filter(item =>  {
      itemPrecipitacion={}
      precipitacion={}
      dataRequierida["mediaTemperatura"] = (item.prediccion.dia[1].temperatura.maxima+item.prediccion.dia[1].temperatura.maxima)/2;
      dataRequierida["unidadTemperatura"]= unidad;
      item.prediccion.dia[1].probPrecipitacion.filter(precipitacionItem =>  {
        itemPrecipitacion["probabilidad"]= precipitacionItem.value;
        itemPrecipitacion["periodo"]= precipitacionItem.periodo; 
        dataPrecipitacion.push(itemPrecipitacion)
      });
      dataRequierida['probPrecipitacion'] = dataPrecipitacion;
    });
    return dataRequierida;
  })
  .catch((err) => {return err;} );
};

exports.getData = getData;