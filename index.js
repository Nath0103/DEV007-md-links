import { rutaAbsolute, esArchivoMD, validarRuta, directorio,archivo} from "./funcions.js";
// promesa

const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validarRuta(ruta)) {
      if (rutaAbsolute(ruta)) {
        if (directorio(ruta)) {
          console.log("La ruta es de un directorio")
        }
        if (archivo(ruta)) {
          console.log("La ruta es de un archivo")
          if (esArchivoMD(ruta)) {
            console.log("si es un md :D")
          }
        }
      }
    }
  });
  // rutaAbsolute(ruta);
  // esArchivoMD(ruta);
  // validarRuta(ruta);
};

export {
  mdLinks,
};

