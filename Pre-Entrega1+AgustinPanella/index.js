const cicloRevalidacion = () =>{
    
    let ciclo
    do{ 
        alert("Su usuario o contraseña es incorrecta")
        let usernameN = prompt("Ingrese nuevamente el nombre se usuario: ");
        let passworeN = prompt("Ingrese nuevamente la contraseña: ");

        ciclo = condicionalChequeo(usernameN, passworeN);
        
    }while(!ciclo)

    alert("A ingresado correctamente a la página")

}
const condicionalChequeo = (username, passwore) =>{
    const usernameAdmin = "Agustin"
    const passworeAdmin = "1234"

    if (username == usernameAdmin && passwore == passworeAdmin){
        return true;
    }else return false;
}
const calculadora = (num1,num2,operador) =>{
    switch (operador){
        case "+":
            return alert(num1 + num2) ;




        case "-":
            return alert(num1 - num2);
        case "*":
            return alert(num1 * num2);
        case "/":
            if (num2 == 0){
                return alert("La operacion no es valida, no es posible dividir por 0");
            }
            return alert(num1 / num2);
        default:
            return alert( 0);

    }alert()
}

let username = prompt("Ingrese su nombre de usuario:");
let passwore = prompt("Ingrese su contraseña:");

if (condicionalChequeo(username, passwore)){
    alert("A ingresado correctamente a la página");
}else cicloRevalidacion();

alert('Ahora podras usar la calculadora');
let valido = true
do{
    let num1 = parseInt(prompt('Ingrese el primer numero'));
    let operador = prompt('Ingrese el tipo de operación');
    let num2 = parseInt(prompt('Ingrese el segundo numero'));
     
    if (!isNaN(num1) && !isNaN(num1)){
        if (operador=='+'|| operador =='*' || operador=='-' || operador=='/'){
            calculadora(num1,num2,operador);
            
        }else{
            alert('No fue una operacion valida');
        }
        
    }else{
        alert('Los digitos ingresados no son correctos');
    }
    let volveAIntentar = parseInt(prompt('Desea volver a intentar: \n Presiona 1 para volver a intentar\n Presiona 2 para no volver a intentar'))
    
    switch(volveAIntentar){
        case 1: 
            valido = true
            break;
        case 2: 
            valido = false
            break;
        default : 
            valido = false;
    }
}while(valido);

alert('La calculadora a finalizado');