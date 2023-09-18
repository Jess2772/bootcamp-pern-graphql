import React, { useState } from 'react';
import Title from './components/Title';
import DisplayContainer from './components/DisplayContainer';
import AddRestaurant from './components/AddRestaurant';
import Navbar from './components/Navbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <Title teamName="your_team_name" />
      <Navbar setCurrentPage={setCurrentPage} />

      {currentPage === 'home' && <DisplayContainer />}
      {currentPage === 'add' && <AddRestaurant />}
    </div>
  );
}

export default App;