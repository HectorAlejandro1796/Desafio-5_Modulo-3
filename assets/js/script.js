const nuevaTareaInput = document.querySelector("#nuevaTareaInput");
const btn_agregar = document.querySelector("#btn_agregar");
const tablaDeTareas = document.querySelector("#lista");
const listaDeTareas = [
  { id: 1, nuevaTarea: "Hacer mercado" },
  { id: 2, nuevaTarea: "Estudiar para la prueba" },
  { id: 3, nuevaTarea: "Sacar a pasear a Tobby" },
];
let id = 4;

btn_agregar.addEventListener("click", () => {
  const nuevaTarea = nuevaTareaInput.value.trim();
  if (nuevaTarea === "") {
    alert("Por favor, escribe una tarea.");
  } else {
    listaDeTareas.push({ id: id++, nuevaTarea });
    nuevaTareaInput.value = "";
    actualizarTabla();
  }
});

const eliminar = (id) => {
  const index = listaDeTareas.findIndex((e) => e.id === id);
  listaDeTareas.splice(index, 1);
  actualizarTabla();
};

const actualizarTabla = () => {
  let html = `
          <tr>
            <th>ID</th>
            <th>Tarea</th>
            <th></th>
            <th></th>
          </tr>`;
  for (const tarea of listaDeTareas) {
    html += `
            <tr>
              <td>${tarea.id}</td>
              <td>${tarea.nuevaTarea}</td>
              <td><input type="checkbox" /></td>
              <td><button onclick="eliminar(${tarea.id})">❌</button></td>
            </tr>`;
  }
  tablaDeTareas.innerHTML = html;
  actualizarContadores();
};

const actualizarContadores = () => {
  const total = document.querySelector("#total");
  const totalTareas = listaDeTareas.length;
  total.innerHTML = `${totalTareas}`;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let realizadas = 0;
  checkboxes.forEach((elemento) => {
    if (elemento.checked) realizadas++;
  });

  const totalRealizadas = document.querySelector("#realizadas");
  totalRealizadas.innerHTML = realizadas;
};

tablaDeTareas.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    actualizarContadores();
  }
});

actualizarTabla();
