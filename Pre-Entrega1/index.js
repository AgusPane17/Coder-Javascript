const cicloRevalidacion = () =>{
    
    let ciclo
    do{ 
        let usarnameN = prompt("Ingrese nuevamente el nombre se usuario: ");
        let passworeN = prompt("Ingrese nuevamente la contraseña: ");

        ciclo = condicionalChequeo(usarnameN, passworeN);
        
    }while(!ciclo)

    alert("A ingresado correctamente a la página")

}
const condicionalChequeo = (usarname, passwore) =>{
    const usarnameAdmin = "Agustin"
    const passworeAdmin = "1234"

    if (usarname == usarnameAdmin && passwore == passworeAdmin){
        return true;
    }else return false;
}

let usarname = prompt("Ingrese su nombre se usuario:");
let passwore = prompt("Ingrese su contraseña:");

if (condicionalChequeo(usarname, passwore)){
    alert("A ingresado correctamente a la página")
}else cicloRevalidacion()


