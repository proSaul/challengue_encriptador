
document.getElementById("id_salida").style.display = "none";
document.getElementById("notFound").style.display = "inline";
document.getElementById("id-btn-ConvetirTexto").style.display = "none";


var entrada = document.querySelector('#id_entrada');
var salida = document.querySelector("#id_salida");


function encriptar(){
    let cadenaFinal = "";
    let = cadenaEncriptada = "";
    for (let i = 0; i < entrada.value.length; i++) {//revisa coincidencias de cada vocal y la sustituye por su clave.
        cadenaFinal="";
        let extraida = entrada.value.substring(i, i+1);        
        cadenaFinal = llaves(extraida, cadenaFinal, 'e', 'enter');
        cadenaFinal = llaves(extraida, cadenaFinal, 'i', 'imes');  
        cadenaFinal = llaves(extraida, cadenaFinal, 'a', 'ai');  
        cadenaFinal = llaves(extraida, cadenaFinal, 'o', 'ober');  
        cadenaFinal = llaves(extraida, cadenaFinal, 'u', 'ufat');  
        if(cadenaFinal=="")
            cadenaEncriptada = cadenaEncriptada + extraida;
        else
            cadenaEncriptada = cadenaEncriptada + cadenaFinal;
    }
     salida.value = cadenaEncriptada;
}

function alertando(){
    //entrada = document.querySelector('#id_entrada').value;
    //sweetAlert("Oops...", "Something went wrong!", "error");
    cadenaEntrada = entrada.value;

    if (!/[^a-z\s]/.test(cadenaEntrada) && cadenaEntrada !=="" ){
        document.getElementById("advertencia").style.display = "none";
        document.querySelector('#id-btn-encriptar').disabled = false;
        document.querySelector('#id-btn-desencriptar').disabled = false;
        document.getElementById("notFound").style.display = "none";
        document.getElementById("id_salida").style.display = "inline";
        document.getElementById("id-btn-ConvetirTexto").style.display = "none";

    }
    else
    {
        document.getElementById("advertencia").style.display = "inline";
        document.querySelector('#id-btn-encriptar').disabled = true;
        document.querySelector('#id-btn-desencriptar').disabled = true;
        document.getElementById("notFound").style.display = "inline";
        document.getElementById("id_salida").style.display = "none";
        if(cadenaEntrada !=="" )
        document.getElementById("id-btn-ConvetirTexto").style.display = "inline";
    }
}

function llaves(extraida, cadenaFinal, letra, clave){ //hace el cambio de la vocal por su clave
    if(extraida==letra){
        extraida = extraida.replaceAll(letra,clave);
        cadenaFinal =  cadenaFinal + extraida;  
    }
    return cadenaFinal;
}


function desencriptar(){//desencripta todas las coincidencias de una palabra por una letra
    cadenaEntrada = entrada.value;
    cadenaEntrada =  cadenaEntrada.replaceAll('enter','e');
    cadenaEntrada =  cadenaEntrada.replaceAll('imes','i');
    cadenaEntrada =  cadenaEntrada.replaceAll('ai','a');
    cadenaEntrada =  cadenaEntrada.replaceAll('ober','o');
    cadenaEntrada =  cadenaEntrada.replaceAll('ufat','u');
    salida.value=cadenaEntrada;
}

function eliminarDiacriticos(texto) {//elimina todas las posibles combinaciones de vocales con acentos diacrítio y los cambia solo por la vocal
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

function ajustar(){ //Eliminar letras mayusculas, acentos y signos de puntuación 
    cadenaEntrada = entrada.value;
    cadenaEntrada = eliminarDiacriticos(cadenaEntrada);
    cadenaEntrada = cadenaEntrada.toLowerCase(cadenaEntrada);
    cadenaFinal = "";
    for (let i = 0; i < cadenaEntrada.length; i++) {//eliminar signos de puntuación menos espacio
        let extraida = cadenaEntrada.substring(i, i+1);  
        if (!/[^a-z\s]/.test(extraida)){
            cadenaFinal = cadenaFinal + extraida;
        }
    }
    entrada.value = cadenaFinal;    
}


function ConvetirTexto(){

    swal.fire({
        title: 'Estás seguro de querer formatear el texto acorde a las reglas del encriptador?',
        text: "No se podrá revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, formatear',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

            ajustar();
            alertando();
            Swal.fire(
                'Texto formateado correctamente',
                'Se han eliminado todos los caracteres especiales y letras en mayúsculas',
                'success'
            )
        }
      })
}

//sweetAlert("Oops...", "Something went wrong!", "error");

function copyToClipboard() {
    var copyText = document.getElementById("id_salida").value;
    if (copyText.length !== 0){
        navigator.clipboard.writeText(copyText).then(() => {
            Swal.fire({
            icon: 'success',
            title: 'Texto copiado al portapapeles',
            showConfirmButton: false,
            timer: 1500
            })        
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay texto por clonar en portapapeles'
          })
    }
  }


  function copyToClipboard2() {
    var copyText = document.getElementById("id_entrada").value;
    if (copyText.length !== 0){
        navigator.clipboard.writeText(copyText).then(() => {
            Swal.fire({
            icon: 'success',
            title: 'Texto copiado al portapapeles',
            showConfirmButton: false,
            timer: 1500
            })        
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay texto por clonar en portapapeles'
          })
    }
  }