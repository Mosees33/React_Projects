// import logo from './logo.svg';
import './App.css';
import Result from './Result';
import { useState } from 'react';
const secretNumber = Math.floor(Math.random() * 10) + 1

function App() {
  const [ Term,setTerm ] = useState({})

  const handleChange = (e) =>{
    setTerm(e.target.value)
  }

  return (
    <div className="container">
      <div className='head'>
         <label htmlFor='term'>
          Guess the number between 1 to 10 
          </label>
      </div>
      <input
      id='term'
      name='term'
      type='text'
      onChange={handleChange}
      />
      <Result secretNumber = {secretNumber} Term = {Term}/>
    </div>
  );
}

export default App;
