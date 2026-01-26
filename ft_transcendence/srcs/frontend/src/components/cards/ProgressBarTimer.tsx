import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ProgressBarTimer = () => {
  const [counter, setCounter] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const [key, setKey] = useState(0); // To re-render the timer

  const restart = () => {
    setCounter(60);
    setIsActive(true);
    // Increment the key to re-render the timer
    setKey((prevKey) => prevKey + 1);
  };

  const clear = () => {
    setCounter(0);
    setIsActive(false);
    // Increment the key to re-render the timer
    setKey((prevKey) => prevKey + 1);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setIsActive(false);
      return <div className="timer">Time's Up!...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Time</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  useEffect(() => {
    let timer;
    if (isActive && counter > 0) {
      timer = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else if (!isActive && counter !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [counter, isActive]);

  const AddTenSeconds = () => {
    if (counter <= 50) {
      setIsActive(false); // Pause the timer before updating the counter
      setCounter((prevCounter) => (prevCounter = prevCounter + 10));
      // setIsActive(true);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const SkipFiveSeconds = () => {
    if (counter >= 5) {
      setIsActive(false); // Pause the timer before updating the counter
      setCounter((prevCounter) => (prevCounter = prevCounter - 5));
      console.log(counter);
      setKey((prevKey) => prevKey + 1);
      // setIsActive(true);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Routine Starts in...</h1>
        <h3>Progressbar Timer</h3>
      </div>
      <div key={key} id="pomodoro-timer" className="Progressbar">
        <CountdownCircleTimer
          onComplete={() => setIsActive(false)}
          isPlaying={isActive}
          duration={counter}
          colors={"#004777"}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div>
        <button onClick={AddTenSeconds}>ADD (+10 seconds)</button>
        <button onClick={SkipFiveSeconds}>SKIP (-5 Seconds)</button>
        <button onClick={restart}>Re-start</button>
        <button onClick={clear}>CLEAR</button>
      </div>
    </div>
  );
};

export default ProgressBarTimer;
