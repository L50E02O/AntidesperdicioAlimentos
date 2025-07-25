import { render, screen, fireEvent } from '@testing-library/vue';
import ProductoRow from '../src/components/inventario/ProductoRow.vue';

describe('ProductoRow', ()=>{
    const props = {
        nombre: "Manzana",
        descripcion: "Esta manzana es roja y sabe a manzana",
        precio: 0.20,
        stock: 5
    };

    it('muestra los datos del producto', ()=>{
        render(ProductoRow, { props });
        expect(screen.getByText(props.nombre)).toBeInTheDocument();
        expect(screen.getByText(props.descripcion)).toBeInTheDocument();
        expect(screen.getByText(`$ ${props.precio}`)).toBeInTheDocument();
        expect(screen.getByText(props.stock)).toBeInTheDocument();
    });

    it('emite el evento editar al hacer click', async ()=>{
        const {emitted} = render(ProductoRow, { props });
        const btnEditar = screen.getByText('Editar');
        await fireEvent.click(btnEditar);
        expect(emitted().editar).toBeTruthy()
    });

    it('emite evento eliminar al hacer click', async () => {
        const { emitted } = render(ProductoRow, { props })
        const btnEliminar = screen.getByText('Eliminar')
        await fireEvent.click(btnEliminar)
        expect(emitted().eliminar).toBeTruthy()
    })
});