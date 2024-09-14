import React from 'react'
import Header from './components/Header';
import FoodProvider from './context/FoodContext';
import Meals from './components/Meals';

function App() {
  return (
    <FoodProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </FoodProvider>
      
  );
}

export default App;
