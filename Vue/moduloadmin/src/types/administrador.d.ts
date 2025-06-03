export interface Administrator {
  id_administrador: number;
  nombre: string;
  apellido: string;
  correo: string;
  // password no se suele retornar en la API después del login
}

