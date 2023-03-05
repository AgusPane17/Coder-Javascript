class manga{
    constructor(nombre,imagen, descripcion, estado, cantCapitulosLeidos, genero, puntuacion,numero,cantMaximaCap){
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.estado = estado; //los estado son finalizado o en emision
        this.cantCapitulosLeidos = cantCapitulosLeidos;
        this.genero = genero;
        this.puntuacion = puntuacion;
        this.numero = parseInt(numero)
        this.cantMaximaCap = cantMaximaCap
    }




    agregarManga(){
        let arrayMangas = JSON.parse(localStorage.getItem("arrayMangas"))
        arrayMangas.push(this);
        localStorage.setItem("arrayMangas", JSON.stringify(arrayMangas));
    }
    
    
}