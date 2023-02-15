
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


// input relacionado al buscador de mangas
let buscador = document.getElementById("buscador");
buscador.addEventListener("input", function() {
    let resultados = buscarManga(this.value, arrayMangas);

    mostrarMangasBusqueda(resultados)
  });


// muestra la lista de formar normal o de manera alfabetica
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