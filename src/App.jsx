import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [moverType, setMoverType] = useState('');
  const [selectedMover, setSelectedMover] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterMoverModal, setShowRegisterMoverModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCount, setConfirmCount] = useState(0);

  const handleRegister = () => {
    // Implement registration logic here
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowRegisterMoverModal(false);
  };

  const handleLogin = () => {
    // Check if email and password are non-empty and have a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }

    // Implement login logic here
    // For this example, we'll assume successful login if email and password are not empty
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleMoverTypeSelection = (type) => {
    setMoverType(type);
    setCurrentPage('movers');
  };

  const handleMoverSelection = (mover) => {
    setSelectedMover(mover);
    setCurrentPage('chat');
    setConfirmCount(0);
  };

  const handleConfirm = () => {
    setConfirmCount(confirmCount + 1);
    if (confirmCount === 1) {
      setCurrentPage('date');
    }
  };

  const handleDateSelection = (date) => {
    setDate(date);
    setCurrentPage('time');
  };

  const handleTimeSelection = (time) => {
    setTime(time);
    setCurrentPage('payment');
  };

  const handleHomeClick = () => {
    if (showLoginModal) {
      setShowLoginModal(false); // Close the login modal if it's open
    }
    if (showRegisterMoverModal) {
      setShowRegisterMoverModal(false); // Close the register as mover modal if it's open
    }
    setCurrentPage('home'); // Navigate back to the home page
  };

  const renderPage = () => {
    if (showLoginModal) {
      return (
        <div className="login-modal">
          <div className="login-modal-content">
            <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
            <h2>Login/Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      );
    }

    if (showRegisterMoverModal) {
      return (
        <div className="register-mover-modal">
          <div className="register-mover-modal-content">
            <span className="close" onClick={() => setShowRegisterMoverModal(false)}>&times;</span>
            <h2>Register as Mover</h2>
            {/* Add form fields for mover registration */}
            <button onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'movers':
        return (
          <MoversPage
            moverType={moverType}
            onMoverTypeSelection={handleMoverTypeSelection}
            onMoverSelection={handleMoverSelection}
          />
        );
      case 'chat':
        return <ChatPage mover={selectedMover} onConfirm={handleConfirm} />;
      case 'date':
        return <DateSelectionPage onDateSelection={handleDateSelection} />;
      case 'time':
        return <TimeSelectionPage date={date} onTimeSelection={handleTimeSelection} />;
      case 'payment':
        return <PaymentPage mover={selectedMover} date={date} time={time} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <header>
        <nav>
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={() => setCurrentPage('movers')}>Movers</button>
          <button onClick={() => setShowLoginModal(true)}>Login/Register</button>
          <button onClick={() => setShowRegisterMoverModal(true)}>Register as Mover</button>
          {isLoggedIn ? (
            <span>Logged In</span>
          ) : null}
        </nav>
      </header>
      <main>{renderPage()}</main>
    </div>
  );
}

// ... (Other components remain the same)

// Component for the Movers Page
const MoversPage = ({ moverType, onMoverTypeSelection, onMoverSelection }) => {
  const [showMoverTypeSelection, setShowMoverTypeSelection] = useState(true);

  const movers = [
    { id: 1, name: 'Mover A', averagePrice: 50, rating: 4.5 },
    { id: 2, name: 'Mover B', averagePrice: 60, rating: 4.2 },
    { id: 3, name: 'Mover C', averagePrice: 70, rating: 4.8 },
  ];

  if (showMoverTypeSelection) {
    return (
      <div>
        <h2>Select Mover Type</h2>
        <button onClick={() => {
          onMoverTypeSelection('few-items');
          setShowMoverTypeSelection(false);
        }}>
          Move a Few Items
        </button>
        <button onClick={() => {
          onMoverTypeSelection('house');
          setShowMoverTypeSelection(false);
        }}>
          Move House
        </button>
        <button onClick={() => {
          onMoverTypeSelection('heavy-items');
          setShowMoverTypeSelection(false);
        }}>
          Remove Heavy Items
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Select a Mover for {moverType}</h2>
      {movers.map((mover) => (
        <div key={mover.id} className="mover-card">
          <h3>{mover.name}</h3>
          <p>Average Price: ${mover.averagePrice}</p>
          <p>Rating: {mover.rating}</p>
          <button onClick={() => onMoverSelection(mover)}>Select</button>
        </div>
      ))}
    </div>
  );
};

// Component for the Chat Page
const ChatPage = ({ mover, onDateSelection }) => {
  const handleDateSelect = (date) => {
    onDateSelection(date);
  };

  return (
    <div>
      <h2>Chat with {mover.name}</h2>
      {/* Implement chat functionality here */}
      <button onClick={() => handleDateSelect('2023-06-01')}>Select Date</button>
    </div>
  );
};

// Component for the Time Selection Page
const TimeSelectionPage = ({ date, onTimeSelection }) => {
  const handleTimeSelect = (time) => {
    onTimeSelection(time);
  };

  return (
    <div>
      <h2>Select a Time for {date}</h2>
      {/* Implement time selection functionality here */}
      <button onClick={() => handleTimeSelect('10:00 AM')}>10:00 AM</button>
      <button onClick={() => handleTimeSelect('2:00 PM')}>2:00 PM</button>
    </div>
  );
};

// Component for the Payment Page
const PaymentPage = ({ mover, date, time }) => {
  return (
    <div>
      <h2>Payment</h2>
      <p>Mover: {mover.name}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      {/* Implement payment functionality here */}
    </div>
  );
};

export default App;
