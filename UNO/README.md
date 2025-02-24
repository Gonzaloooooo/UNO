# UNO v(1.0.0)

## Índice

### 1. Base de datos
### 2. Node.js
### 3. API
### 4. Python
### 5. ORM
### 6. Test
### 7. Instalación
### 8. Normas


## 1. Base de datos

### Tabla Cartas
En la tabla carta se encuentran todas las cartas del juego. Estas se llamarán una vez empezada la partida, se barajarán y se insertaran en el mazo. Y no se volverán a usar en la partida.
### Tabla Jugadores
En la tabla jugadores se almacenará la información de ellos. Sus nombres y sus IDs.
### Tabla Partidas
En la tabla partida se almacenará el inicio y fin de las mismas más el orden de los jugadores de ella.
### Tabla PartidaJugadores
La tabla partidajugadores es la tabla intermedia entre jugadores y partidas que almacenará las cartas y la puntuación de cada jugador de cada partida.
### Tabla Mazos
En la tabla mazos se almacenará el mazo(de donde se cojen las cartas) y el mazo de descartes(donde se echán)
### Tabla Estado
Esta tabla tendrá una imagen de la partida en cada turno. Dicha imagen contendrá: la última carta jugada, el efecto, el turno...

## 2. Node
Lo primero que te pide la página es el número de jugadores que van a jugar (2-4) y sus nombres. Después inicia la partida, en la cual se reparten 7 cartas por jugador y deben echar acorde a las normas del UNO, en caso de que no pueda echar deberá robar. Hay cartas especiales las cuales causarán un efecto que hara que tenga robar, saltar turno o cambiar de color. Una vez a un jugador le quede una carta deberá pulsar el botón uno en menos de 3 segundos o cogerá 2 cartas. El primer jugador que se quede sin cartas gana.

## 3. API
La API se encuentra en el archivo server.js y en el se encuentran los endpoints con las funciones .js y .py. Dichos endpoints se comunican con el frontend con las cors.

## 4. Python
La función que hemos hecho en python(getDatosFromJugador.py) es la de mostrar cuantas partida ha jugado el jugador que inicia sesión. Este dato se muestra en página InicioSesion junto al nombre del jugador del que se ingrese el nombre.

## 5. ORM
La función que hemos hecho con el ORM(getUltimaCartaOrm.js) es la que muestra la carta del mazo descartes. La función coge la ultima carta que un jugador ha echado con el estado.

## 6. Test
Le hemos hecho los test a la función comprobarEfecto.js que solo puede devolver true o false. Dicha función coge el efecto de la tabla estado y dependiendo de cual sea(coger4, coger2, saltoTurno o normal) el siguiente jugador podrá o no jugar turno y si deberá o no coger cartas del mazo. Excepto en el caso de coger2 que depende de si tiene el siguiente jugador de la partida un mas2 cogerá cartas y perderá el turno en caso de que no.

## 7. Instalación
Los pasos para instalación del UNO son:
1. Correr toda la base de datos en el orden en el que viene.
2. Hacer `npm install` del proyecto para instalar todas las dependencias que hemos usado en el archivo
3. Lanzar el server
4. Lanzar el proyecto de React con `npm run`
5. En caso que no funcione compruebe si los archivos conexion.js y getDatosFromJugador.py tengán el mismo puerto asignado que su base de datos

## 8. Normas
Este apartado sirve para aclarar las normas que hemos usado en nuestra versión del UNO, ya que este juego cada uno juega con normas distintas. 
Una vez se inicia el juego, cada jugador tienen 7 cartas y la primera carta del mazo descartes se destapa. Le toca al primer jugador que debe cumplir estas normas(como el resto de ellos):
1. El jugador solo puede echar carta en caso de que sea el mismo color, número o tipo de la que hay en el mazo descartes. A no ser que el jugador eche una carta negra que no depende de ningún color.

2. Solo se puede echar una carta por turno.

3. Puedes robar cartas de forma infinita(lo que el mazo permita) y aunque puedas echar carta pero solo durante tu turno.

4. Exiten cartas especiales como:
    1. Cambio de sentido: dicha carta cambiara el sentido del juego. En el caso de que jueguen dos jugadores esta carta no tendrá ningún efecto.
    2. Salto de turno: dicha carta saltara el turno del siguiente jugador.
    3. Mas2: dicha carta hara que el siguiente jugador deberá coger 2 cartas del mazo, a no ser que tenga otra carta mas2. Se puede concatenar mas2 hasta que el jugador al que le llegue el turno no tenga ningún mas2 y cogerá la cantidad de cartas del mazo equivalente a las cartas mas2 que le hayan echado multiplicado por 2. Y no jugara carta en ese turno.
    4. Mas4(negra): El jugador que echa esta carta cambiara de color y el siguiente jugador a parte de perder el turno cogera cuatro cartas del mazo(En este caso no se puede concatenar).
    5. Cambio de color(negra): El jugador que echa esta carta cambiara de color.

5. Cuando te quede una carta deberás pulsar el botón UNO en menos de 3 segundos o cogerás 2 cartas más.

6. El primer jugador en quedarse sin cartas gana.

7. El resto del podio se define según la puntuación de sus cartas, contra mas puntos peor. La puntuación de las cartas serán la misma que su número. Si son cartas especiales sumaran 20 puntos o 50 si son negras.
