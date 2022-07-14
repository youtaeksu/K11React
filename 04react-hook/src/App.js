/*
React Hook(훅)
  : 리엑트 기본 버전에서는 간단한 기능을 제작할때는 함수를 사용했다.
  이유는 state를 변경하는것이 클래스형 컴포넌트에서만 가능했기 때문이다.
  하지만 16.8 버전부터 Hook을 통해 함수형 컴포넌트에서도 state를 변경할 수 
  있게 되었다.
  React Hook은 useXXX() 와 같은 이름의 함수를 사용하고, 이를 위해 별도의
  import가 필요하다.
*/
import React, {useState, useEffect} from 'react';
import './App.css';

//최상위 컴포넌트로 함수형으로 선언됨.
function App() {
  return (
    <div className="App">
        <h1>Class vs Function Style</h1>
        {/* 함수형, 클래스형 컴포넌트 모두 props로 2를 전달한다. */}
        <FuncComponent initNumber={2}></FuncComponent>
        <ClassComponent initNumber={2}></ClassComponent>
    </div>
  );
}
/* 
함수형 컴포넌트
  : 출력할 내용을 즉시 return하면 된다. 함수 자신이 render() 함수의 역할을
  하므로 별도로 선언하지 않아도 된다.
*/
function FuncComponent(props){

  /* 
  함수형 컴포넌트에서는 return이 render()의 역할을 하므로 특정함수를 호출하거나
  해서 렌더링 전에 전처리를 할 수 없다.
  */
  console.log('#Life1#', 'FuncComponent==>함수실행');

  /* 
  함수형 컴포넌트에서는 useState()라는 훅을 통해 state를 설정 및 변경한다.
  useState()의 매개변수로 2가 전달되므로 이를 통해 설정하면 
  0번째 원소는 인자로 전달된 값(상태값)이 되고
  1번째 원소는 state값을 변경할 수 있는 함수가 된다.
  */
  var numberState = useState(props.initNumber);
  console.log("numberState", numberState);
  var number = numberState[0];//설정된 state값
  var setNumber = numberState[1];//state를 변경할 수 있는 함수
  
  /* 
  함수형 컴포넌트에서는 state가 추가될때마다 Hook을 통해 변수를 추가생성해야한다.
  */
  var dateState = useState((new Date()).toString());
  //var nowDate = dateState[0];//값
  //var setDate = dateState[1];//함수
  //==>반환값이 배열이므로 위 코드를 아래와같이 변경할 수 있다.
  var [nowDate, setDate] = useState((new Date()).toString());

  
  /* 
  해당 함수형 컴포넌트가 렌더링 된 후 자동으로 호출된다. 해당 함수는 첫번째 인자로
  반드시 무기명함수를 사용해야 한다.
  클래스형 컴포넌트는 마운팅단계와 업데이트단계에서 사용하는 별도의 수명주기 함수가 있지만
  함수형에서는 별도로 존재하지 않는다.
  */
  useEffect(function(){
    console.log('#Life3#','FuncComponent==>useEffect');
  });

  /* 
  함수형 컴포넌트에서는 return이 될때 화면이 렌더링된다.
  따라서 useEffect()보다 이 부분이 먼저 실행된다.
  */
  console.log('#Life2#','FuncComponent==>return실행(render와동일)');
  return (
    <div className="container">
      <h2>function형 컴포넌트</h2>

      {/* useState()를 통해 반환된 첫번째 원소인 state값을 출력한다. */}
      <p>initNumber : {number}</p>
      
      <p>날짜 : {nowDate}</p>
      {/* useState()를 통해 반환된 두번째 원소를 통해 state값을 변경한다.
      클릭할때마다 생성된 난수로 state값을 변경한다. */}
      <input type="button" value="난수생성" onClick={function(){
        setNumber(Math.random());
      }} />
      {/* 함수형 컴포넌트에서는 state값을 변경하기 위해 this를 사용할 필요가 없으므로
      어떤 형식의 함수를 사용하더라도 bind()를 할 필요가 없다. */}
      <input type="button" value="현재날짜" onClick={function(){
        setDate((new Date()).toString());
      }} />
    </div>
  );
}
/* 
클래스형 컴포넌트
  : React.Component를 상속해서 선언한다. 수명주기 함수중 render()
  를 필수로 기술해야 한다. 
*/
class ClassComponent extends React.Component {
  /* 
  state의 초기값으로 props를 사용하고 있다.
  props는 부모가 자식컴포넌트에게 전달해준 일종의 파라미터로 "this.props.프롭스명"
  으로 사용한다.

  클래스형 컴포넌트에서 2개이상의 state가 필요한 경우 컴마로 구분하여 추가하면 된다.
  */
  state = {
    number : this.props.initNumber,
    nowDate : (new Date()).toString()
  }

  /* 
  render()가 호출되기 전에 호출되는 수명주기 함수이다.
  getDerivedStateFromProps()라는 함수도 있는데, render가 호출되기 전에
  전달된 props를 통해 state를 변경하는 역학을 한다. 또한 반드시 반환값이 있어야한다.
  */
  UNSAFE_componentWillMount(){
    console.error("ClassComponent => componentWillmount() 호출됨");
  }
  //render()가 호출된 후 자동 호출되는 수명주기 함수
  componentDidMount(){
    console.error("ClassComponent => componentDidMount() 호출됨");
  }
  /* 
  최초 렌더링시에는 호출되지 않고, state값이 변경되어 렌더링이 다시 될때
  호출된다. 해당 함수에서 true가 반환될때만 render()가 호출된다.
  만약 false를 반환하면 화면이 갱신되지 않는다.
  */
  shouldComponentUpdate(){
    console.error("ClassComponent => shouldComponentUpdate() 호출됨");
    let rNum = Math.round(this.state.number*100) % 2;
    if(rNum===0){
      return true;
    }
    else{
      console.log("홀수는 랜더링 안됨");
      return false;
    }
  }
  render(){
    return (
      <div className="container">
      <h2>class형 컴포넌트</h2>
      {/* state 출력시 "this.state.스테이트명" 과 같이 기술한다. */}
      <p>initNumber : {this.state.number}</p>
      <p>날짜 : {this.state.nowDate}</p>
      {/* 클래스형 컴포넌트에서는 state변경시 setState()를 사용한다. 아래의 버튼은
      누를때마다 0~1사이의 난수가 생성되고, 이 값을 통해 state를 변경한다. */}
      <input type="button" value="난수생성" onClick={()=>{
        this.setState({number : Math.random()});
      }} /> 



      {/* 일반 함수를 사용할때는 반드시 this와 bind()해줘야 한다. 하지만
      화살표함수(Arrow function)을 사용하면 별도의 바인딩이 필요없다. */}
      <input type="button" value="현재날짜" onClick={()=>{
          this.setState({nowDate : (new Date()).toString()});
        }
      }/>
    </div>
    );
  }
}
export default App;


