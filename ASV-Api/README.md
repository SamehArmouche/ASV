# API ASV 

### Descargar el api.
```sh
  git clone https://github.com/SamehArmouche/ASV.git
```
### Instalar dependencias
```sh
  cd ASV-Api
  npm i 
```
### Ejecutar la api
```sh
  npm run dev
```

### RUTAS 
#### Para obtener los municipios que que concuerdan con el paramtero `prefMpio` siendo el prefijo de un municipio

- [http://localhost:3000/municipios?prefMpio=Aba](http://localhost:3000/municipios?prefMpio=Aba)


#### Para obtener la predicción del dia siguiente con el paramtero `idMpio` siendo el id del municipio y `unidad` la unidad de temperatura `opcional`.
#### Las unidades permitidas `G_FAH` y `G_CEL` y por defecto `G_CEL`.

- [http://localhost:3000/prediccion?idMpio=40001&unidad=G_FAH](http://localhost:3000/prediccion?idMpio=40001&unidad=G_FAH)

