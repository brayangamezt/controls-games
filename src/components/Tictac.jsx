import {React , useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';



import '../assets/css/tictactoe.css';
import Menu from './Menu';

const Tictac = () => {
  const [turn, setTurn]=useState('X');
  const [cells, setCells]=useState(Array(9).fill(null));//Creo un array de 9 valores y seran llenados por el vacio
  const [winner,setWinner]=useState(null);
  const [congratulation,setCongratulation]=useState(false);

  const cleanCongratulation=()=>{
    setCongratulation(false);
  }

  const Winner=()=>{
    let posibilities=[ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    for(let combo of posibilities){
      const [a,b,c]=combo;
      if(cells[a] && cells[b] && cells[c]){
        if(cells[a] === cells[b] && cells[a] === cells[c] && cells[b] === cells[c]){
          setWinner(turn);
          setCongratulation(true);
        }
      }
    }

  }

  const clickBord=(number)=>{
    if(cells[number]){ //Si la celda ya fue cliqueada
      alert('cells already clicked!');
      return
    }

    if(!cells[number] && winner){
      alert(`The player ${winner} already won`);
      return
    }

    if(turn ==='X'){
      cells[number]='X';
      setTurn('O');
    }else{
      cells[number]='O';
      setTurn('X');
    }
    Winner();
  }

  const resetGame=()=>{
    setCells(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  }

  const Bord=({number, cells})=>{
    return(
        <td onClick={()=>clickBord(number)} > {cells[number]} </td>
    )
  }

  return (
      <div>
        <Menu/>
        <div className='tictac-container'>
          <h1>Tic tac toe</h1>
          <p>Player turn: {turn}</p>
          <p>The winner is: {winner}</p>
          <table>
            <tbody>
              <tr>
                <Bord number={0} cells={cells}/>
                <Bord number={1} cells={cells}/>
                <Bord number={2} cells={cells}/>
              </tr>
              <tr>
                <Bord number={3} cells={cells}/>
                <Bord number={4} cells={cells}/>
                <Bord number={5} cells={cells}/>
              </tr>
              <tr>
                <Bord number={6} cells={cells}/>
                <Bord number={7} cells={cells}/>
                <Bord number={8} cells={cells}/>
              </tr>
            </tbody>
          </table>
          <button onClick={()=>resetGame()}>Reset Game</button>
          {
            congratulation && 
            <div className='overlay'>
              <div className='popup'>
                <p id='exit'><span onClick={()=>cleanCongratulation()}>X</span></p>
                <div className='trophy-container'><FontAwesomeIcon icon={faTrophy} className="trophy" /></div>
                <div className='congratulation-container'>
                  <p className='congratulations'>Player {winner} is the winner !</p>
                </div>
              </div>
            </div>
          }
         </div>
      </div>
  )
}

export default Tictac