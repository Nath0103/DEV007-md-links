import { validarRuta, rutaAbsolute,directorio} from "../funcions";
import fs from "fs";

//:::::::::::::::::::::::::::::::VALIDAR SI LA RUTA EXISTE TEST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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
//:::::::::::::::::::::::::::::::RUTA ABSOLUTA TEST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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
//:::::::::::::::::::::::::::::::COMPROBAR SI ES UNDIRECTORIO TEST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
describe("directorio", () => {
  test("debería reconocer que es un directorio", () => {
    // Crear un directorio temporal para la prueba
    const rutaDirectorio = './prueba1';
    fs.mkdirSync(rutaDirectorio);

    // Llamar a la función y verificar que retorne true (es un directorio)
    const resultado = directorio(rutaDirectorio);
    expect(resultado).toBe(true);

    // Eliminar el directorio temporal
    fs.rmdirSync(rutaDirectorio);
  });

  test("debería reconocer que NO es un directorio", () => {
    // Crear un archivo temporal para la prueba
    const rutaArchivo = './README.md';
    fs.writeFileSync(rutaArchivo, 'Contenido del archivo');

    // Llamar a la función y verificar que retorne false (no es un directorio)
    const resultado = directorio(rutaArchivo);
    expect(resultado).toBe(false);

    // Eliminar el archivo temporal
    fs.unlinkSync(rutaArchivo);
  });
});