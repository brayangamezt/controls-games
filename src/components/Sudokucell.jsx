import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import '../assets/css/sudokucell.css';
import Menu from './Menu';

const facil=[//Numero cinco del libro
[-1,-1,8,-1,4,-1,3,5,-1],
[-1,-1,-1,-1,-1,3,-1,-1,8],
[-1,-1,-1,5,-1,-1,2,9,-1],
[-1,-1,4,-1,-1,7,1,2,-1],
[1,-1,9,-1,2,-1,-1,4,3],
[2,7,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,3,-1,9,4,-1,-1],
[6,-1,2,-1,-1,-1,-1,-1,9],
[7,-1,-1,2,8,-1,-1,-1,-1],
]

const medio=[ //Numero uno del libro
[-1,-1,2,-1,-1,-1,4,-1,-1],
[-1,-1,-1,3,-1,6,-1,-1,-1],
[6,-1,-1,-1,1,-1,-1,-1,8],
[-1,3,-1,8,-1,4,-1,7,-1],
[-1,-1,9,-1,5,-1,2,-1,-1],
[-1,4,-1,6,-1,3,-1,9,-1],
[5,-1,-1,-1,8,-1,-1,-1,7],
[-1,-1,-1,7,-1,2,-1,-1,-1],
[-1,-1,1,-1,-1,-1,9,-1,-1],
]

const dificil=[ //Numero nueve del libro
[-1,5,-1,9,-1,-1,-1,6,-1],
[-1,-1,-1,5,-1,-1,-1,9,2],
[-1,-1,7,-1,-1,-1,-1,-1,-1],
[-1,-1,4,1,-1,7,5,-1,-1],
[-1,6,-1,8,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,5,-1,4,-1],
[9,-1,-1,-1,-1,1,6,-1,7],
[-1,4,3,-1,2,-1,-1,-1,9],
[-1,7,-1,-1,-1,-1,3,8,-1],
]

