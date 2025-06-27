export interface Administrator {
  id_administrador: string;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  // password no se suele retornar en la API después del login
}

