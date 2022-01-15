"use strict";
const path = require("path");

async function Optimize(req, res) {
  try {
    let file = req.files.file;
    let data = file.data.toString().split("\n");
    let size = undefined;
    let matriz = [];
    for (let index = 0; index < data.length; index++) {
      let item = data[index];
      item = item.replace("\r", "");
      if (size === undefined) {
        for (let n = 0; n < item.split("").length; n++) {
          let it = item.split("")[n];
          if (parseInt(it) != 0 && parseInt(it) != 1)
            return res
              .status(500)
              .json({
                error: `Matriz Corrupta, Fila: ${index + 1}, Item: ${
                  n + 1
                }, valor corrupto: ${String(it).trim() || "item vacio"}`,
              })
              .end();
        }
        matriz.push(item.split(""));
        size = item.split("").length;
      } else {
        if (item.split("").length < size) {
          return res
            .status(500)
            .json({ error: "Matriz incompleta, fila: " + (index + 1) })
            .end();
        } else if (item.split("").length > size) {
          return res
            .status(500)
            .json({
              error: "Límite de matriz inicial superado, fila: " + (index + 1),
            })
            .end();
        } else {
          for (let n = 0; n < item.split("").length; n++) {
            let it = item.split("")[n];
            if (parseInt(it) != 0 && parseInt(it) != 1)
              return res
                .status(500)
                .json({
                  error: `Matriz Corrupta, Fila: ${index + 1}, Item: ${
                    n + 1
                  }, valor corrupto: ${String(it).trim() || "item vacio"}`,
                })
                .end();
          }
          matriz.push(item.split(""));
        }
      }
    }
    res.json({
      message: "Optimización exitosa.",
      link: `http://localhost:${global.port}/api/matriz/resultado`,
    });
    optimizarArreglo(matriz);
    return;
  } catch (error) {
    res.status(500).json(error).end();
  }
}
function optimizarArreglo(array) {
  let matriz = JSON.parse(JSON.stringify(array));
  for (let index = 0; index < matriz.length; index++) {
    const padre = matriz[index];
    let bombillo = false;
    for (let jindex = 0; jindex < padre.length; jindex++) {
      const hijo = parseInt(padre[jindex]);
      padre[jindex] = hijo;
      if (hijo === 0 && !bombillo) {
        if (index == 0) {
          matriz[index][jindex] = 2;
          bombillo = true;
        } else if (index > 0) {
          let optimizar_bombillo = true;
          for (let i = 0; i < index; i++) {
            if (parseInt(matriz[i][jindex]) === 2) {
              optimizar_bombillo = false;
            }
            if (parseInt(matriz[i][jindex]) === 1) {
              optimizar_bombillo = true;
            }
          }
          if (optimizar_bombillo) {
            matriz[index][jindex] = 2;
            bombillo = true;
          }
        }
      }
      if (hijo === 1) {
        bombillo = false;
      }
    }
  }
  global.matriz = matriz;
  global.last_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
}
async function GetLastmatriz(req, res) {
  res.render(
    path.join(__dirname.replace("controller", "template") + "/index.html"),
    { matriz: global.matriz || [], last_date: global.last_date }
  );
}
module.exports = {
  Optimize,
  GetLastmatriz,
};
