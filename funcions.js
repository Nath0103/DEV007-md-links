import path from "path";
import fs from "fs";
// Validar la ruta
function validarRuta(ruta) {
  if (fs.existsSync(ruta)) {
    console.log("----La ruta existe.----");
    return true;
  } else {
    // console.log("----La ruta no existe----");
    return false;
  }
}
// Comvierte la ruta a absoluta
function rutaAbsolute(ruta) {
  const rutaAbsoluta = path.resolve(ruta); //ya pasamos la ruta a absoluta
  console.log(rutaAbsoluta);
  return rutaAbsoluta;
}
//::::::::::::::::::::::RECURSIVIDAD:::::::::::::::::::::::::::::::::::::::
// pregunta si el archivo es MD
function esArchivoMD(ruta) {
  const extension = path.extname(ruta);
  return extension === ".md";
}

function directorioOArchivo(ruta) {
  let arrayArchivos = [];

  const contenedorArchivos = fs.statSync(ruta);
  if (contenedorArchivos.isFile()) {
    if (esArchivoMD(ruta)) {
      arrayArchivos.push(ruta);
    }
  } else if (contenedorArchivos.isDirectory()) {
    const archivos = fs.readdirSync(ruta, "utf-8");
    archivos.forEach((archivo) => {
      const directorioNuevo = path.join(ruta, archivo);
      const contenedorNuevo = fs.statSync(directorioNuevo);
      if (contenedorNuevo.isFile()) {
        if (esArchivoMD(directorioNuevo)) {
          arrayArchivos.push(directorioNuevo);
        }
      } else if (contenedorNuevo.isDirectory()) {
        const archivosEnDirectorios = directorioOArchivo(directorioNuevo);
        arrayArchivos.push(...archivosEnDirectorios.filter(esArchivoMD));
      }
    });
  }
  console.log(arrayArchivos);
  return arrayArchivos;
}

// -------------------------------------------------

export {
  validarRuta,
  rutaAbsolute,
  esArchivoMD,
  directorioOArchivo,
};
