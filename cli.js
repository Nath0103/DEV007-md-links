import { mdLinks } from "./index.js";

const ruta = process.argv[2]; // Obtenemos la ruta desde línea de comandos

mdLinks(ruta)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
