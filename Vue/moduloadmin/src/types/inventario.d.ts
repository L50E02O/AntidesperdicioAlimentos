import {Producto} from "./producto";

export interface Inventario {
    id_inventario: number;
    fecha_actualizacion: string;
    cantidad_total: number;
    valor_inventario: number;
    productos: Producto[]
}