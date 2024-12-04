document.addEventListener('DOMContentLoaded', function () {
    const menuList = document.getElementById('menu');
    const form = document.getElementById('menu-form');
    const nombreInput = document.getElementById('nombre');
    const enlaceInput = document.getElementById('enlace');

    function cargarMenu() {
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                renderizarMenu(data.menu);
            })
            .catch(error => console.error('Error al cargar el menú:', error));
    }

    function renderizarMenu(menu) {
        menuList.innerHTML = '';
        menu.forEach(opcion => {
            const li = document.createElement('li');
            li.classList.add('nav-item');
            li.innerHTML = `<a class="nav-link" href="${opcion.enlace}">${opcion.nombre}</a>`;
            menuList.appendChild(li);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nuevoOpcion = {
            id: Date.now(),
            nombre: nombreInput.value,
            enlace: enlaceInput.value
        };

        if (!isValidURL(nuevoOpcion.enlace)) {
            alert("Enlace inválido. Por favor, ingresa un enlace válido.");
            return;
        }

        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                data.menu.push(nuevoOpcion);
                renderizarMenu(data.menu);

                form.reset();
            })
            .catch(error => console.error('Error al agregar la opción al menú:', error));
    });

    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    cargarMenu();
});
