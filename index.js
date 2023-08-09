import { rutaAbsolute, validarRuta, directorioOArchivo } from "./funcions.js";

// promesa
const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validarRuta(ruta)) {
      if (rutaAbsolute(ruta)) {
        if (directorioOArchivo(ruta)) {
        
        }
      }
    } else {
      reject(console.log('Ruta no válida'));
    }
  });
};

export {
  mdLinks,
};
