let tareas = [];

    const formulario = document.getElementById('formulario-tarea');
    const descripcionInput = document.getElementById('descripcion');
    const listaTareas = document.getElementById('lista-tareas');

    formulario.addEventListener('submit', function(evento) {
      evento.preventDefault();

      const descripcion = descripcionInput.value.trim();

      if (descripcion !== '') {
        const yaExiste = tareas.some(tarea => tarea.descripcion.toLowerCase() === descripcion.toLowerCase());

        if (yaExiste) {
          alert("La tarea ya existe.");
          return;
        }

        const nuevaTarea = {
          descripcion: descripcion,
          completada: false
        };

        tareas.push(nuevaTarea);
        descripcionInput.value = '';
        renderizarTareas();
      }
    });

    function toggleTarea(index) {
      tareas[index].completada = !tareas[index].completada;
      renderizarTareas();
    }

    function eliminarTarea(index) {
      tareas.splice(index, 1);
      renderizarTareas();
    }

    function renderizarTareas() {
      listaTareas.innerHTML = '';

      tareas.forEach((tarea, index) => {
        const divTarea = document.createElement('div');
        divTarea.className = 'tarea';
        if (tarea.completada) {
          divTarea.classList.add('completada');
        }

        const spanDescripcion = document.createElement('span');
        spanDescripcion.textContent = tarea.descripcion;
        spanDescripcion.addEventListener('click', () => toggleTarea(index));

        const btnEliminar = document.createElement('span');
        btnEliminar.textContent = '✖';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.addEventListener('click', (e) => {
          e.stopPropagation(); 
          eliminarTarea(index);
        });

        divTarea.appendChild(spanDescripcion);
        divTarea.appendChild(btnEliminar);
        listaTareas.appendChild(divTarea);
      });
    }