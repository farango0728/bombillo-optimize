# bombillo-optimize

# APINODE

* npm install --force
* npm run start

# POSTMAN
* Tutorial de postman | https://drive.google.com/file/d/11hRqq94sm8Xv8hcP1msfA1C7F5NLBa-J/view?usp=sharing

* METHOD POST | http://localhost:3502/api/matriz/optimize
  * Body | form-data
  * KEY | file, (mover cursor al input para que la opcion file o text aparezca)
  * Select Files | click en el boton para abrir el examinador de archivos
  * Respuesta exitosa | http://localhost:3502/api/matriz/resultado

* MATRIZ | contenido del txt debe ser binario (1, 0)
  * Cualquier matriz corrupta sera rechazada
  * Funcionalidad básica: por medio de ciclos se hizo la busqueda de posibles habitaciones
  disponibles, en la corrida inicial se coloca el bombillo en la primera habitacion disponible, cada que vez que aparece una pared se rehace esta validacion, para las corridas siguientes se verifica si el bombillo se puede colocar, buscando habitaciones no solo en su propia zona sino en zonas anteriores para evitar el uso excesivo de bombillas.
  * La optimización puede llevarse a un punto mas alto, pero por temas de tiempo se dejo como una demo competente.
