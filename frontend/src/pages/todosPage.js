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

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "overflow-y-scroll"
  );

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

  container.appendChild(btnHome);
  fetch("http://localhost:4000/todos", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
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

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-red-600",
          "mr-2"
        );

        deleteButton.addEventListener("click", async () => {
          try {
            await fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "DELETE",
              credentials: "include",
            });
            tr.remove();
          } catch (error) {
            console.error(error);
          }
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add(
          "bg-green-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-green-600"
        );

        editButton.addEventListener("click", async () => {
          const title = prompt("Ingrese el nuevo título de la tarea", todo.title);
          if (!title) {
            alert("El título de la tarea es requerido");
            return;
          }

          const completedOption = prompt(
            '¿La tarea está completada? (Ingrese "SI" o "NO")',
            todo.completed ? "SI" : "NO"
          );

          let completed;
          if (completedOption.toLowerCase() === "sí") {
            completed = true;
          } else if (completedOption.toLowerCase() === "no") {
            completed = false;
          } else {
            alert('Opción no válida. Ingrese "SI" o "NO".');
            return;
          }

          try {
            const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, completed }),
            });
            const data = await response.json();
            td2.textContent = data.title;
            td3.textContent = data.completed ? "SI" : "NO";
          } catch (error) {
            console.error(error);
          }
        });

        td5.appendChild(deleteButton);
        td5.appendChild(editButton);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  // Create button
  const createButton = document.createElement("button");
  createButton.textContent = "Create";
  createButton.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mt-4"
  );

  createButton.addEventListener("click", async () => {
    const title = prompt("Ingrese el título de la nueva tarea");
    if (!title) {
      alert("El título de la tarea es requerido");
      return;
    }

    const completedOption = prompt(
      '¿La tarea está completada? (Ingrese "sí" o "no")'
    );

    let completed;
    if (completedOption.toLowerCase() === "sí") {
      completed = true;
    } else if (completedOption.toLowerCase() === "no") {
      completed = false;
    } else {
      alert('Opción no válida. Ingrese "sí" o "no".');
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      });
      const data = await response.json();
      // Add the new todo to the table
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.classList.add("border", "px-4", "py-2");
      td1.textContent = data.id;

      const td2 = document.createElement("td");
      td2.classList.add("border", "px-4", "py-2");
      td2.textContent = data.title;

      const td3 = document.createElement("td");
      td3.classList.add("border", "px-4", "py-2");
      td3.textContent = data.completed ? "Sí" : "No";

      const td4 = document.createElement("td");
      td4.classList.add("border", "px-4", "py-2");
      td4.textContent = data.owner;

      const td5 = document.createElement("td");
      td5.classList.add("border", "px-4", "py-2");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add(
        "bg-red-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-red-600",
        "mr-2"
      );

      deleteButton.addEventListener("click", async () => {
        try {
          await fetch(`http://localhost:4000/todos/${data.id}`, {
            method: "DELETE",
            credentials: "include",
          });
          tr.remove();
        } catch (error) {
          console.error(error);
        }
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "rounded",
        "hover:bg-green-600"
      );

      editButton.addEventListener("click", async () => {
        const title = prompt("Ingrese el nuevo título de la tarea", data.title);
        if (!title) {
          alert("El título de la tarea es requerido");
          return;
        }

        const completedOption = prompt(
          '¿La tarea está completada? (Ingrese "sí" o "no")',
          data.completed ? "sí" : "no"
        );

        let completed;
        if (completedOption.toLowerCase() === "sí") {
          completed = true;
        } else if (completedOption.toLowerCase() === "no") {
          completed = false;
        } else {
          alert('Opción no válida. Ingrese "sí" o "no".');
          return;
        }

        try {
          const response = await fetch(`http://localhost:4000/todos/${data.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, completed }),
          });
          const updatedData = await response.json();
          td2.textContent = updatedData.title;
          td3.textContent = updatedData.completed ? "Sí" : "No";
        } catch (error) {
          console.error(error);
        }
      });

      td5.appendChild(deleteButton);
      td5.appendChild(editButton);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
    } catch (error) {
      console.error(error);
    }
  });

  container.appendChild(createButton);

  return container;
};