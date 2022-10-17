import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

//Importacion de componentes
import App from './App';
import Error from './components/Error'
import Memorama from './components/Memorama';
import Tictac from './components/Tictac';
import Sudokucell from './components/Sudokucell';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/tictactoe" element={<Tictac/>} />
            <Route path='/memorama' element={<Memorama/>}/>
            <Route path='/sudoku' element={<Sudokucell/>}/>
            <Route path="*" element={<Error/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;