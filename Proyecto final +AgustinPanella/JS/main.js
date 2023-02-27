
// let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"));
// console.log(arrayMangas)


if (!JSON.parse(localStorage.getItem("arrayMangas"))) {
    localStorage.setItem("arrayMangas", JSON.stringify([]));
}

//REVISAR SI SE USA
// variable para llevar un contador de los mangas que exiten
if (!JSON.parse(localStorage.getItem("nextMangaNumero"))) {
    // Si no existe, lo crea como un array vacío
    let nextMangaNumero = 0
    localStorage.setItem("nextMangaNumero", JSON.stringify(nextMangaNumero));
}


// localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));




//funcionese


// muestra los mangas solicitados

    // arrayMangas =JSON.parse(localStorage.getItem("arrayMangas"))
    // let mangasdiv = document.getElementById("mangas") 
    // mangasdiv.innerHTML=""
   
    // for (let mangas of arrayMangas){
    //     //en esta20 lineas se utilizan para mostrar los objetos manga
    //     let mangaContenido = document.createElement('div');
    //     mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
    //                                         <img src="${mangas.imagen}" class="card-img- top" alt="...">
    //                                         <div class="card-body">
    //                                             <h5 class="card-title">${mangas.nombre}</h5>
    //                                             <p class="card-text">${mangas.descripcion}</p>
    //                                         </div>
    //                                         <ul class="list-group list-group-flush">
    //                                             <li class="list-group-item">El estado es: ${mangas.estado}</li>
    //                                             <li class="list-group-item">Su genero es: ${mangas.genero}</li>
    //                                             <li class="list-group-item">Contiene: ${mangas.ultimoCapitulo} capitulos</li>
    //                                         </ul>
    //                                         <button id="quitarManga${mangas.numero}" class="card-body__botonAgregarMangas">
    //                                              Quitar este manga
    //                                         </button>
    //                                     </div>`
        
    // mangasdiv.appendChild(mangaContenido)
      
    // } 
    // arrayMangas.forEach((mangas) => {
        
    //     document.getElementById(`quitarManga${mangas.numero}`).addEventListener("click", ()=>{
    //         // console.log("merequetengue1")

    //         // // let arrayMangaAgregar = JSON.parse(localStorage.getItem("arrayMangas"))

    //         // let mangaCard = document.getElementById(`mangaEliminar${mangas.numero}`)
    //         // mangaCard.remove()

    //         // let mangaEliminado = mangasAEliminar.find(manguita => manguita.numero == mostrarEliminados.numero)

    //         // console.log(mangaEliminado)

    //         // let posicionM = mangasAEliminar.indexOf(mangaEliminado)

    //         // console.log(posicionM)

    //         // mangasAEliminar.splice(posicionM,1)

    //         // localStorage.setItem("arrayMangas",JSON.stringify(mangasAEliminar))
    //         // let contadorMangaBajado =  JSON.parse(localStorage.getItem("nextMangaNumero"))
    //         // contadorMangaBajado = contadorMangaBajado  -1
            
    //         // localStorage.setItem("nextMangaNumero",JSON.stringify(contadorMangaBajado))
    //         // mostrarMangas()
    //     })
    // })



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
// segunda version de eliminar un objeto
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
            mostrarMangas()
        })
        
    });
    
}


// Este boton si no esta EN LA FUNCION MAIN NO FUNCA, NO SE POR QUE 
let auxiliar = document.getElementById("botonEliminarManga")
auxiliar.addEventListener("click", function(){
    eliminarMangas2() 
    
})

