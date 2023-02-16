

// validar en el storage los datos necesarios

// array donde contengo mangas
if (!JSON.parse(localStorage.getItem("arrayMangas"))) {
    // Si no existe, lo crea como un array vacío
    localStorage.setItem("arrayMangas", JSON.stringify([]));
}
// variable para llevar un contador de los mangas que exiten
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
        console.log("El nextMangas es :"+ auxiliar)
        this.numero = auxiliar
        auxiliar = auxiliar+1
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

//agrega los mangas nuevos y los muestra en la lista
const agregarMangasALista = (nombre,imagen,descripcion, estado,cantCapitulosLeidos,genero,puntuacion) =>{
    

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
// muestra los mangas por defecto
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
// elimina la lista de mangas
const eliminarMangas = () =>{
    let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))
    arrayMangas = []
    localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));
    let contadorDeMangas =JSON.parse(localStorage.getItem("nextMangaNumero"))
    contadorDeMangas = contadorDeMangas -1
    localStorage.setItem("nextMangaNumero", JSON.stringify(contadorDeMangas));
    mostrarMangas()
}







const eliminarMangas2 = () =>{
    let mangasdiv = document.getElementById("auxialiarModal")
    mangasdiv.innerHTML = ""
    let mangasAEliminar =  JSON.parse(localStorage.getItem("arrayMangas"))
    
    for (let mostrarEliminados of mangasAEliminar){
        let mangaContenido = document.createElement('div');
        mangaContenido.innerHTML += 
                                    `<div id="mangaEliminar${mostrarEliminados.numero}">
                                        <h5>${mostrarEliminados.nombre}</h5>
                                        <button id="botonEliminar${mostrarEliminados.numero}" class="card-body__botonEliminar">
                                            <img class="card-body__botonEliminar__iconoeliminar" src="./iconos/elimanarIncon.png" alt="" srcset="">
                                        </button>
                    
                                    </div>
                                    `
        mangasdiv.appendChild(mangaContenido)                            
    }

    mangasAEliminar.forEach((mostrarEliminados) => {
        // 
        document.getElementById(`botonEliminar${mostrarEliminados.numero}`).addEventListener("click", ()=>{
            console.log("merequetengue")
            let mangaCard = document.getElementById(`mangaEliminar${mostrarEliminados.numero}`)
            mangaCard.remove()

            let mangaEliminado = mangasAEliminar.find(manguita => manguita.numero == mostrarEliminados.numero)
            console.log(mangaEliminado)

            let posicionM = mangasAEliminar.indexOf(mangaEliminado)
            console.log(posicionM)
            mangasAEliminar.splice(posicionM,1)
            localStorage.setItem("arrayMangas",JSON.stringify(mangasAEliminar))
            let contadorMangaBajado =  JSON.parse(localStorage.getItem("nextMangaNumero"))
            contadorMangaBajado = contadorMangaBajado  -1
            
            localStorage.setItem("nextMangaNumero",JSON.stringify(contadorMangaBajado))

        })
        
    });
}

let auxiliar = document.getElementById("auxiliar")
auxiliar.addEventListener("click", function(){
    eliminarMangas2( ) 
})





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
// funcion designada para buscar los mangas en el buscador
function buscarManga(valor, mangas) {
    if (valor != null){
        return mangas.filter(manga => manga.nombre.toLowerCase().includes(valor.toLowerCase()));}
    else{
        let mangasdiv = document.getElementById("mangas") 
        mangasdiv.innerHTML="No se encontro ninguna coincidencia"
    }
}
// muestra los mangas buscados
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

fetch('./JSON/mangas.json')
    .then(response => response.json())
    .then((data)=>{
            console.log(data)})
// localStorage.removeItem("nextMangaNumero")
// localStorage.removeItem("arrayMangas")