export interface RespuestaBD {
  personajes: [];
  noticias: [];
}
export interface Personaje {
  nombre: string;       
  imagen: string;       
  descripcion: string;  
  accesorios: string;  
}
export interface Noticia {
  titulo: string;
  imagen: string;
  descripcion: string;
  fecha: string;
}