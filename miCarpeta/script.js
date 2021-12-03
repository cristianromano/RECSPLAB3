var personas = [];

window.addEventListener("load", function () {
  getClientes();
});

function llenarFila(personas) {
  let id = personas.id;
  let marca = personas.make;
  let serie = personas.model;
  let precio = personas.price;

  let tabla = document.getElementById("cuerpo");
  let fila = document.createElement("tr");
  fila.setAttribute("id", personas.id);
  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  fila.appendChild(data1);
  let data2 = document.createElement("td");
  data2.appendChild(document.createTextNode(marca));
  fila.appendChild(data2);
  let data3 = document.createElement("td");
  data3.appendChild(document.createTextNode(serie));
  fila.appendChild(data3);
  let data4 = document.createElement("td");
  data4.appendChild(document.createTextNode(precio));
  fila.appendChild(data4);

  fila.onclick = function (persona) {
    traerPersona(persona);
  };

  tabla.appendChild(fila);
}

function llenarTabla(elementos) {
  vaciarTabla();
  elementos.forEach((element) => {
    llenarFila(element);
  });
}

function getClientes() {
  promesa = new Promise(getDatos);
  promesa.then(getDatosExitoso).catch(errorGetDatos);
}

async function getDatos(exito, error) {
  try {
    let respuesta = await fetch("http://localhost:3001/vehiculos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status:" + respuesta.status.toString());
    respuesta.json().then((elementos) => {
      exito(elementos);
    });
  } catch (error) {
    console.log("Con Error:" + error);
  }
}

function getDatosExitoso(exito) {
  exito.forEach((element) => {
    if (element.cuatroXcuatro != undefined) {
      let camioneta = new Camioneta(
        element.id,
        element.make,
        element.model,
        element.price,
        element.cuatroXcuatro
      );
      personas.push(camioneta);
    }
    if (element.cantidadPuertas != undefined) {
      let auto = new Auto(
        element.id,
        element.make,
        element.model,
        element.price,
        element.cantidadPuertas
      );
      personas.push(auto);
    }
    // personas.push(cliente);
  });
  llenarTabla(personas);
}

function errorGetDatos() {
  alert("Error al cargar la tabla - Chequear API");
}

function vaciarTabla() {
  let node = document.getElementById("cuerpo");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function agregarCliente() {
  var nombre = document.getElementById("marca").value;
  var apellido = document.getElementById("serie").value;
  var edad = document.getElementById("precio").value;

  let id = 0;
  personas.forEach((persona) => {
    if (persona.id > id) {
      id = persona.id;
    }
  });
  if (nombre != "" && apellido != "" && edad != "") {
    // var newCliente = new Vehiculo(id + 1, nombre, apellido, edad);
    // personas.push(newCliente);
    // llenarTabla(personas);
    // cleanData();

    $clase = document.getElementById("parrafoOculto").innerHTML;

    if ($clase == "Auto") {
      var newCliente = new Auto(
        id + 1,
        nombre,
        apellido,
        edad,
        document.getElementById("claseOculta").value
      );
      personas.push(newCliente);
      llenarTabla(personas);
      cleanData();
    } else {
      var newCliente = new Camioneta(
        id + 1,
        nombre,
        apellido,
        edad,
        document.getElementById("claseOculta").value
      );
      personas.push(newCliente);
      llenarTabla(personas);
      cleanData();
    }
  } else {
    alert("Debe completar todos los campos");
  }
}

function eliminarPersona() {
  var id = document.getElementById("id").value;
  var flag = false;

  personas.forEach((element, index) => {
    if (element.id == id) {
      flag = true;
      personas.splice(index, 1);
    }
  });
  if (!flag) {
    alert("No se encontró el id");
  }
  llenarTabla(personas);
  document.getElementById("botonAgregar").style.display = "block";
  cleanData();
}

function traerPersona(e) {
  document.getElementById("id").value =
    e.target.parentNode.firstChild.innerHTML;
  document.getElementById("marca").value =
    e.target.parentNode.firstChild.nextSibling.innerHTML;
  document.getElementById("serie").value =
    e.target.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
  document.getElementById("precio").value =
    e.target.parentNode.lastChild.innerHTML;

  document.getElementById("marca").style.pointerEvents = "none";
  document.getElementById("serie").style.pointerEvents = "none";
  document.getElementById("precio").style.pointerEvents = "none";
  document.getElementById("claseOculta").style.pointerEvents = "none";
  document.getElementById("botonAgregar").style.display = "none";
}

window.addEventListener("load", () => {
  let btn = document.getElementById("botonBorrar");
  btn.addEventListener("click", () => {
    eliminarPersona();
    document.getElementById("marca").style.pointerEvents = "auto";
    document.getElementById("serie").style.pointerEvents = "auto";
    document.getElementById("precio").style.pointerEvents = "auto";
    document.getElementById("claseOculta").style.pointerEvents = "auto";
  });
});

function cleanData() {
  document.getElementById("id").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("serie").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("claseOculta").value = "";
}

function CambiarEstadoColumna(numero) {
  var columnaID;
  switch (numero) {
    case 0:
      columnaID = document.getElementById("cb_id");
      break;

    case 1:
      columnaID = document.getElementById("cb_nombre");
      break;

    case 2:
      columnaID = document.getElementById("cb_apellido");
      break;

    case 3:
      columnaID = document.getElementById("cb_edad");
      break;
  }
  if (columnaID.checked) {
    stl = "table-cell";
  } else {
    stl = "none";
  }
  var tbl = document.getElementById("tabla");
  var th = tbl.getElementsByTagName("th");
  var rows = tbl.getElementsByTagName("tr");
  th[numero].style.display = stl;
  for (var row = 1; row < rows.length; row++) {
    var cels = rows[row].getElementsByTagName("td");
    cels[numero].style.display = stl;
  }
}

function filtroSexo() {
  var sexo_selected = document.getElementById("sexo_filtro").value;

  if (sexo_selected == "Auto") {
    personas2 = personas.filter((persona) => persona instanceof Auto);
  } else {
    personas2 = personas.filter((persona) => persona instanceof Camioneta);
  }
  llenarTabla(personas2);
}

function LimpiarFiltro() {
  llenarTabla(personas);
}

function calcularPromedio() {
  var total = 0;
  total = personas.reduce((sum, per) => sum + parseInt(per.price), 0);
  total = total / personas.length;
  document.getElementById("prom").value = total;
}

function PorTipo() {
  let tipo = document.getElementById("tipo").value;
  let parrafo = document.getElementById("parrafoOculto");
  let clase = document.getElementById("claseOculta");

  if (tipo == "Auto") {
    parrafo.hidden = false;
    clase.hidden = false;
    parrafo = document.getElementById("parrafoOculto").innerHTML = "Auto";
  } else {
    parrafo = document.getElementById("parrafoOculto");
    parrafo.hidden = false;
    clase.hidden = false;
    parrafo = document.getElementById("parrafoOculto").innerHTML = "Camioneta";
  }
}
