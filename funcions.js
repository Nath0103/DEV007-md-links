import path from'path';
import fs from'fs';

// Validar la ruta
function validarRuta(ruta) {
  if (fs.existsSync(ruta)) {
    console.log("La ruta existe.");
    return true;
  } else {
    console.error("La ruta no existe.");
    return false;
  }
}
// Combierte la ruta a absoluta
function rutaAbsolute(ruta) {
  const rutaAbsoluta = path.resolve(ruta); //ya pasamos la ruta a absoluta
  console.log(rutaAbsoluta);
  return true // por ahora

}
//Comprobar si es un Directorio
function directorio(ruta){
  const r = fs.lstatSync(ruta);
  return r.isDirectory() ? true : false;//true
}
//Comprobar si es un Archivo
function archivo(ruta){
  const a = fs.lstatSync(ruta);
  return a.isFile() ? true : false;//true
}
// pregunta si el archivo es MD
function esArchivoMD(ruta) {
  const extension = path.extname(ruta);
  return extension === ".md";
}
export {
  validarRuta,
  rutaAbsolute,
  directorio,
  archivo,
  esArchivoMD,
};
