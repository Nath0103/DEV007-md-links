import {
  rutaAbsolute,
  validarRuta,
  directorioOArchivo,
  obtenerLinks,
  validarLink,
  estadisticas,
} from "./funcions.js";

// promesa
const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    if (validarRuta(ruta)) {
      const rutaAbsoluta = rutaAbsolute(ruta);
      console.log(rutaAbsoluta)
      const archivosMd = directorioOArchivo(rutaAbsoluta);
      const links = [];
      archivosMd.forEach((link) => {
        const linksExtraidos = obtenerLinks(link);
        links.push(...linksExtraidos);
      });
      const linksConValidacion = links.map((link) => {
        const validacion = validarLink(link.href);
        return { ...link };
      });
      //-------------------VALIDATE Y STATS--------------------------------
      Promise.all(linksConValidacion)
        .then((linksValidados) => {

          if (options.validate && options.stats) {
            const linksConValidacion = linksValidados.map((link) => {
              return validarLink(link.href).then((result) => {
                return {
                  href: link.href,
                  text: link.text,
                  file: link.file,
                  status: result.status,
                  ok: result.ok,
                };
              });
            });

            Promise.all(linksConValidacion)
              .then((linksConValidacion) => {
                const stats = estadisticas(linksConValidacion);
                resolve({
                  links: linksConValidacion,
                  stats: stats,
                });
              })
              .catch((error) => {
                console.error(error);
                reject(error);
              });
          } else if (options.validate) {
            const linksConValidacion = linksValidados.map((link) => {
              return validarLink(link.href).then((result) => {
                return {
                  href: link.href,
                  text: link.text,
                  file: link.file,
                  status: result.status,
                  ok: result.ok,
                };
              });
            });
            Promise.all(linksConValidacion)
              .then((linksConValidacion) => {
                const stats = estadisticas(linksConValidacion);
                resolve({
                  links: linksConValidacion,
                  stats: stats,
                });
              })
              .catch((error) => {
                console.error(error);
                reject(error);
              });
          }else if (options.stats) {
            Promise.all(links)
              .then((links) => {
                const stats = estadisticas(links);
                resolve({
                  links: links,
                  stats: stats,
                });
              })
              .catch((error) => {
                console.error(error);
                reject(error);
              });
          }
          
          else {
            resolve({ links: linksValidados });
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else {
      reject(new Error("Ruta no válida"));
    }
  });
};

export { mdLinks };
