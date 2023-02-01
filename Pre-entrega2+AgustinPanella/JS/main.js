
//Objetos
class manga{
    
    constructor(nombre, descripcion, estado, cantCapitulosLeidos, genero, puntuacion){

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;//los estado son finalizado o en emision
        this.cantCapitulosLeidos = cantCapitulosLeidos;
        this.genero = genero;
        this.puntuacion = puntuacion;//medida del uno al 10
        if (estado == "finalizado"){
        this.cantCapManga = prompt("Ingrese la cantidad de capitulos del manga")
        }
    }
    //metodos
    agregarManga() {
    arrayMangas.push(this);
    }

    quitarManga(numIndice, num,arrayMangas){
        arrayMangas.splice(numIndice, num)
    }
    mostrarNombreManga(){
        return this.nombre;
    }
    
}


//funciones


const menuInicio = ()=>{
    let ingresarOpcion = parseInt(prompt(
    `Ingrese una opción:
    
        1 - Visualizar mangas
        2 - Agregar mangas
        3 - Eliminar  mangas
        4 - Buscar mangas
        5 - Salir del menu`))
    
    switch(ingresarOpcion){
        case 1: 
            visualizarMangas(arrayMangas)
        break
        case 2: 
            agregarMangasALista(arrayMangas)
        break
        case 3: 
            eliminarMangas(arrayMangas)
        break
        case 4: 
            buscarMangas(arrayMangas)
        break
        case 5: 
            salirDeMenu(arrayMangas)
        break
        default:
            alert("No es una opcion valida, porfavor vuelve a intentarlo")
            menuInicio()
        break
    }
}


const visualizarMangas = (arrayMangas)=>{
    let listaAMostrar = ""
    for (let i = 0; i < arrayMangas.length; i++) {
        listaAMostrar = 
        `${listaAMostrar}
        ${i}- ${arrayMangas[i].nombre}`
      }
    alert(`Los mangas que tienes en la lista son:
            ${listaAMostrar}`
    )
    menuInicio(arrayMangas)// en esta funcion se muestra todos los mangas cargados
}

const agregarMangasALista = (arrayMangas) =>{
    nombre = prompt("Ingresa un nombre")
    descripcion = prompt("Ingresa una descripcion")
    estado = prompt("Ingresa un estado. puede ser finalizado o en emision")
    estado = estado.toLowerCase()
    cantCapitulosLeidos = prompt("Ingresa la cantidad de capitulos que has leido")
    genero = prompt("Ingresa el genero")
    puntuacion = prompt("Ingresa una puntuacion del 1 al 10")
    let mangaNuevo = new manga(nombre,descripcion, estado,cantCapitulosLeidos,genero,puntuacion)//pido datos y creo el objeto
    
    mangaNuevo.agregarManga(arrayMangas)
    alert(`
         El manga ingresado es: ${nombre}
         Su descripcion es: ${descripcion} 
         Su estado es: ${estado} 
         La cantidad de capitulos leidos es: ${cantCapitulosLeidos} 
         Su genero es: ${genero} 
         Y tiene una puntuacion : ${puntuacion}`)
    visualizarMangas(arrayMangas)//agrega los mangas nuevos y los muestra en la lista
    menuInicio(arrayMangas)
}

const eliminarMangas = (arrayMangas) =>{
    let listaAMostrar = ""
    for (let i = 0; i < arrayMangas.length; i++) {
        listaAMostrar = 
        `${listaAMostrar}
        ${i}- ${arrayMangas[i].nombre}`
    }
    
    let eliminado = prompt(
        `Ingresa el numero del manga que quieres eliminar:
         ${listaAMostrar}`)// para mostrar la lista de los mangas que puede eliminar
    console.
    arrayMangas[eliminado].quitarManga(elimina, 1, arrayMangas)//elimina un objeto de la lista de los mangas y reordena la lista
    visualizarMangas(arrayMangas)    
    menuInicio(arrayMangas)
}

const buscarMangas = (arrayMangas) =>{
    
    let mangaBuscado = prompt("Ingrese el nombre del manga que desea buscar")
    let nombreEncontrado = arrayMangas.find(
        (manga) => manga.nombre.toLowerCase() == mangaBuscado.toLowerCase() 
    )
    if(nombreEncontrado == undefined){
        alert(`${nombreBuscado} No se ha encontrado el manga`)
    }else{
        alert(
            `Este fue el resultado: 
                ${nombreEncontrado.nombre}
                ${nombreEncontrado.descripcion}
                ${nombreEncontrado.estado}
                ${nombreEncontrado.genero}
                ${nombreEncontrado.cantCapitulosLeidos}
                ${nombreEncontrado.puntuacion}`)
    }
    visualizarMangas(arrayMangas) 
    menuInicio(arrayMangas)//Aca se realizo una funcion de busqueda de manga por nombre
}

    
const botonCrearMangaFuncion = ()=> {
    console.log(arrayMangas)
    let mangaPorBoton = new manga();
    mangaPorBoton.agregarManga();
    mostrarMangas(arrayMangas);

}

//funciones

const mostrarMangas = (arrayMangas) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
        for (let i = 0; i < arrayMangas.length; i++){
        // //en esta20 lineas se utilizan para mostrar los objetos manga
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="..." class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${arrayMangas[i].nombre}</h5>
                                                <p class="card-text">${arrayMangas[i].descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">${arrayMangas[i].estado}</li>
                                                <li class="list-group-item">${arrayMangas[i].genero}</li>
                                                <li class="list-group-item">${arrayMangas[i].cantCapManga}</li>
                                                <li class="list-group-item">${arrayMangas[i].puntuacion}</li>
                                            </ul>
                                        
                                        </div>`
        mangasdiv.appendChild(mangaContenido)
                                   
        }
    }

//botones

let botonCrearManga = document.getElementById("botonCrearManga")
 botonCrearManga.addEventListener("click", botonCrearMangaFuncion);


//aca dejo algunos mangas precargados para que puedan probar las funcionalidades

let arrayMangas = []
const manga1 = new manga("One piece","Es un anime que se centra en la gran era pirata, una historia llena de aventura y diversion.", "Emisión", 600, "Shonen - Aventura", "9");
arrayMangas.push(manga1)
const manga2 = new manga("Jujutsu Kaisen", "El mundo de la magia, donde los hechiceros y las brujas luchan contra maldiciones para poder mantener el equilibrio del mundo","Emisión", 211, "Shonen-Seinen", "8");
manga2.agregarManga();
const manga3 = new manga("Shingeki no kiojin","Epicas batallas de bichos gigantes","emision", 600, "Shonen - Aventura", "9");
manga3.agregarManga();
const manga4 = new manga("Kaguya-Sama", "Amor de preparatoria, en donde los protagonistas no pueden declarar sus sentimientos por miedo a que piensen que sean debiles", "Emisión", 78, "Romance-Escolar", "8");
manga4.agregarManga();
const manga5 = new manga("Blue Lock", "Futbol, ser el mejor, lograr ser el primero en un proyecto de futbol llamado Blue Lock", "Emisión", 200, "Shonen-Deporte", "8");
manga5.agregarManga();


console.log(arrayMangas[2]);


//crearVariables




alert(`Bienvien@ a mi pagina para gestionar tus lecturas de mangas. Aca podras guardar y gestionar tus mangas que leas o quieras leer.`)
//menuInicio(arrayMangas);//inicio del programa
mostrarMangas(arrayMangas);