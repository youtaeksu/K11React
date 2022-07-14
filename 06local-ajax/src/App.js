import React, { Component } from 'react';
import './App.css';

//Nav컴포넌트를 모듈화
class Nav extends Component {
  //state선언. Nav의 링크를 추가할 예정임.
  state = {
    list : []
  }
  /* 
  수명주기 함수 중 render()가 호출되어 화면이 렌더링된 직후에 호출된다.
  컴포넌트를 초기화할때 네트워크 통신을 하기에 적합하다.
  */
  componentDidMount(){
    console.log("componentDidmount 호출됨");
    //비동기 통신을 위한 fetch()함수를 호출한다. 내부에 작성된 JSON파일을 사용한다.
    fetch('list.json')
      .then(function(result){
        //요청에 성공한 경우 콜백데이터를 반환한다.
        return result.json();
      })
      .then(function(json){
        //앞의 then절에서 반환한 값이 해당 then절로 전달된다.
        console.log(json);
        //반환값을 통해 state값을 재설정한다.
        this.setState({list:json});
      }.bind(this));
  }
  //랜더링을 처리하는 함수
  render(){
    console.log("render 호출됨");
    //네비의 반복되는 <li>태그를 저장할 배열
    var listTag = [];
    //state의 list의 크기만큼 반복
    for(var i=0 ; i<this.state.list.length ; i++){
      //해당 인덱스의 항목을 가져온다.
      var li = this.state.list[i];
      //배열의 끝에 <li>태그를 추가한다.
      listTag.push(
        //반복되는 li태그에 중복되지 않는 key prop을 추가한다.
        <li key={li.id}>
          {/* 이벤트 객체를 통해 값을 전달하기 위해 data-id속성을 추가한다. */}
          <a href={li.id} data-id={li.id} onClick={(e)=>{
            //화면의 깜빡임 차단
            e.preventDefault();
            console.log("링크 클릭함");
            //부모쪽에서 props를 통해 전달해준 이벤트를 통해 id를 전달한다.
            this.props.myLinkClick(e.target.dataset.id);
          }}>{li.title}</a>
        </li>
      );
    }
    return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    );
  }
}

//Article 컴포넌트 모듈화
class Article extends Component {
  //부모 컴포넌트부로부터 props를 받아 출력
  render(){
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  //앱에 첫 진입시에는 환영인사가 출력된다. 이 부분을 state로 선언한다.
  state = {
    article:{title:'Welcome', desc:'Hello, Ajax..!!'}
  }
  render(){
    return (
      <div className="App">
        <h1>WEB</h1>
        <Nav myLinkClick={(id)=>{
          /* 
          Nav링크를 클릭하는 경우 전달되는 id값을 통해 JSON파일을 fetch()로
          읽은 후 state를 변경해준다.
          */
          fetch(id+'.json')
          .then(function(result){
            return result.json();
          })
          .then(function(json){
            /* 
            JSON에서 읽어온 내용으로 state를 변경한다. state가 변경되면 render()가
            재호출되면서 화면이 갱신된다.
            */
            this.setState({
              article : {title:json.title,desc:json.desc}
            });
          }.bind(this));
        }}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
      </div>
    );
  }
}
export default App;
