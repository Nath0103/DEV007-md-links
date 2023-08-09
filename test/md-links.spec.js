import { validarRuta, rutaAbsolute,esArchivoMD} from "../funcions";
import fs from "fs";
//:::::::::::::::::::::::::::::::VALIDAR SI LA RUTA EXISTE TEST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
describe("validarRuta", () => {
  test("debería retornar true si la ruta existe (archivo)", () => {
    // __filename
    const resultado = validarRuta(__filename); // Pasar la ruta del archivo actual
    expect(resultado).toBe(true);
  });

  test("debería retornar true si la ruta existe (directorio)", () => {
    const resultado = validarRuta(__dirname); // Pasar la ruta del directorio actual
    expect(resultado).toBe(true);
  });

  test("debería retornar false si la ruta no existe", () => {
    const resultado = validarRuta("ruta.txt"); // pasar una ruta que no existe para que me de false
    expect(resultado).toBe(false);
  });

});
//:::::::::::::::::::::::::::::::RUTA ABSOLUTA TEST:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
describe("rutaAbsolute", () => {
  test("debería convertir una ruta relativa a una ruta absoluta", () => {
    const rutaRelativa = "README.md";
    const resultado = rutaAbsolute(rutaRelativa);
    expect(fs.existsSync(resultado)).toBe(true);
  });

  test("debería mantener la ruta absoluta si se pasa una ruta absoluta", () => {
    const rutaAbsoluta = "C:\\Users\\natha\\OneDrive\\Escritorio\\DEV007-md-links\\README.md"; // se colocan 2 porque el js indica como una sali con una por eso son dos\\
    const resultado = rutaAbsolute(rutaAbsoluta);
    expect(resultado).toBe(rutaAbsoluta);
  });
});
//:::::::::::::::::::::::::::::::COMPROBAR SI ES UN MD:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

describe("esArchivoMD", () => {
  test("debería retornar true para un archivo con extensión .md", () => {
    const ruta = 'README.md';
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(true);
  });

  test("debería retornar false para un archivo sin extensión .md", () => {
    const ruta = './puebas/hola.txt';
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });

  test("debería retornar false para una carpeta", () => {
    const ruta = './prueba1';
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });

  test("debería retornar false para una ruta inválida", () => {
    const ruta = './ruta_que_no_existe';
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });
});
