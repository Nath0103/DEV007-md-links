import { mdLinks } from "./index.js";
import chalk from "chalk";

const ruta = process.argv[2]; // Obtenemos la ruta desde línea de comandos

//opciones para validar
const options = {
  validate: process.argv.includes("--validate") || process.argv.includes("--v"),
  stats: process.argv.includes("--stats") || process.argv.includes("--s"),
};
//--------------------------------
// estadisticas stats
function mostrarEstadisticas(stats) {
  console.log(chalk.cyanBright.italic("Estadísticas"));
  console.log(chalk.greenBright("Total de Links"), stats.total);
  console.log(chalk.greenBright("Links únicos"), stats.unique);
  console.log(chalk.redBright("Links rotos"), stats.broken);
}
// fn para ver los resultados de los links
function resultados(resultado, options) {
  // if (options.stats) {
  if (options.stats) {
    // muestra las estadisticas de stats
    mostrarEstadisticas(resultado.stats);
  } else {
      resultado.links.forEach((link) => {
        console.log(chalk.cyanBright.italic("href:"), link.href);
        console.log(chalk.greenBright.italic("text:"), link.text);
        console.log(chalk.blueBright.italic("file:"), link.file);
        if (options.validate) {
          const mensaje =
            link.ok === "ok" ? chalk.green.italic("✔") : chalk.red.italic("✖");
          console.log(chalk.magenta("Status:"), link.status, mensaje);
        }
        console.log("----------------------");
      });
      if (options.stats && options.validate) {
        mostrarEstadisticas(resultado.stats);
      }
    }
  }

mdLinks(ruta, options)
  .then((resultado) => {
    resultados(resultado, options);
  })
  .catch((error) => {
    console.error(chalk.red.italic("Error:", error));
  });
