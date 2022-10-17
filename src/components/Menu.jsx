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
        <li><NavLink to='/controls-games' className="menu">Home</NavLink></li>
        <li><NavLink to='/controls-games/tictactoe' className="menu">Tic-Tac-Toe</NavLink></li>
        <li><NavLink to='/controls-games/memorama' className="menu">Memorama</NavLink></li>
        <li><NavLink to='/controls-games/sudoku' className="menu">Sudoku</NavLink></li>
      </ul>
    </header>
  )
}

export default Menu