const Sudokucell = () => {

  const [easy,setEasy]=useState(true);
  const [medium,setMedium]=useState(false);
  const [hard, setHard]=useState(false);
  const [facilEstado, setFacilEstado]=useState(getDeepCopy(facil));
  const [medioEstado, setMedioEstado]=useState(getDeepCopy(medio));
  const [dificilEstado, setDificilEstado]=useState(getDeepCopy(dificil));


  const nivelFacil=()=>{
    setEasy(true);
    setMedium(false);
    setHard(false);
  }

  const nivelMedio=()=>{
    setMedium(true);
    setEasy(false);
    setHard(false);
  }

  const nivelDificil=()=>{
    setHard(true);
    setEasy(false);
    setMedium(false);
  }

  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  const onChangeInputEasy=(e, row, column)=>{
    let val=parseInt(e.target.value) || -1, grid= getDeepCopy(facilEstado);
    //El valor deberia ser en un rango entre 1-9 y vacio para -1
    if(val === -1 || val >=1 && val<=9){
      grid[row][column]=val;
    }
    setFacilEstado(grid);
  }

  const onChangeInputMedium=(e,row,column)=>{
    let val=parseInt(e.target.value) || -1, grid= getDeepCopy(medioEstado);
    //El valor deberia ser en un rango entre 1-9 y vacio para -1
    if(val === -1 || val >=1 && val<=9){
      grid[row][column]=val;
    }
    setMedioEstado(grid);
  }

  const onChangeInputHard=(e,row,column)=>{
    let val=parseInt(e.target.value) || -1, grid= getDeepCopy(dificilEstado);
    //El valor deberia ser en un rango entre 1-9 y vacio para -1
    if(val === -1 || val >=1 && val<=9){
      grid[row][column]=val;
    }
    setDificilEstado(grid);
  }


  //CHECANDO VALIDACIONES DE NUMEROS DEL SUDOKU EN FILAS, COLUMNAS 
  const checkRow=(grid,row,num)=>{
    return grid[row].indexOf(num) === -1;
  }

  const checkCol=(grid, col, num)=>{
    return grid.map( row=> row[col]).indexOf(num)=== -1;
  }

  const checkBox=(grid , row, col, num)=>{
    //Obteniendo el numero inicial de cada caja
    let boxArr=[],
    rowStart=row - (row % 3),
    colStart= col - (col % 3);
    for(let i=0; i<3; i++){
      for(let j=0; j<3 ; j++ ){
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }

    return boxArr.indexOf(num) === -1;
  }


  const checkValid=(grid, row,col, num)=>{
    if(checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)){
      return true;
    }
    return false;
  }



  const getNext=(row,col)=>{
    return col !== 8 ? [row,col +1] : row !=8 ? [row + 1, 0] : [0,0];
  }



  const solver=(grid, row=0, col=0)=>{
    
    //Si la celda actual esta llena, mover a la siguiente
    if(grid[row][col] !== -1){

      let isLast = row >= 8 && col >=8;

      if(!isLast){
        let [newRow, newCol]=getNext(row,col);
        return solver(grid, newRow, newCol);
      }
    }

    for(let num=1; num <=9; num++){
      if(checkValid(grid, row, col, num)){ //Llenar el numero en la celda 
        grid[row][col]=num;
        let [newRow, newCol]=getNext(row,col);
        if(!newRow && !newCol){
          return true;
        }
        if(solver(grid, newRow, newCol)){
          return true;
        }
      }
    }

    //Si es invalido llenar con -1
    grid[row][col]= -1;
    return false;
  }

  //Funcion para comparar sudokus
  const compareSudoku=(currentSudoku, solvedSudoku)=>{
    let res={isCompleted: true, isSolved:true};
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(currentSudoku[i][j] != solvedSudoku[i][j]){
          if(currentSudoku[i][j] != -1){
            res.isSolved=false;
          }
          res.isCompleted=false;
        }
      }
    }
    return res;
  }


  const resultadoEnviado=()=>{ //COMPROBAR SI EL SUDOKU ES CORRECTO

    if(easy){
      let sudoku=getDeepCopy(facil);
      console.log(sudoku);
      solver(sudoku);
      let compare=compareSudoku(facilEstado, sudoku);
      if(compare.isCompleted){
        alert('CONGRATULATIONS, YOU DID IT');
      }else if(compare.isSolved){
        alert('KEEP GOING!');
      }else{
        alert('SUDOKU CANT BE RESOLVED TRY AGAIN');
      }

    }else if(medium){
      let sudoku=getDeepCopy(medio);
      solver(sudoku);
      let compare=compareSudoku(medioEstado, sudoku);
      if(compare.isCompleted){
        alert('CONGRATULATIONS, YOU DID IT');
      }else if(compare.isSolved){
        alert('KEEP GOING!');
      }else{
        alert('SUDOKU CANT BE RESOLVED TRY AGAIN');
      }

    }else if(hard){
      let sudoku=getDeepCopy(dificil);
      solver(sudoku);
      let compare=compareSudoku(dificilEstado, sudoku);
      if(compare.isCompleted){
        alert('CONGRATULATIONS, YOU DID IT');
      }else if(compare.isSolved){
        alert('KEEP GOING!');
      }else{
        alert('SUDOKU CANT BE RESOLVED TRY AGAIN');
      }
    }
  }

  const solvedSudoku=()=>{ //VER LAS RESPUESTAS DEL SUDOKU
    if(easy){
      let sudoku=getDeepCopy(facil);
      solver(sudoku);
      setFacilEstado(sudoku);
    }else if(medium){
      let sudoku=getDeepCopy(medio);
      solver(sudoku);
      setMedioEstado(sudoku);
    }else if(hard){
      let sudoku=getDeepCopy(dificil);
      solver(sudoku);
      setDificilEstado(sudoku);
    }
  }

  const borrarTabla=()=>{ //BORRAR EL SUDOKU
    if(easy){
      let sudoku=getDeepCopy(facil);
      setFacilEstado(sudoku);
    }else if(medium){
      let sudoku=getDeepCopy(medio);
      setMedioEstado(sudoku);
    }else if(hard){
      let sudoku=getDeepCopy(dificil);
      setDificilEstado(sudoku);
    }
  }

  return (
    <div>
      <Menu/>
      <h1 style={{textAlign:'center', marginTop:'10px'}}>Sudoku agilmente</h1>
      <div className='buttons-container'>
        <button className='facil' onClick={nivelFacil}>Facil</button>
        <button className='medio' onClick={nivelMedio}>Medio</button>
        <button className='dificil' onClick={nivelDificil}>Dificil</button>
      </div>
      <div className='sudoku-container'>
        <table>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map( (row,Rindex)=>{
                return <tr key={Rindex} className={ (row + 1) % 3 === 0 ? 'makingBord' :  ''} >
                  {
                    [0,1,2,3,4,5,6,7,8].map( (column, Cindex)=>{
                      return  <CeldaTabla key={Cindex} className={ (column + 1) % 3 === 0 ? 'makingColum' :  ''} > 
                          {
                            easy &&
                            <input value={ facilEstado[row][column]=== -1 ? '' : facilEstado[row][column] } 
                                   disabled={facil[row][column] !== -1} 
                                   className='inputCell'
                                   onChange={ (e)=>onChangeInputEasy(e, row, column) }
                            />
                          }
                          {
                            medium &&
                            <input value={ medioEstado[row][column]=== -1 ? '' : medioEstado[row][column] } 
                                    disabled={medio[row][column] !== -1}  
                                    className='inputCell'
                                    onChange={ (e)=>onChangeInputMedium(e, row, column) }
                            />
                          }
                          {
                            hard &&
                            <input value={ dificilEstado[row][column]=== -1 ? '' : dificilEstado[row][column] } 
                                   disabled={dificil[row][column] !== -1} 
                                   className='inputCell'
                                   onChange={ (e)=>onChangeInputHard(e, row, column) }
                            />
                          }
                      </CeldaTabla>
                    } )
                  }
                </tr>
              } )
            }
          </tbody>
        </table>
        <div className='buttons-verify'>
          <button onClick={resultadoEnviado} className='send-result'>Enviar resultado</button>
          <button onClick={solvedSudoku} className="solve-sudoku">Resolver</button>
          <button onClick={borrarTabla} className="reset-result">Borrar tabla</button>
        </div>
      </div>
    </div>
  )
}

const CeldaTabla=styled.td`
  width:35px;
  height:35px;
  border:none;
`;


export default Sudokucell;