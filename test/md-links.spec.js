import {
  validarRuta,
  rutaAbsolute,
  esArchivoMD,
  directorioOArchivo,
  obtenerLinks,
  validarLink,
  estadisticas,
} from "../funcions";
import axios from "axios";
import fs from "fs";
import path from "path";
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
    const rutaAbsoluta =
      "C:\\Users\\natha\\OneDrive\\Escritorio\\DEV007-md-links\\README.md"; // se colocan 2 porque el js indica como una sali con una por eso son dos\\
    const resultado = rutaAbsolute(rutaAbsoluta);
    expect(resultado).toBe(rutaAbsoluta);
  });
});
//:::::::::::::::::::::::::::::::COMPROBAR SI ES UN MD:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

describe("esArchivoMD", () => {
  test("debería retornar true para un archivo con extensión .md", () => {
    const ruta = "README.md";
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(true);
  });

  test("debería retornar false para un archivo sin extensión .md", () => {
    const ruta = "./puebas/hola.txt";
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });

  test("debería retornar false para una carpeta", () => {
    const ruta = "./prueba1";
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });

  test("debería retornar false para una ruta inválida", () => {
    const ruta = "./ruta_que_no_existe";
    const resultado = esArchivoMD(ruta);
    expect(resultado).toBe(false);
  });
});
//::::::::::::::::::::::::OBTENERLINKS:::::::::::::::::::::::::::::::::::::

describe("obtenerLinks", () => {
  test("debería retornar un array de enlaces encontrados", () => {
    const rutaArchivo = "pruebas/maria/md.md";
    const resultado = obtenerLinks(rutaArchivo);

    const resultadoEsperado = [
      {
        href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s",
        text: "Youtube",
        file: rutaArchivo,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
});
//::::::::::::::::::::::::VALIDARLINKS:::::::::::::::::::::::::::::::::::::

// Mock para Axios
jest.mock("axios");

describe("validarLink", () => {
  test('debería retornar el estado y la respuesta "ok" para un enlace válido', async () => {
    const url = "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s";
    const mockResponse = {
      status: 200,
      statusText: "OK",
    };
    axios.get.mockResolvedValue(mockResponse);

    const resultado = await validarLink(url);

    expect(resultado).toEqual({ status: 200, ok: "ok" });
  });

  test('debería retornar el estado 404 y la respuesta "fail" para un enlace inválido', async () => {
    const url = "https://enlace-inexistente.com";
    const mockError = new Error("Not Found");
    axios.get.mockRejectedValue(mockError);

    const resultado = await validarLink(url);

    expect(resultado).toEqual({ status: 404, ok: "fail" });
  });
});
//::::::::::::::::::::::::ESTADISTICAS:::::::::::::::::::::::::::::::::::::

describe("estadisticas", () => {
  test("debería calcular el total de enlaces correctamente", () => {
    const links = [
      { href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s", ok: "ok" },
      { href: "https://enlace-inexistente.com", ok: "fail" },
      {
        href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s",
        ok: "ok",
      },
    ];
    const resultado = estadisticas(links);
    expect(resultado.total).toBe(3);
  });
  test("debería calcular el total de enlaces únicos correctamente", () => {
    const links = [
      { href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s", ok: "ok" },
      { href: "https://enlace-inexistente.com", ok: "fail" },
      {
        href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s",
        ok: "ok",
      },
    ];
    const resultado = estadisticas(links);
    expect(resultado.unique).toBe(2);
  });
  test("debería calcular el total de enlaces rotos correctamente", () => {
    const links = [
      { href: "https://www.youtube.com/watch?v=FxdE_ip-SRc&t=1s", ok: "ok" },
      { href: "https://enlace-inexistente.com", ok: "fail" },
      { href: "https://enlace-inexistente2.com", ok: "fail" },
    ];
    const resultado = estadisticas(links);
    expect(resultado.broken).toBe(2);
  });
});
//::::::::::::::::::::::::directorioOArchivo:::::::::::::::::::::::::::::::::::::
