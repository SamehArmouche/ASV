const fetch = require('cross-fetch')

getData = async (url, unidad) => {
  return fetch(url)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    let decoder = new TextDecoder("iso-8859-1");
    let data = JSON.parse(decoder.decode(buffer));
    const dataRequierida={};
    const dataPrecipitacion=[];
    data.filter(item =>  {
      dataRequierida["mediaTemperatura"] = convertGrados((item.prediccion.dia[1].temperatura.maxima+item.prediccion.dia[1].temperatura.minima)/2,unidad);
      dataRequierida["unidadTemperatura"]= unidad;
      item.prediccion.dia[1].probPrecipitacion.filter(precipitacionItem =>  {
        itemPrecipitacion={}
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

// (0 °C × 9 / 5) + 32  C => F
convertGrados =  (temperatura, unidad) => { return unidad ==  'G_CEL' ? temperatura : (temperatura * 9 / 5) + 32; }


exports.getData = getData;