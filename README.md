### Prueba técnica de ASV


#### ¿Cómo haríamos para mejorar el tiempo de respuesta de este servicio?
* Como la información de los municipios no es normal que se cambia periódicamente, se podra cargar todos los
  municipios en la api nuestra en un fichero o en una base de datos `si es necesario` y al dar la respuesta al cliente se consultara este fichero
  y que cada cierto tiempo "un dia o según la necesidad" se actualizara este fichero llamando a AEMET.

#### ¿Por qué motivo piensas que AEMET ha implementado este servicio devolviendo la url?
* Como es un servicio publico y normalmente es de acceso diario, con devloviendo la url se intentará no cargar el servidor
  consultando por parte de los clientes la MISMA url del api muchas veces.

#### Los clientes  les gustaría que se recordara el último municipio seleccionado y que automáticamente les cargue la predicción del día siguiente. ¿Cómo lo podríamos hacer?
* En la aplicacion cliente se podrá guardar en localStorage ultimo municipio consultado y así cuando se
  inicia la aplicación se obtendra del localStorage el último buscado.

#### Tras la amenaza de AEMET con cortarnos el servicio, debemos apresurarnos a buscar alguna solución que afecte lo mínimo posible a nuestros usuarios.
#### ¿Qué podríamos hacer? ¿Cómo implementarías la solución?

* Con el apartado uno se podrá minimizar las llamadas por parte de los clientes cargar el servicio obtener
 municipios.
* En el cliente se podrá emplear un mecanismo de captcha, es decir, durante un tiempo determinado `que sea razonable para no afectar a los usuarios`
 si se hace muchas peticiones de forma incoherente se visualzara una captcha en la interfaz del cliente.
* Esta captcha nos da la posibilidad de parar el sobrecarga de nuestro servicio y con lo cual el servicio de AEMET.



### Aspectos para mejorar.
##### Por coincidir con las entregas del fin del curso:
* No había bastante tiempo para mejorar la API, había que gestionar los errores devloviendo el codigo de estados correspondientes.
* Tenía poco tiempo para investigar mas sobre AutoComplete de Angular y terminar el cliente.