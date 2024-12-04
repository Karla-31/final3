document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cedulaForm");
    const input = document.getElementById("cedula");
    const resultado = document.getElementById("resultado");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const cedula = input.value.trim();

        if (validarCedula(cedula)) {
            resultado.textContent = "La cédula es válida.";
            resultado.style.color = "green";
        } else {
            resultado.textContent = "La cédula no es válida.";
            resultado.style.color = "red";
        }
    });

    function validarCedula(cedula) {
        if (cedula.length !== 11 || isNaN(cedula)) {
            return false;
        }

        const coeficientes = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;

        for (let i = 0; i < 10; i++) {
            let multiplicacion = parseInt(cedula.charAt(i)) * coeficientes[i];
            suma += multiplicacion >= 10 ? multiplicacion - 9 : multiplicacion;
        }

        const verificador = 10 - (suma % 10);
        const digitoVerificador = parseInt(cedula.charAt(10));

        if ((verificador === 10 && digitoVerificador === 0) || verificador === digitoVerificador) {
            return true;
        } else {
            return false;
        }
    }
});
