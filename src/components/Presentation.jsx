import React from 'react';
import Typed from 'typed.js';
import { useEffect } from 'react';
import '../assets/css/presentation.css';
import gift from '../assets/images/GamezPlaying.png';
import Menu from './Menu';


const Presentation = () => {
  useEffect(() => {
    const tipo = new Typed('.typed', {
      strings: [
        '<i class= "my-information">Have fun</i>',
        '<i class= "my-information">Have a good time</i>',
        '<i class= "my-information">enjoy it !!</i>'
      ],
      stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
      typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
      startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
      backSpeed: 95, // Velocidad en milisegundos para borrrar una letra,
      smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
      shuffle: false, // Alterar el orden en el que escribe las palabras.
      backDelay: 2000, // Tiempo de espera despues de que termina de escribir una palabra.
      loop: false, // Repetir el array de strings
      loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
      showCursor: false, // Mostrar cursor palpitanto
      contentType: 'html', // 'html' o 'null' para texto sin formato
    })
  }, []);
  return (
    <React.Fragment>
      <Menu/>
      <div className='welcome'>
        <div className='greet'>
          <p className='main-header'>Let´s play mini games</p>
          <p className='main-description'>This place is to <span className='typed'></span></p>
          <iframe src="https://embed.lottiefiles.com/animation/11447"></iframe>
        </div>
        <div className='games'>
          <img src={gift} alt="imagen" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Presentation
