<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $cedula = $_POST["cedula"];

    if (validarCedula($cedula)) {
        echo "La cédula es válida.";
    } else {
        echo "La cédula no es válida.";
    }
}

function validarCedula($cedula) {
    if (strlen($cedula) !== 11 || !is_numeric($cedula)) {
        return false;
    }

    $coeficientes = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    $suma = 0;

    for ($i = 0; $i < 10; $i++) {
        $multiplicacion = (int)$cedula[$i] * $coeficientes[$i];
        $suma += $multiplicacion >= 10 ? $multiplicacion - 9 : $multiplicacion;
    }

    $verificador = 10 - ($suma % 10);
    $digitoVerificador = (int)$cedula[10];

    if (($verificador === 10 && $digitoVerificador === 0) || $verificador === $digitoVerificador) {
        return true;
    } else {
        return false;
    }
}
?>
