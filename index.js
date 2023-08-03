import { rutaAbsolute, esArchivoMD, validarRuta, directorio,archivo, obtenerArchivosMDEnDirectorio} from "./funcions.js";
// promesa

const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validarRuta(ruta)) {
      if (rutaAbsolute(ruta)) {
        if (directorio(ruta)) {
          //("La ruta es de un directorio")
        }
        if (archivo(ruta)) {
          //("La ruta es de un archivo")
          if (esArchivoMD(ruta)) {
            //console.log("si es un md")
          }
        }
      }
    }
  });

};

export {
  mdLinks,
};

