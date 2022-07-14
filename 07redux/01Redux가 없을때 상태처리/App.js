import React, {Component} from 'react';
import './App.css';

import AddNumberRoot from './components/AddNumberRoot';
import DisplayNumberRoot from './components/DisplayNumberRoot';

class App extends Component {
  //state 선언 및 초기화
  state = {rootNumber : 10}
  render(){
    return (
      <div className="App">
          <h2>Root 컴포넌트</h2>
          {/* 1Depth의 컴포넌트로 props를 전달한다. 매개변수로 받은 값을 통해
          state의 rootNumber와 더한 결과를 반영한다. */}
          <AddNumberRoot addNumberClick={(addNum)=>{
            this.setState({
              rootNumber : this.state.rootNumber + addNum
            });
          }}></AddNumberRoot>
          {/* state로 선언한 rootNumber를 props를 통해 자식으로 전달한다. */}
          <DisplayNumberRoot subNumber={this.state.rootNumber}></DisplayNumberRoot>
      </div>
    );
  }
}
export default App;
