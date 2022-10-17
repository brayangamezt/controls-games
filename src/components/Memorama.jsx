import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import '../assets/css/memorama.css';
import Card from './Card';
import Menu from './Menu';
import {images} from '../imports';

const Memorama = () => {
  const [cards, setCards]=useState([]);
  const [firstCard,setFirstcard]=useState({});
  const [secondCard, setSecondcard]=useState({});
  const [counter, setCounter]=useState(0);
  const [second, setSecond] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [winner,setWinner]=useState(false);
  const [loser, setLoser]=useState(false);
  const [begin,setBegin]=useState(false);
  
  const [unFlippedCard, setUnFlippedCard]=useState([]);
  const [disabledCards, setDisabledCards]=useState([]);

  useEffect( ()=>{
    shuffleArray(images);
    setCards(images); //Cuando se renderice el componente se van a colocar las cartas
  },[]);

  useEffect( ()=>{
    checkingMatch();
  },[secondCard] );

  useEffect( ()=>{
    let interval;
    if(isActive){
      interval=setInterval( ()=>{
        if(counter === 6 && second > 0){
          setWinner(true);
        }else if(counter < 6 && second === 0){
          setLoser(true);
        }
        if(second > 0){
          setSecond(second - 1);
        }
      },1000 );
    }
    return ()=>{clearInterval(interval)}
  },[isActive,second] );

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  //Evitar voltear la misma carta hasta que volteemos las dos
  const flipcard=(name,number)=>{
    if(firstCard.name === name && firstCard.number === number){
      return 0; //Quiere decir que estoy volteando la misma carta
    }
    if(!firstCard.name){
      setFirstcard({name,number});
    }else if(!secondCard.name){
      setSecondcard({name,number});
    }
    return 1;
  }

  const checkingMatch=()=>{
    let match=null;
    if(firstCard.name && secondCard.name){
      match=firstCard.name === secondCard.name;
      match ? disabledCard() : unflipCards();
      if(match){
        setCounter(counter + 1);
      }
    }
  }

  const disabledCard=()=>{
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCard();
  }

  const unflipCards=()=>{
    setUnFlippedCard([firstCard.number, secondCard.number]);
    resetCard();
  }

  const resetCard=()=>{
    setFirstcard({});
    setSecondcard({});
  }

  const resetLoser=()=>{
    setCounter(0);
    setSecond(25);
    setIsActive(false);
    setLoser(false);
    setBegin(false);
  }

  const resetWinner=()=>{
    setCounter(0);
    setSecond(25);
    setIsActive(false);
    setWinner(false);
    setBegin(false);
  }

  const start=()=>{
    setIsActive(true);
    setBegin(true);
  }

  return (
    <React.Fragment>
      <Menu/>
      <div className='container'>
        <div className='timer'>
          {
            second >=10 ?
            <div>
              Quedan {second} segundos
            </div>
            :
            <div>
              Queda {second} segundo
            </div>
          }
        </div>
        {
          begin &&
          <div className='card-container'>
            {
              cards.map( (card, index)=>{
                return(<Card name={card.name} number={index} frontFace={card.src} key={index} flipcard={flipcard}  unflippedcard={unFlippedCard} disabledcard={disabledCards}/>)
              } )
            }
          </div>
        }
        {
          winner && 
          <div className='winner'>
            <div className='congratulations'>
              <p id='exit'><span onClick={()=>{resetWinner()}}>X</span></p>
              <div className='trophy-container'><FontAwesomeIcon icon={faTrophy} className="trophy" /></div>
              <p className='congratulations-winner'>Congratulations you WIN !</p>
            </div>
          </div>
        }
        { loser &&
          <div className='loser'>
            <div className='loser-text'>
              <p id='exit'><span onClick={()=>{resetLoser()}}>X</span></p>
              <div className='loser-container'><FontAwesomeIcon icon={faCircleXmark} className="circle"/></div>
              <p className='sorry-text'>Sorry you have lost :( </p>
            </div>
          </div>
        }
        <button onClick={()=>{start()}}>Empezar</button>
      </div>
    </React.Fragment>
  )
}

export default Memorama