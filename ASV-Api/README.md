# API ASV 

### Descargar el repositorio.
```sh
  git clone https://github.com/SamehArmouche/ASV.git
```
### Instalar dependencias
```sh
  cd ASV-Api
  npm i 
```
### Ejecutar la api
* En el fichero `/routes/index.js` esta definida el api_key o se coge del .env o se mete manualemnte.
* Ahí habra que meter la api_key de la persona que va a ejecutar el servicio.
```js
const api_key=config.API_KEY || 'tu_apiKey';
```
```sh
  npm run dev
```

### RUTAS 
#### Para obtener los municipios que que concuerdan con el paramtero `prefMpio` siendo el prefijo de un municipio

- [http://localhost:3000/municipios?prefMpio=Aba](http://localhost:3000/municipios?prefMpio=Aba)


#### Para obtener la predicción del dia siguiente con el paramtero `idMpio` siendo el id del municipio y `unidad` la unidad de temperatura `opcional`.
#### Las unidades permitidas `G_FAH` y `G_CEL` y por defecto `G_CEL`.

- [http://localhost:3000/prediccion?idMpio=40001&unidad=G_FAH](http://localhost:3000/prediccion?idMpio=40001&unidad=G_FAH)

