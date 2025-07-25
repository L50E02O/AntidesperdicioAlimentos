import { render, screen, fireEvent } from '@testing-library/vue'
import ResumenCard from '../src/components/dashboard/ResumenCard.vue'

describe('ResumenCard', () => {
  const props = {
    titulo: 'Habilitados',
    subtitulo: 'Establecimientos',
    textoBoton: 'Ver todos'
  }

  it('muestra los textos de las props', () => {
    render(ResumenCard, { props })
    expect(screen.getByText(props.titulo)).toBeInTheDocument()
    expect(screen.getByText(props.subtitulo)).toBeInTheDocument()
    expect(screen.getByText(props.textoBoton)).toBeInTheDocument()
  })

  it('emite el evento boton-click al hacer click en el botón', async () => {
    const { emitted } = render(ResumenCard, { props })
    const boton = screen.getByText(props.textoBoton)
    await fireEvent.click(boton)
    expect(emitted()['boton-click']).toBeTruthy()
  })

  it('muestra el icono por defecto si no se pasa slot', () => {
    render(ResumenCard, { props })
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('muestra el icono del slot si se pasa', () => {
    render(ResumenCard, {
      props,
      slots: {
        icono: '<span>🛒</span>'
      }
    })
    expect(screen.getByText('🛒')).toBeInTheDocument()
  })
}) 