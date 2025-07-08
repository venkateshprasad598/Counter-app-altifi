import { useEffect, useState } from 'react';
import './App.css';
import { useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const counterRef = useRef(null);

  const handleStart = () => {
    !isRunning && setIsRunning(true);
    isPause && setIsPause(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setCount(0);
  };

  const handlePause = () => {
    if(!isPause){
      setIsPause(true);
      setIsRunning(false);
    }else{
      setIsPause(false);
      setIsRunning(true);
    }
  };

  const handleRestart = () => {
    setIsRunning(false);
    setCount(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) {
      counterRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev == 10) {
            clearTimeout(counterRef.current);
            setIsRunning(false);
            return prev;
          } else {
            return prev + 1;
          }
        });
      }, [1000]);
    }

    return () => clearTimeout(counterRef.current);
  }, [isRunning]);

  return (
    <div>
      <p>{count}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handleStart}> Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handlePause}>{isPause ? 'Resume' : 'Pause'}</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
