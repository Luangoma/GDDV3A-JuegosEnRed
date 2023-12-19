# Instrucciones
## Paso 1: Descarga de Eclipse STS
Ve al sitio web oficial de Eclipse STS: Spring Tools 4 - Eclipse.  
Descarga la versión adecuada para tu sistema operativo.
## Paso 2: Descomprimir los archivos
Una vez descargado, con tu programa de compresión de archivos, descomprime el archivo.  
Generará cuatro archivos de los cuales uno de ellos será otra carpeta comprimida _"contents"_, la cual se deberá descomprimir tambien.  
En el caso de que sea un _.jar_ y tengas una version de Java instalada anteriormente en tu computador, el proceso es más sencillo, simplemente ejecuta el _.jar_.
## Paso 3: Ejecutar Eclipse STS
Accede a la carpeta donde se encuentra la instalación de Eclipse STS y ejecuta el archivo ejecutable correspondiente a tu sistema aoperativo.
## Paso 4: Configuracion inicial
Una vez abierto y cargado el programa, este nos preguntará nuestro área de trabajo (directorio).  
Especificado el área, los archivos del proyecto deben de estar en el interior de esta.  
Abre el proyecto desde el sistema de archivos y seleccionas la carpeta del proyecto.  
_(File >> Open Proyects from File system)_
## Paso 5: Ejecución del proyecto
Para ejecutar el proyecto, se puede proceder de 2 formas:  

**Ejecución desde la interfaz de STS:**  
Para su ejecución, deberemos abrir los difrentes desplegables hasta llegar a la aplicación java. 
_(BurningVillageServer > src/main/java > com.dragon.game >> BurningVillageServerApplication.java)_
Luego, debemos hacer click derecho sobre _BurningVillageServerApplication.java_ y ejecutarlo como una aplicacion de JAVA.  
_(Run As >> Java Application)_

**Ejecución desde la línea de comandos:**  
En Eclipse STS, se selecciona el proyecto _BurningVillageServer_ en el explorador de paquetes. Se selecciona la opción _Run > Run As > Maven Build_ y se configura el Goal _package_.
Se busca el directorio en el que se encuentra el archivo .jar resultante y se abre un terminal. Se ejecuta el con el comando `java -jar BurningVillageServer-0.0.1-SNAPSHOT.jar`, especificando opcionalmente otros parámetros de configuración del servidor (eg: cambiar el puerto `--server.port=27015`).
Para facilitar la ejecución por línea de comandos, se ha creado una serie de scripts (_run_server.bat_ y _run_server.sh_) que ejecutan el comando automáticamente.
## Paso 6: Conexión al servidor
Se puede acceder al servidor por medio de un navegador accediendo al URL correspondiente (_http://ip:puerto_). El archivo encargado de cargar el juego en el lado del cliente es _index.html_, por lo que no es necesario especificar ningún archivo en la ruta al acceder al servidor.  

**Acceso por dirección local:**  
Por defecto, la aplicación se cargará en localhost (127.0.0.1) y en el puerto 8080.  
_http://localhost:8080 | http://127.0.0.1:8080 | http://[::1]:8080_  

**Acceso por dirección pública:**  
En caso de haber abierto el puerto en el que reside el servidor, se puede acceder por medio de la IP pública, permitiendo así el acceso de otros clientes agenos a la red local al servidor.
