

// validar array en el storage
if (!JSON.parse(localStorage.getItem("arrayMangas"))) {
    // Si no existe, lo crea como un array vacío
    localStorage.setItem("arrayMangas", JSON.stringify([]));
}
if (!JSON.parse(localStorage.getItem("nextMangaNumero"))) {
    // Si no existe, lo crea como un array vacío
    let nextMangaNumero = 0
    localStorage.setItem("nextMangaNumero", JSON.stringify(nextMangaNumero));
}
// localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));
let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"));
//Objetos
class manga{
    constructor(nombre,imagen, descripcion, estado, cantCapitulosLeidos, genero, puntuacion){

        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.estado = estado;//los estado son finalizado o en emision
        this.cantCapitulosLeidos = cantCapitulosLeidos;
        this.genero = genero;
        this.puntuacion = puntuacion;//medida del uno al 10
        let auxiliar =JSON.parse(localStorage.getItem("nextMangaNumero"))
        auxiliar=parseInt(auxiliar)
        this.numero = auxiliar++
        localStorage.setItem("nextMangaNumero", JSON.stringify(auxiliar));
    }
    //metodos
    agregarManga(){
    let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))
    arrayMangas.push(this);
    localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));
    
    }
    modificarPosicion(){}

    quitarManga(numIndice, num,arrayMangas){
        arrayMangas.splice(numIndice, num)
    }
    mostrarNombreManga(){
        return this.nombre;
    }
    
}

//funcionese






// document.getElementById("buscadorInput").addEventListener("input", function() {
//     // aquí se coloca la función de búsqueda
//   });






//agrega los mangas nuevos y los muestra en la lista
const agregarMangasALista = (nombre,imagen,descripcion, estado,cantCapitulosLeidos,genero,puntuacion) =>{
    

    // let nombre = prompt("Ingresa un nombre")
    // let descripcion = prompt("Ingresa una descripcion")
    // let estado = prompt("Ingresa un estado. puede ser finalizado o en emision")
    // estado = estado.toLowerCase()
    // let imagen = prompt("Ingresa un url de tu manga")
    // let cantCapitulosLeidos = prompt("Ingresa la cantidad de capitulos que has leido")
    // let genero = prompt("Ingresa el genero")
    // let puntuacion = prompt("Ingresa una puntuacion del 1 al 10")
    let mangaNuevo = new manga(nombre,imagen,descripcion, estado,cantCapitulosLeidos,genero,puntuacion)//pido datos y creo el objeto
    
    mangaNuevo.agregarManga() 
    alert(`
         El manga ingresado es: ${nombre}
         Su descripcion es: ${descripcion} 
         Su estado es: ${estado} 
         La cantidad de capitulos leidos es: ${cantCapitulosLeidos} 
         Su genero es: ${genero} 
         Y tiene una puntuacion : ${puntuacion}`
         )
        
    mostrarMangas()

}

const mostrarMangas = () =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    let arrayDeStorage = JSON.parse(localStorage.getItem("arrayMangas"))
    console.log(arrayDeStorage)
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
        for (let i = 0; i < arrayDeStorage.length; i++){
        //en esta20 lineas se utilizan para mostrar los objetos manga
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="${arrayDeStorage[i].imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${arrayDeStorage[i].nombre}</h5>
                                                <p class="card-text">${arrayDeStorage[i].descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${arrayDeStorage[i].estado}</li>
                                                <li class="list-group-item">Su genero es: ${arrayDeStorage[i].genero}</li>
                                                <li class="list-group-item">Has leido: ${arrayDeStorage[i].cantCapitulosLeidos} capitulos</li>
                                                <li class="list-group-item">Tu puntuacion: ${arrayDeStorage[i].puntuacion}</li>
                                            </ul>

                                        </div>`
        
        mangasdiv.appendChild(mangaContenido)
        }

}

const eliminarMangas = () =>{
    let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))
    arrayMangas = []
    localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));
    let contadorDeMangas =JSON.parse(localStorage.getItem("nextMangaNumero"))
    contadorDeMangas = contadorDeMangas -1
    localStorage.setItem("nextMangaNumero", JSON.stringify(contadorDeMangas));
    mostrarMangas()
}
// Muestra la lista pero de forma por defecto
const botonAlfabeticamenteFuncion = ()=>{
    let mangaOrdenado = []
    mangaOrdenado = mangaOrdenado.concat(JSON.parse(localStorage.getItem("arrayMangas")))
    
    mangaOrdenado.sort((mangaA,mangaB) => {
        if (mangaA.nombre > mangaB.nombre){
            return 1
        }
        if (mangaB.nombre > mangaA.nombre){
            return -1
        }
        return 0
      });
      for (let orden of mangaOrdenado){
        console.log(orden.nombre)
        }
        mostrarMangasOrdenado(mangaOrdenado);   
}
// Muestra la lista pero de forma alfabeticamente
const mostrarMangasOrdenado = (mangaOrdenado) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
        for (let i = 0; i < mangaOrdenado.length; i++){
        //en esta20 lineas se utilizan para mostrar los objetos manga
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="${mangaOrdenado[i].imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangaOrdenado[i].nombre}</h5>
                                                <p class="card-text">${mangaOrdenado[i].descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangaOrdenado[i].estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangaOrdenado[i].genero}</li>
                                                <li class="list-group-item">Has leido: ${mangaOrdenado[i].cantCapitulosLeidos} capitulos</li>
                                                <li class="list-group-item">Tu puntuacion: ${mangaOrdenado[i].puntuacion}</li>
                                            </ul>
                                            
                                            
                                        </div>`
        mangasdiv.appendChild(mangaContenido)
        
        }
}
function buscarManga(valor, mangas) {
    if (valor != null){
        return mangas.filter(manga => manga.nombre.toLowerCase().includes(valor.toLowerCase()));}
    else{
        let mangasdiv = document.getElementById("mangas") 
        mangasdiv.innerHTML="No se encontro ninguna coincidencia"
    }
}