const mostrarMangas = (arrayMangas) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    for(let mangas of arrayMangas){
        console.log('iii')
        let mangaContenido = document.createElement('div');
        mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>
                                                <li class="list-group-item">Contiene: ${mangas.ultimoCapitulo} capitulos</li>
                                            </ul>
                                            <button value="${mangas.nombre}" _id 1="${mangas.nombre} type="button" class="btn btn-outline-success add">Agregar este manga</button>
                                        </div>`
        
    mangasdiv.appendChild(mangaContenido)
    } 
    
    
}

let arrayMangasPr = []

const getMangaArrayJson = async () =>{
    const response = await fetch('./JSON/mangas.json')
    data = await response.json();
    console.log(data)
    data.forEach(e => {
        let mg = new manga(e.nombre, e.imagen, e.descripcion,null,null,e.genero,null);
        arrayMangasPr.push(mg);
    })
};


const saveManga= () =>{
    console.log(addMangaButton.value)  
}

document.getElementById('mangas')
.addEventListener('click',e=>{
    if(e.target.classList.contains('add')){
        arrayMangas.forEach(element => {
            if(e.target.getAttribute(_id) == element.nombre){
                element.agregarManga();
            }
        });
       
    }
})

// let addMangaButton = document.querySelectorAll('btn')
// console.log(addMangaButton)
// for(let i=0; addMangaButton.length; i++){
//     addMangaButton[i].addEventListener('click',()=>{
//         console.log(addMangaButton[i].value)
//     })
// }

// let mangaEliminado = mangasAEliminar.find(manguita => manguita.numero == mostrarEliminados.numero)







//     arrayMangas.forEach((mangas) => {
//         // 
//         document.getElementById(`botonAgregarManga${mangas.numero}`).addEventListener("click", ()=>{
//             console.log("merequetengue")

//             // let arrayMangaAgregar = JSON.parse(localStorage.getItem("arrayMangas"))
            
//             let mangaNuevo = new manga(nombre,imagen,descripcion, estado,ultimoCapitulo,genero,puntuacion)
//             mangaNuevo.agregarManga()


//             // let mangaCard = document.getElementById(`mangaEliminar${mangas.numero}`)
//             // mangaCard.remove()

//             // 

//             // let posicionM = mangasAEliminar.indexOf(mangaEliminado)
//             // console.log(posicionM)
//             // mangasAEliminar.splice(posicionM,1)
//             // localStorage.setItem("arrayMangas",JSON.stringify(mangasAEliminar))
//             // let contadorMangaBajado =  JSON.parse(localStorage.getItem("nextMangaNumero"))
//             // contadorMangaBajado = contadorMangaBajado  -1
            
//             // localStorage.setItem("nextMangaNumero",JSON.stringify(contadorMangaBajado))
//             // mostrarMangas()
//         })
//     })
// }
// Muestra la lista pero de forma por defecto
// const botonAlfabeticamenteFuncion = ()=>{
//     let mangaOrdenado = []
//     mangaOrdenado = mangaOrdenado.concat(JSON.parse(localStorage.getItem("arrayMangas")))
    
//     mangaOrdenado.sort((mangaA,mangaB) => {
//         if (mangaA.nombre > mangaB.nombre){
//             return 1
//         }
//         if (mangaB.nombre > mangaA.nombre){
//             return -1
//         }
//         return 0
//       });
//       for (let orden of mangaOrdenado){
//         console.log(orden.nombre)
//         }
//         mostrarMangasOrdenado(mangaOrdenado);   
// }
// // Muestra la lista pero de forma alfabeticamente
// const mostrarMangasOrdenado = (mangaOrdenado) =>{
//     let mangasdiv = document.getElementById("mangas") 
//     mangasdiv.innerHTML=""
//     // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
//         for (let i = 0; i < mangaOrdenado.length; i++){
//         //en esta20 lineas se utilizan para mostrar los objetos manga
//             let mangaContenido = document.createElement('div');
//             mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
//                                             <img src="${mangaOrdenado[i].imagen}" class="card-img- top" alt="...">
//                                             <div class="card-body">
//                                                 <h5 class="card-title">${mangaOrdenado[i].nombre}</h5>
//                                                 <p class="card-text">${mangaOrdenado[i].descripcion}</p>
//                                             </div>
//                                             <ul class="list-group list-group-flush">
//                                                 <li class="list-group-item">El estado es: ${mangaOrdenado[i].estado}</li>
//                                                 <li class="list-group-item">Su genero es: ${mangaOrdenado[i].genero}</li>
//                                                 <li class="list-group-item">Has leido: ${mangaOrdenado[i].cantCapitulosLeidos} capitulos</li>
//                                                 <li class="list-group-item">Tu puntuacion: ${mangaOrdenado[i].puntuacion}</li>
//                                             </ul>
                                            
                                            
//                                         </div>`
//         mangasdiv.appendChild(mangaContenido)
        
//         }
// }
// // funcion designada para buscar los mangas en el buscador
// function buscarManga(valor, mangas) {
//     if (valor != null){
//         return mangas.filter(manga => manga.nombre.toLowerCase().includes(valor.toLowerCase()));}
//     else{
//         let mangasdiv = document.getElementById("mangas") 
//         mangasdiv.innerHTML="No se encontro ninguna coincidencia"
//     }
// }
// // muestra los mangas buscados
// const mostrarMangasBusqueda = (mangaBuscado) =>{
//     let mangasdiv = document.getElementById("mangas") 
//     mangasdiv.innerHTML=""
//     // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
//         for (let i = 0; i < mangaBuscado.length; i++){
//         //en esta20 lineas se utilizan para mostrar los objetos manga
//             let mangaContenido = document.createElement('div');
//             mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
//                                             <img src="${mangaBuscado[i].imagen}" class="card-img- top" alt="...">
//                                             <div class="card-body">
//                                                 <h5 class="card-title">${mangaBuscado[i].nombre}</h5>
//                                                 <p class="card-text">${mangaBuscado[i].descripcion}</p>
//                                             </div>
//                                             <ul class="list-group list-group-flush">
//                                                 <li class="list-group-item">El estado es: ${mangaBuscado[i].estado}</li>
//                                                 <li class="list-group-item">Su genero es: ${mangaBuscado[i].genero}</li>
//                                                 <li class="list-group-item">Has leido: ${mangaBuscado[i].cantCapitulosLeidos} capitulos</li>
//                                                 <li class="list-group-item">Tu puntuacion: ${mangaBuscado[i].puntuacion}</li>
//                                             </ul>
                                            
                                            
//                                         </div>`
//         mangasdiv.appendChild(mangaContenido)
        
//         }
// }


//aca dejo algunos mangas precargados para que puedan probar las funcionalidades
// const mostrarMisMangas = () => { 
    
//     let arrayMangas = !JSON.parse(localStorage.getItem("arrayMangas"))

//     let mangasdiv = document.getElementById("mangas") 
//     mangasdiv.innerHTML=""

//     for (let mangas of arrayMangas){

//         let mangaContenido = document.createElement('div');
//         mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
//                                             <img src="${mangas.imagen}" class="card-img- top" alt="...">
//                                             <div class="card-body">
//                                                 <h5 class="card-title">${mangas.nombre}</h5>
//                                                 <p class="card-text">${mangas.descripcion}</p>
//                                             </div>
//                                             <ul class="list-group list-group-flush">
//                                                 <li class="list-group-item">El estado es: ${mangas.estado}</li>
//                                                 <li class="list-group-item">Su genero es: ${mangas.genero}</li>
//                                                 <li class="list-group-item">Contiene: ${mangas.ultimoCapitulo} capitulos</li>
//                                             </ul>
//                                             <button id="eliminarManga${mangas.numero}" class="card-body__botonAgregarMangas">
//                                                  eliminar tachito
//                                             </button>
//                                         </div>`
        
//     mangasdiv.appendChild(mangaContenido)}
// };





array = getMangaArrayJson();
mostrarMangas(arrayMangasPr);


// localStorage.removeItem("nextMangaNumero")
// localStorage.removeItem("arrayMangas")
