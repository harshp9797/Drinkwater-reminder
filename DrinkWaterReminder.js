import React, { useState, useEffect } from 'react';

function DrinkWaterReminder() {
  const [timeInterval, setTimeInterval] = useState('');
  const [reminders, setReminders] = useState([]);
  const [notification, setNotification] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const handleInputChange = (event) => {
    setTimeInterval(event.target.value);
  };

  const addReminder = () => {
    if (timeInterval.trim() === '') {
      alert('Please enter a valid time interval');
      return;
    }

    setReminders([...reminders, timeInterval]);
    setTimeInterval('');
  };

 




const startReminder = () => {
  if (reminders.length === 0) {
    alert('Please add at least one reminder');
    return;
  }

  const showAlert = (text) => {
    window.alert(text);
  };

  let currentIndex = 0;

  const interval = setInterval(() => {
    currentIndex++;
    if (currentIndex < reminders.length) {
     
      setCountdown(reminders[currentIndex] * 60);
    } else {
      clearInterval(interval);
      setCountdown(null);
      showAlert('Time to drink water!');
      setReminders([]);
      
    }
  }, reminders[currentIndex] * 60 * 1000);

  showAlert('Time is been added !');
  setCountdown(reminders[currentIndex] * 60);
};







  const incrementWaterIntake = () => {
    setWaterIntake(waterIntake + 1);
  };

useEffect(() => {
  if (countdown === null) return;

  const timer = setInterval(() => {
    setCountdown((prevCountdown) => {
      if (prevCountdown <= 0) {
        clearInterval(timer);
        return null;
      }
      return prevCountdown - 1;
    });
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [countdown]);



  return (
    <div className="container">
      <h1 className="title">Drink Water Reminder</h1>
      <div className="input-container">
        <input
          type="number"
          placeholder="Time interval (in minutes)"
          value={timeInterval}
          onChange={handleInputChange}
          className="time-input"
          min="0"
        />
      
        <button onClick={addReminder} className="add-btn">Add Reminder</button>
      </div>
      <div className="reminder-list">
        <h2>Reminders</h2>
        <ul>
          {reminders.map((interval, index) => (
            <li key={index}>{interval} minutes</li>
          ))}
        </ul>
      </div>
      {countdown && <p className="countdown">Next reminder in: {countdown} seconds</p>}
      {notification && <p className="notification">{notification}</p>}
      <button onClick={startReminder} className="start-btn">Start Reminder</button>
      <div className="water-intake">
        <h2>Water Intake</h2>
        <p>{waterIntake} cups</p>
        <button onClick={incrementWaterIntake} className="add-intake-btn">Add Water Intake</button>
      </div>
    </div>
  );
}

export default DrinkWaterReminder;