const mostrarMangasBusqueda = (mangaBuscado) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
        for (let i = 0; i < mangaBuscado.length; i++){
        //en esta20 lineas se utilizan para mostrar los objetos manga
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="${mangaBuscado[i].imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangaBuscado[i].nombre}</h5>
                                                <p class="card-text">${mangaBuscado[i].descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangaBuscado[i].estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangaBuscado[i].genero}</li>
                                                <li class="list-group-item">Has leido: ${mangaBuscado[i].cantCapitulosLeidos} capitulos</li>
                                                <li class="list-group-item">Tu puntuacion: ${mangaBuscado[i].puntuacion}</li>
                                            </ul>
                                            
                                            
                                        </div>`
        mangasdiv.appendChild(mangaContenido)
        
        }
}


//botones

let inputNombreManga = document.getElementById("inputNombreManga")
let inputDescripcionManga = document.getElementById("inputDescripcionManga")
let inputImagenManga = document.getElementById("inputImagenManga")
let inputEstadoManga = document.getElementById("inputEstadoManga")
let inputManga = document.getElementById("inputMangaCantCapitulosLeidos")
let inputGeneroManga = document.getElementById("inputGeneroManga")
let inputPuntuacionManga = document.getElementById("inputPuntuacionManga")



let botonCrearManga = document.getElementById("botonCrearManga")
    botonCrearManga.addEventListener("click", function () {
        
        let crearMangaDiv = document.getElementById("crearMangaDiv")
        crearMangaDiv.innerHTML += `
                        
                        <label for="inputNombreManga">Ingresa el nombre del anime:</label>
                        <input type="text" id="inputNombreManga">
                        <label for="inputDescripcionManga">Ingresala descripcion del anime:</label>
                        <input type="text" id="inputDescripcionManga">
                        <label for="inputImagenManga">Ingresala una url del anime:</label>
                        <input type="text" id="inputImagenManga">
                        <label for="inputEstadoManga">Ingresala un estado del anime ("Finalizado" o "en emision"):</label>
                        <select id="inputEstadoManga" class="form-select crearMangaSelector" aria-label="Default select example">
                            <option selected class="crearMangaSelectorEstado">Open this select menu</option>
                            <option value="En emision"class="crearMangaSelectorEstado">En emision</option>
                            <option value="Finalizado"class="crearMangaSelectorEstado">Finalizado</option>
                        </select>
                        <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                        <input type="text" id="inputMangaCantCapitulosLeidos">
                        <label for="inputGeneroManga">Ingresa un genero</label>
                        <input type="text" id="inputGeneroManga">
                        <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                        <input type="text" id="inputPuntuacionManga">`
        

    });

let botonSaveManga = document.getElementById("botonSaveManga")
botonSaveManga.addEventListener("click", function() {

    let nombre= document.getElementById("inputNombreManga").value;
    let descripcion= document.getElementById("inputDescripcionManga").value;
    let imagen= document.getElementById("inputImagenManga").value;
    let  estado= document.getElementById("inputEstadoManga").value;
    let cantCapitulosLeidos= document.getElementById("inputMangaCantCapitulosLeidos").value;
    let genero= document.getElementById("inputGeneroManga").value;
    let puntuacion= document.getElementById("inputPuntuacionManga").value;

    
    agregarMangasALista(nombre,imagen,descripcion, estado,cantCapitulosLeidos,genero,puntuacion)

})



let buscador = document.getElementById("buscador");

buscador.addEventListener("input", function() {
    let resultados = buscarManga(this.value, arrayMangas);

    mostrarMangasBusqueda(resultados)
  });



let selector = document.getElementById("selectOrden")
selector.addEventListener("change",function(){
    const indicadorSelector = selector.value;
    if (indicadorSelector === "alf"){
        botonAlfabeticamenteFuncion();
    }
    if (indicadorSelector === "def"){
        mostrarMangas()
    }
})

let botoneliminar = document.getElementById("botonEliminarManga")
botoneliminar.addEventListener("click", function () {
    let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))

    arrayMangas != null ? eliminarMangas() : alert ("No hay mangas que eliminar")    
    
})


//aca dejo algunos mangas precargados para que puedan probar las funcionalidades

function cargarObjetos(){//creo funcion para poder ya tener precargados algunos mangas
    
    if(!JSON.parse(localStorage.getItem("precargado"))) {
        // Si no existe, lo crea como un array vacío
        let precargado =true
        const manga1 = new manga("One piece","./iconos/onepiece.png","Es un anime que se centra en la gran era pirata, una historia llena de aventura y diversion.", "Emisión", 600, "Shonen - Aventura", "9");
        manga1.agregarManga();
        const manga2 = new manga("Jujutsu Kaisen","./iconos/JJK.jpg", "El mundo de la magia, donde los hechiceros y las brujas luchan contra maldiciones para poder mantener el equilibrio del mundo","Emisión", 211, "Shonen-Seinen", "8");
        manga2.agregarManga();
        const manga3 = new manga("Shingeki no kiojin", "./iconos/SNK.jpg", "Epicas batallas de bichos gigantes","emision", 90, "Shonen - Aventura", "9");
        manga3.agregarManga();
        localStorage.setItem("precargado", JSON.stringify(precargado));
      
    }
}




cargarObjetos()
mostrarMangas();


// localStorage.removeItem("nextMangaNumero")
// localStorage.removeItem("arrayMangas")
