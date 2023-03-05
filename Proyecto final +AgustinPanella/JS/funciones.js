
const getMangaArrayJson = async () =>{
    const response = await fetch('./JSON/mangas.json')
    data = await response.json();



    let contenedorAuxiliar = document.getElementById("contenedorAuxiliar")
    contenedorAuxiliar.innerHTML = ""

    let bienvenida = document.createElement('div')
    bienvenida.innerHTML +=`<p class="bienvenida">
    Bienvenid@ a mi pagina para gestionar tus lecturas de mangas. Aca podras
    guardar y gestionar tus mangas que leas o quieras leer.
    </p>`
    contenedorAuxiliar.appendChild(bienvenida)
    




    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    for(let mangas of data){
        let mangaContenido = document.createElement('div');
        mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <div id="datosEntrada${mangas.numero}"></div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>
                                                <li class="list-group-item">Contiene: ${mangas.ultimoCapitulo} capitulos</li>
                                            </ul>
                                            <button  id ="botonAgregarManga${mangas.numero}" type="button" class="btn btn-outline-success botonDeManga">Agregar este manga</button>
                                        </div>`
        
    mangasdiv.appendChild(mangaContenido)
    } 
    
    data.forEach((mangas) => {
        // 
        document.getElementById(`botonAgregarManga${mangas.numero}`).addEventListener("click", ()=>{
            
            let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"));
            const auxiliarRepetido = arrayMangas.find(manguitas =>{
                
                return manguitas.numero == mangas.numero
            })
            


            if (!auxiliarRepetido){            
                let mangaNuevo = new manga(mangas.nombre, mangas.imagen, mangas.descripcion, mangas.estado, null, mangas.genero, null, mangas.numero, mangas.ultimoCapitulo)
                mangaNuevo.agregarManga()
            // Confirmacion grafica sweetalert
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Este manga fue añadido a tu lista',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Este manga ya fue agregado, intenta de nuevo',
                  })
            }

        })
    })
}
const listaMisMangas = () => {

    // edito el DOM para adecuarlo al nuevo 
    let contenedorAuxiliar = document.getElementById("contenedorAuxiliar")
    contenedorAuxiliar.innerHTML = ""

    let bienvenida = document.createElement('div')
    bienvenida.innerHTML +=`<div class= "filtros">
                            <select
                            id="selectOrden"
                            class="form-select botonOrdenar form-select-sm selectorAlf "
                            aria-label=".form-select-sm example"
                            >
                            <option value="def" selected>Ordenar por:</option>
                            <option value="alf">Alfabeticamente</option>
                            </select>
                        

                        <input
                            class="buscador"
                            type="text"
                            id="buscador"
                            placeholder="Buscar manga"
                        />
                        </div>
                            `

    contenedorAuxiliar.appendChild(bienvenida)
    // botones que gestionan 
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
    let buscador = document.getElementById("buscador");
    buscador.addEventListener("input", function(){
    let resultados = buscarManga(this.value);
    if (resultados){
        mostrarMangasBusqueda(resultados)}
    }
    ); 

    //aca empieza a mostrar los mangas guardados 
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    let arrayMangasSave = JSON.parse(localStorage.getItem("arrayMangas"))
    
    for(let mangas of arrayMangasSave){
        if (mangas.cantCapitulosLeidos == null || mangas.puntuacion == null) {
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>

                                                <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Completar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                            <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                            <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                            <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </ul>
                                            <button id ="botonEliminarManga${mangas.numero}"  type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        } 
        else{
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>
                                                <li class="list-group-item">Leiste: ${mangas.cantCapitulosLeidos} capitulos</li>
                                                
                                                <li class="list-group-item">Le diste una puntuacion de: ${mangas.puntuacion}</li>
                                            </ul>
                                            <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Editar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                                                <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                                                <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                                                <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                                                <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            <button id ="botonEliminarManga${mangas.numero}" value="${mangas.numero}"type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        }    
    }  


    // modifica el manga guardado
    arrayMangasSave.forEach((mangas) => {
        
        document.getElementById(`saveDatosManga${mangas.numero}`).addEventListener("click", ()=>{
            let dato1 = document.getElementById(`inputMangaCantCapitulosLeidos${mangas.numero}`).value
            let dato2 = document.getElementById(`inputPuntuacionManga${mangas.numero}`).value
            
            
            if(dato2==undefined || dato1 == undefined || dato2 == ""|| dato1==""){

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los datos no son correctos',
                })
            }
            else{
                if ( !isNaN(dato1) && !isNaN(dato2)){
                
                    if((1<dato2 && dato2<10) && (0<dato1 && dato1<=mangas.cantMaximaCap)){
                
                        let auxiliarValue = document.getElementById(`saveDatosManga${mangas.numero}`).value

                        let mangaConfig = arrayMangasSave.find(manguita => manguita.numero == auxiliarValue)
                
                        let posicionM = arrayMangasSave.indexOf(mangaConfig)

                        arrayMangasSave[posicionM].cantCapitulosLeidos = dato1
                        arrayMangasSave[posicionM].puntuacion = dato2

                        

                        localStorage.setItem("arrayMangas",JSON.stringify(arrayMangasSave))

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Se realizaron los cambios',
                            showConfirmButton: false,
                            timer: 2500
                        })
                    
                }
                else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Los datos no son correctos',
                        })
                    }
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los datos no son correctos',
                })
            }
            } 
            
        })
    })
    
    // Elimina el manga guardado
    arrayMangasSave.forEach((mangas) => {
        // 
        document.getElementById(`botonEliminarManga${mangas.numero}`).addEventListener("click", ()=>{
            
            let mangaCard = document.getElementById(`miManga${mangas.numero}`)
            mangaCard.remove()

            let mangaEliminado = arrayMangasSave.find(manguita => manguita.numero == mangas.numero)
            

            let posicionM = arrayMangasSave.indexOf(mangaEliminado)
           

            arrayMangasSave.splice(posicionM,1)

            localStorage.setItem("arrayMangas",JSON.stringify(arrayMangasSave))

            listaMisMangas()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino el manga',
                showConfirmButton: false,
                timer: 2500
            })
        })
        
    });

    // actualiza la vista de los mangas cuando se cierra el editor de datos
    arrayMangasSave.forEach((mangas) => {
        document.getElementById(`cerrarEditorManga${mangas.numero}`).addEventListener("click",()=>{
            listaMisMangas()
        })
    })
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
        
        }
        mostrarMangasOrdenado(mangaOrdenado);   
}
// Muestra la lista pero de forma alfabeticamente
const mostrarMangasOrdenado = (mangaOrdenado) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
    for(let mangas of mangaOrdenado){
        if (mangas.cantCapitulosLeidos == null || mangas.puntuacion == null) {
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>

                                                <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Completar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                            <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                            <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                            <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </ul>
                                            <button id ="botonEliminarManga${mangas.numero}"  type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        } 
        else{
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>
                                                <li class="list-group-item">Leiste: ${mangas.cantCapitulosLeidos} capitulos</li>
                                                
                                                <li class="list-group-item">Le diste una puntuacion de: ${mangas.puntuacion}</li>
                                            </ul>
                                            <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Editar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                            <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                            <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                            <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            <button id ="botonEliminarManga${mangas.numero}" value="${mangas.numero}"type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        }
        
        
    } 
}
// funcion designada para buscar los mangas en el buscador
function buscarManga(valor) {

    let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))
    if (valor != null){
        return arrayMangas.filter(manga => manga.nombre.toLowerCase().includes(valor.toLowerCase()));
    }
    
    else{
        let mangasdiv = document.getElementById("mangas") 
        mangasdiv.innerHTML="<p> No se encontro ninguna coincidencia </p>"
        return false
    }
}
// // muestra los mangas buscados
const mostrarMangasBusqueda = (mangaBuscado) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    // for (const manga of arrayMangas){ Esta linea me genero problemas pero no se como solucionarlos 
        
    for(let mangas of mangaBuscado){
        if (mangas.cantCapitulosLeidos == null || mangas.puntuacion == null) {
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>

                                                <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Completar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                            <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                            <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                            <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </ul>
                                            <button id ="botonEliminarManga${mangas.numero}"  type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        } 
        else{
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" id = "miManga${mangas.numero}"style="width: 18rem;">
                                            <img src="${mangas.imagen}" class="card-img- top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${mangas.nombre}</h5>
                                                <p class="card-text">${mangas.descripcion}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">El estado es: ${mangas.estado}</li>
                                                <li class="list-group-item">Su genero es: ${mangas.genero}</li>
                                                <li class="list-group-item">Leiste: ${mangas.cantCapitulosLeidos} capitulos</li>
                                                
                                                <li class="list-group-item">Le diste una puntuacion de: ${mangas.puntuacion}</li>
                                            </ul>
                                            <button id="configManga${mangas.numero}" type="button" class="btn btn-outline-secondary botonDeManga" data-bs-toggle="modal" data-bs-target="#exampleModal${mangas.numero}"> Editar Datos</button>
                                                

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${mangas.numero}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="inputMangaCantCapitulosLeidos">Ingresa la cantidad de capitulos que has leido</label>
                                                            <input type="text" id="inputMangaCantCapitulosLeidos${mangas.numero}" placeholder="Max: ${mangas.cantMaximaCap}">
                                                            <label for="inputPuntuacionManga">Dale una puntuacion al manga del 1 al 10</label>
                                                            <input type="text" id="inputPuntuacionManga${mangas.numero}" placeholder=" 1 al 10">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="cerrarEditorManga${mangas.numero}" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button id ="saveDatosManga${mangas.numero}"value="${mangas.numero}" type="button" class="btn btn-primary">Guardar Cambios</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                            <button id ="botonEliminarManga${mangas.numero}" value="${mangas.numero}"type="button" class="btn btn-outline-danger botonDeManga">Eliminar</button>
                                            
                                        </div>`
        
            mangasdiv.appendChild(mangaContenido)
        }
        
        
    }  
}
