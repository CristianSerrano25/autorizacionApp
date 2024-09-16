export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add("w-1/2", "bg-white", "shadow-md", "overflow-y-scroll");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  // Función para cargar las tareas
  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error en la solicitud GET");
      const data = await response.json();
      tbody.innerHTML = ""; // Limpiar la tabla antes de recargar los datos

      data.todos.forEach((todo) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        // Botones de acción (Editar y Eliminar)
        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("bg-yellow-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
        btnEdit.textContent = "Editar";
        btnEdit.addEventListener("click", () => editTodo(todo.id));

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded");
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", () => deleteTodo(todo.id));

        td5.appendChild(btnEdit);
        td5.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al cargar los todos:", error);
    }
  };

  // Función para crear una tarea
  const createTodo = () => {
    const title = prompt("Ingrese el título de la tarea:");
    const completed = confirm("¿Está completada la tarea?");
    if (title) {
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => loadTodos());
    }
  };

  // Función para editar una tarea
  const editTodo = (id) => {
    const title = prompt("Ingrese el nuevo título de la tarea:");
    const completed = confirm("¿Está completada la tarea?");
    if (title) {
      fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => loadTodos());
    }
  };

  // Función para eliminar una tarea
  const deleteTodo = (id) => {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => loadTodos());
  };

  // Botón de "Crear Tarea"
  const btnCreate = document.createElement("button");
  btnCreate.textContent = "Crear Tarea";
  btnCreate.classList.add(
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-600",
    "mt-4"
  );
  btnCreate.addEventListener("click", createTodo);

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(table);
  container.appendChild(btnCreate);

  // Cargar las tareas al iniciar
  loadTodos();

  return container;
};