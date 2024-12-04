// script.js

document.addEventListener("DOMContentLoaded", function() {
    fetch("menu.json")
      .then(response => response.json())
      .then(data => {
        const menuContainer = document.getElementById("menu");
        data.menu.forEach(item => {
          const menuItem = document.createElement("li");
          menuItem.classList.add("menu-item");
          menuItem.innerHTML = `
            <a href="${item.link}">
              <i class="fas fa-${item.icon}"></i>
              ${item.name}
            </a>
          `;
          menuContainer.appendChild(menuItem);
        });
      })
      .catch(error => console.error("Error cargando el menú:", error));
  });
  