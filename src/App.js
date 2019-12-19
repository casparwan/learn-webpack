import React, { Component } from 'react';
import Home from './pages/home';
import About from './pages/about';
class App extends React.Component {
    render() {
      const a = 5;
      return (
        <div>
          {a > 4 ?<h1>app</h1> : 3}
          <Home />
          <About />
        </div>
      );
    }
  }
export default App;