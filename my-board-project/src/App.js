import React, {Component} from 'react';
import './App.css';

import AddNumberRoot from './components/AddNumberRoot';
import DisplayNumberRoot from './components/DisplayNumberRoot';

class App extends Component {
  state = {rootNumber : 10}
  render(){
    return (
      <div className="App">
          <h2>Root 컴포넌트</h2>
          {/* 기존의 모든 props를 제거한다. */}
          <AddNumberRoot></AddNumberRoot>
          <DisplayNumberRoot></DisplayNumberRoot>
      </div>
    );
  }
}
export default App;
