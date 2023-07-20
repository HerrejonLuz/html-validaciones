/*Esta forma no es tan recomendable es mejor los Data-atributs
const inputNacimiento = document.querySelector("#birth");
//el evento blur es cuando sales del elemento
inputNacimiento.addEventListener("blur",(evento)=>{
    validarNacimiento(evento.target);
});*/

export function valida(input){
    const tipoDeInput = input.dataset.tipo; //data set conjutno de todos los datas
    if (validadores[tipoDeInput]){  //verifica que dentro del objeto validadores este ese tipo de input
        validadores[tipoDeInput](input);
    }
    //contenedor rojo cuando el valor no es valido
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeDeError(tipoDeInput,input);
    }
};

const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];
const mensajesDeError ={
    nombre:{
        valueMissing: "Este campo nombre no puede estar vacio"
    },
    email:{
        valueMissing: "Este campo e-mail no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing: "Este campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe tener un aletra minúscula, un mayúscula y un número"
    },
    nacimiento:{
        valueMissing: "Este campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing:"Este campo telefonico no puede estar vacio",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion:{
        valueMissing:"Este campo dirección no puede estar vacio",
        patternMismatch:"El formato requerido es 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing:"Este campo ciudad no puede estar vacio",
        patternMismatch:"El formato requerido es 3 a 40 caracteres"
    },
    estado:{
        valueMissing:"Este campo estado no puede estar vacio",
        patternMismatch:"El formato requerido es 3 a 40 caracteres"
    },
}

const validadores ={
    nacimiento:(input)=> validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
   let mensaje = "";
   tipoDeErrores.forEach((error) =>{
    if(input.validity[error]){
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];

    }

   }) ;
   return mensaje;
}

function validarNacimiento(input){
    const fechaCliente= new Date(input.value);
   let mensaje ="";
   if(!mayorDeEdad(fechaCliente)){
    mensaje= "Debes tener al menos 18 años de edad";
   }
   input.setCustomValidity(mensaje); //personaliza los mensajes

}

function mayorDeEdad(fecha){
    const   fechaActual = new Date();  
    console.log(fecha,"-------", fechaActual);
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return(diferenciaFechas<= fechaActual);

}