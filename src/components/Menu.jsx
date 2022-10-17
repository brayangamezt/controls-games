import React from 'react';
import {NavLink} from 'react-router-dom';
import '../assets/css/menu.css';
import imagenLogo from '../assets/images/GAMEZ-Playing.png';

const Menu = () => {
  return (
    <header>
      <div className='logo'>
        <img src={imagenLogo} alt="LOGO" style={{width:'100px', heigth:'80px'}} />
      </div>
      <ul>
        <li><NavLink to='/' className="menu">Home</NavLink></li>
        <li><NavLink to='/tictactoe' className="menu">Tic-Tac-Toe</NavLink></li>
        <li><NavLink to='/memorama' className="menu">Memorama</NavLink></li>
        <li><NavLink to='/sudoku' className="menu">Sudoku</NavLink></li>
      </ul>
    </header>
  )
}

export default Menu