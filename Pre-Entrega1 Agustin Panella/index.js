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

let username = prompt("Ingrese su nombre de usuario:");
let passwore = prompt("Ingrese su contraseña:");

if (condicionalChequeo(username, passwore)){
    alert("A ingresado correctamente a la página")
}else cicloRevalidacion()


