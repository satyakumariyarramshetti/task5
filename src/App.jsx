import React, { useState } from 'react';
import { FaBackspace } from 'react-icons/fa';
import { FaHistory } from "react-icons/fa";
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [histDisp, setHistDisp] = useState([]);
  const [theme, setTheme] = useState('light'); // Initial theme state
  const [inputColor, setInputColor] = useState('white'); // Initial input field color state

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const evaluateExpression = () => {
    try {
      const expression = input;
      const result = eval(expression);
      setHistory([...history,`${expression} = ${result}`]);
      setResult(result);
      setInput(result.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(0);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const showHistory = () => {
    if(history!=''){
    setHistDisp(history.join('\n'));}
    else{
      setHistDisp('Empty')
    }
  };

  const closeHistory = () => {
    setHistDisp('');
  };
  const clearHistory=()=>{
     setHistDisp([])
     setHistory([])

  }
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setInputColor(newTheme === 'light' ? 'white' : '#333');
    localStorage.setItem('theme', newTheme); // Save theme preference in localStorage
  };

  // On component mount, retrieve the theme from localStorage (if exists)
 

  return (
    
    <div className="calculator">
          <div className={`App ${theme}`}>
          <button onClick={toggleTheme} className='change'>Change Theme</button>


      <input
        type="text"
        className="input-field"
        value={input}
        name="input"
        onChange={handleInputChange}
        placeholder="Enter expression"
        style={{ backgroundColor: inputColor, color: theme === 'light' ? '#333' : 'white' }}
      />
    
      <div className="history">
        <pre>{histDisp}</pre>
        {histDisp && <><button onClick={closeHistory}>Close</button> <button onClick={clearHistory}>Clear</button></>}
      </div>
      <div className="button-row">
        <button onClick={evaluateExpression}>=</button>
        <button onClick={clearInput}>A/C</button>
        <button onClick={handleBackspace}>
          <FaBackspace />
        </button>
        <button onClick={showHistory}><FaHistory /></button>
      </div>
        
      <div className="keypad">
        <div className="keypad-row">
          <button onClick={() => setInput(input + '7')}>7</button>
          <button onClick={() => setInput(input + '8')}>8</button>
          <button onClick={() => setInput(input + '9')}>9</button>
          <button onClick={() => setInput(input + '/')}>/</button>
          
        </div>
        <div className="keypad-row">
          <button onClick={() => setInput(input + '4')}>4</button>
          <button onClick={() => setInput(input + '5')}>5</button>
          <button onClick={() => setInput(input + '6')}>6</button>
          <button onClick={() => setInput(input + '*')}>*</button>
        </div>
        <div className="keypad-row">
          <button onClick={() => setInput(input + '1')}>1</button>
          <button onClick={() => setInput(input + '2')}>2</button>
          <button onClick={() => setInput(input + '3')}>3</button>
          <button onClick={() => setInput(input + '-')}>-</button>
        </div>
        <div className="keypad-row">
          <button onClick={() => setInput(input + '0')}>0</button>
          <button onClick={() => setInput(input + '.')}>.</button>
          <button onClick={() => setInput(input + '%')}>%</button>
          <button onClick={() => setInput(input + '+')}>+</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
