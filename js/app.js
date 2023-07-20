import { valida } from "./validaciones.js";

//cada vez que el usuario salga de un input blur se ejeute la función valida

const inputs = document.querySelectorAll("input");//se crea el arreglo
inputs.forEach(input =>{
    input.addEventListener('blur', (input)=>{
        valida(input.target);
    });
});