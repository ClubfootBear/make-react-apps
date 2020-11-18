import React, {useRef, useState} from 'react';
import './App.css';

function padTime(t){
    return  t.toString().padStart(2,'0')
}


export default function App() {
    const [title, setTitle] = useState('Let start countdown!');
    const [timeLeft, setTimeLeft] = useState(13);
    const [isRunning, setIsRunning] = useState(false);

    const intervalIdRef = useRef(null);

    const startTimer = () => {
        if (intervalIdRef.current !== null) return;
        setIsRunning(true);
        intervalIdRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                // return timeLeft >= 1 ? timeLeft - 1 : 0;
                if (timeLeft >= 1) return timeLeft - 1;
                resetTimer();
                return 0;
            });
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalIdRef.current === null) return;

        clearInterval(intervalIdRef.current)
        intervalIdRef.current = null
        setIsRunning(false)
    }

    const resetTimer = () => {
        clearInterval(intervalIdRef.current)
        setTimeLeft(13)
        intervalIdRef.current = null
        setIsRunning(false)
    }


    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime(timeLeft - 60 * minutes);


  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
          {!isRunning && <button onClick={startTimer}>Start</button>}
          {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
