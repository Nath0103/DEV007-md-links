import path from'path';
import fs from'fs';
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
  return rutaAbsoluta 
}
//::::::::::::::::::::::RECURSIVIDAD:::::::::::::::::::::::::::::::::::::::
function directorioOArchivo(ruta) {
  let arrayArchivos=[];
  const contenedorArchivos=fs.statSync(ruta);
  if (contenedorArchivos.isFile()) {
    arrayArchivos.push(ruta);
  }else if (contenedorArchivos.isDirectory()) {
    const archivos = fs.readdirSync(ruta, 'utf-8');
    archivos.forEach(archivo => {
      const directorioNuevo = path.join(ruta,archivo);
     if (directorioNuevo.isDirectory()) {
       arrayArchivos.push(ruta);
     }
    });
  }

}


//Comprobar si es un Directorio
function directorio(ruta){
  const r = fs.lstatSync(ruta);
  return r.isDirectory() ? true : false;//true
}

//
//Comprobar si es un Archivo
function archivo(ruta){
  const a = fs.lstatSync(ruta);
  if (a.isFile()) {
    console.log("La ruta es de un Archivo");
  }else{
    console.log("La ruta NO es un archivo");
  }

}
// pregunta si el archivo es MD
function esArchivoMD(ruta) {
  const extension = path.extname(ruta);
  if (extension === ".md") {
    console.log("si es un md ()");
  }else{
    console.log("----No es un md ()----");
  }
}
// -------------------------------------------------

export {
  validarRuta,
  rutaAbsolute,
  directorio,
  archivo,
  esArchivoMD,
  obtenerArchivosMDEnDirectorio
};
