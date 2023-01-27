// objetos
class manga{
    
    constructor(){
        this.nombre = prompt("Ingresa el nombre del manga")
        // this.imagen = prompt("Ingresa la url de la imagen")
        // this.finalizado  =prompt("Ingrese 'finalizado' o 'no finalizado' si el manga esta finalizado")
        // this.finalizado = this.finalizado.trim()
        // this.finalizado = this.finalizado.toLowerCase()
        
        // if(this.finalizado== "finalizado"){
        //     this.estado = "Finalizado"; //guardo el estado en el que se encuantra el manga
        //     if(this.estado == "Finalizado"){
        //         this.cantidadCap = parserInt(prompt("Ingresa la cantidad de capitulos que posee el manga"))
        //     }if(this.finalizado== "nofinalizado"){
        //     this.estado = "NoFinalizado"
        //     }
       
         this.estado =  prompt("Ingrese 'finalizado' o 'no finalizado' si el manga esta finalizado")
        // else this.cantidadCap = null
        this.capLeidos = prompt("Ingresa la cantidad de capitulos que has leido");
        
    }
    agregarManga(manga){
        arrayMangas.push(manga)
    }
//     cambiarCantidadCap(cantidadCap){
//         if (this.finalizado ==true){
//             alert('El maga esta finalizado, no se puede agregar , mas capitulos.')
//         }else this.cantidadCap = cantidadCap;
            
//     }
//     consultarFin(){
//         if (this.finalizado){
//             console.log('Este manga fue finalizado');
//             return;
//         }else console.log('Todavia no esta finalizado');
//         return;
//     }
//     cambiarFinalizado(){
//         if (this.finalizado == true){
//             this.finalizado = false;
//         }else this.finalizado = false;
//     }
}



    
const botonCrearMangaFuncion = ()=> {
    console.log(arrayMangas)
    let mangaPorBoton = new manga();
    mangaPorBoton.agregarManga();
    mostrarMangas(arrayMangas);

    // let huecoManga = arrayMangas.indexOf(null)
    // stringHuecoManga = huecoManga.toString();
    
    // console.log(huecoManga);

    // arrayMangas[huecoManga] = let   = new manga();

    // console.log(arrayMangas[huecoManga])
    // mostrarMangas();
}









// Botones

 let botonCrearManga = document.getElementById("botonCrearManga")
 botonCrearManga.addEventListener("click", botonCrearMangaFuncion);

 
//funciones
let arrayMangas = []; 
const mostrarMangas = (arrayMangas) =>{
    let mangasdiv = document.getElementById("mangas") 
    mangasdiv.innerHTML=""
    for (const manga of arrayMangas){
        // //en esta20 lineas se utilizan para mostrar los objetos manga
            let mangaContenido = document.createElement('div');
            mangaContenido.innerHTML = `<div class="card" style="width: 18rem;">
                                            <img src="..." class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">aca va el nombre</h5>
                                                <p class="card-text">Aca la descripcion</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Estado</li>
                                                <li class="list-group-item">Cantidad de capitulos leidos</li>
                                                <li class="list-group-item">Link de donde lo leyo</li>
                                            </ul>
                                        
                                        </div>`
        mangasdiv.appendChild(mangaContenido)
                                    
        }
    }