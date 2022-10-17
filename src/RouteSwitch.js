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
            <Route path="/controls-games/" element={<App/>} />
            <Route path="/controls-games/tictactoe" element={<Tictac/>} />
            <Route path='/controls-games/memorama' element={<Memorama/>}/>
            <Route path='/controls-games/sudoku' element={<Sudokucell/>}/>
            <Route path="*" element={<Error/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch;