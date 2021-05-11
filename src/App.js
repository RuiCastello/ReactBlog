import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // Caso o servidor esteja a servir esta app num subendereço do tipo example.com/my-app, então temos de mudar aqui o basename do router para "/my-app"
      // <BrowserRouter basename="/my-app">
      <BrowserRouter basename="/blogapp">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
