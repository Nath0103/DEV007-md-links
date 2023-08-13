import path from "path";
import fs from "fs";
import axios from "axios";
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
  //console.log(rutaAbsoluta);
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
    console.log(contenedorArchivos)
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
        // Aquí es donde se realiza la recursividad
        const archivosEnDirectorios = directorioOArchivo(directorioNuevo);
        arrayArchivos.push(...archivosEnDirectorios.filter(esArchivoMD));
      }
    });
  }
  //  console.log(arrayArchivos)
  return arrayArchivos;
}


// Función para encontrar links en el contenido de un archivo md
function obtenerLinks(ruta) {
  //console.log(ruta) // me trae C:\Users\natha\OneDrive\Escritorio\DEV007-md-links\pruebas\holasoyunmd.md C:\Users\natha\OneDrive\Escritorio\DEV007-md-links\pruebas\maria\md.md
  const contenido = fs.readFileSync(ruta, "utf8");
  //console.log(contenido) // -----------me trae los links
  const linksEncontrados = [];
  const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;

  let match;

  while ((match = linkRegex.exec(contenido)) !== null) {
    const text = match[1].slice(0, 50);
    const href = match[2];
    //console.log('Enlace encontrado:', href, 'Texto:', text);
    linksEncontrados.push({ href, text, file: ruta }); // inclui atributo file
  }
  //console.log(linksEncontrados)
  return linksEncontrados;
}

// validar link y obtener el código de respuesta HTTP con axios
function validarLink(url) {
  return axios
    .get(url)
    .then((res) => {
      const status = res.status;
      const ok = res.statusText === "OK" ? "ok" : "fail";
      return { status, ok };
    })
    .catch(() => {
      return { status: 404, ok: "fail" };
    });
}

//estadisticas
function estadisticas(links) {
  const totalLinks = links.length;

  //obtener los links unicos
  const linksUnicos = {};
  links.forEach((link) => {
    linksUnicos[link.href] = true;
  });
  const totalLinksUnicos = Object.keys(linksUnicos).length;

  // filtrar los enlaces rotos
  const linksRotos = links.filter((link) => link.ok === "fail");
  const totalLinksRotos = linksRotos.length;

  return {
    total: totalLinks,
    unique: totalLinksUnicos,
    broken: totalLinksRotos,
  };
}

// -------------------------------------------------

export {
  validarRuta,
  rutaAbsolute,
  esArchivoMD,
  directorioOArchivo,
  obtenerLinks,
  estadisticas,
  validarLink,
};
