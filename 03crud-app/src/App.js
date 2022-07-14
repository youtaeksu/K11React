//해당 문서에서 React기능을 사용하기 위해 import한다.
import React, {Component} from 'react';
import './App.css';

/* 
외부 js파일로 모듈화한 컴포넌트에 해당 문서로 import 하기 위한 구분으로,
각 컴포넌트의 마지막에 지정한 "export default 컴포넌트명"을 그대로 사용한다.
형식] import 변수로 사용할 이름(별칭) from '컴포넌트경로'
*/
import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';
import Buttons from './components/Buttons';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';


/* 
함수형 컴포넌트 대신 클래스형 컴포넌트를 사용해서 CRUD앱을 제작한다.
클래스형 컴포넌트 제작시 CDN방식에서는 React.Component를 상속하지만 웹팩방식에서는
아래와 같이 상속하면 된다. React는 상단 import구문에서 이미 정의되어 있기때문이다.
*/
class App extends Component {
  constructor(props) {
    super(props);

    /* 
    게시물의 일련번호 부여를 위한 시퀀스 용도의 변수 생성.
    현재 state의 contents에 3개의 게시물(객체)가 저장되어 있으므로 초기값은
    3으로 지정하였다. 새로운 게시물을 작성할때마다 +1 처리한다.
    */
    this.max_content_id = 3;
    this.state = {
      subject: { title: 'WEB(st)', sub: 'World Wide Web(st)' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML은 내용을 출력합니다.' },
        { id: 2, title: 'CSS', desc: 'CSS는 스타일을 지정합니다.' },
        { id: 3, title: 'JavaScript', desc: "JS는 화면을 동적으로 제어합니다." }
      ],
      mode: 'welcome',
      welcome: { title: 'Welcome', desc: 'Hello, React..!!' },
      selected_content_id: 2,
    }
  }
  render() {
    /*
    Step2 : props는 컴포넌트 추가시 HTML의 속성처럼 추가하는 부분으로 해당 컴포넌트에서
    사용시에는 "this.props.프롭스명"으로 기술하면 된다.
    Step4 : 생성자에서 state를 생성한 후 기존의 문자열을 state값으로 변경한다.
    Step5 : Navi를 클릭했을때 해당 내용으로 변경하기 위해 state에 mode, welcome을 추가한다.
      현재 mode가 welcome이라면 환영메세지를 출력하고, read라면 해당 컨텐츠를 출력할 것이다. 
    Step7 : Navi를 클릭할때 mode를 변경하기 위해 selected_content_id를 state에 추가한다.
    */

    //제목, 내용, mode에 따른 컴포넌트 구분용 변수 선언
   let _title, _desc, _article = null;

   /* 
   비교연산자 == 은 값만 동일한지 비교한다.
   === 은 값과 타입까지 동일한지 비교하는 연산자이다. ES6의 권장사항이다.
   개발자모드에서 state를 read로 변경해본다.
   */
   if (this.state.mode === 'welcome') {
     //해당 애플리케이션을 처음 시작했을때 환영메세지를 출력
     _title = this.state.welcome.title;
     _desc = this.state.welcome.desc;
     //웹 애플리케이션을 처음 실행했을때는 mode가 welcome으로 지정되므로 내용을 출력한다.
     _article = <Content title={_title} desc={_desc}></Content>;
   }
   else if (this.state.mode === 'read') {
     //Navi의 각 링크를 클릭했을때 해당 항목의 타이틀과 제목을 출력

     //_title = this.state.contents[0].title;
     //_desc = this.state.contents[0].desc;

     //선택한 항목을 출력하기 위해 반복문을 통해 선택한다.
     var i = 0;
     while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        _title = data.title;
        _desc = data.desc;
        break;
      }
      i++
     }
     //mode가 read인 경우에도 내용이 출력되어야 한다.
     _article = <Content title={_title} desc={_desc}></Content>;
   }
   else if(this.state.mode==='create'){
    //mode가 create일때는 입력상태이므로 입력폼을 출력한다.
    //onSubmitValue 라는 속성을 통해 자식으로 2개의 값을 전달받을수 있는 props를 전달한다.
    _article = <CreateForm onSubmitValue={function(_title, _desc){
      //전달받은 폼값을 로그로 출력한다.
      console.log(_title, _desc);

      //일련번호(id) 부여를 위해 +1 증가
      this.max_content_id = this.max_content_id + 1;
      /* 
      새롭게 생성한 일련번호, 폼값으로 전송된 제목과 내용으로 새로운 객체를
      생성한 후, concat() 함수를 통해 state의 contents에 추가한다.
      concat() 함수는 배열을 추가하여 새로운 배열을 만드는 기능을 가지고 있다.
      */
      var _contents = this.state.contents.concat(
        {id:this.max_content_id, title:_title, desc:_desc}
      );
      
      /* 
      state값을 변경하고 새롭게 렌더링하여 화면을 다시 로드한다.
      앞에서 추가한 배열로 교체한 후 새롭게 입력한 게시물을 read하기 위해 
      아래 2개의 값도 같이 변경해준다.
      */
      this.setState({
        contents : _contents,
        mode : 'read',
        selected_content_id : this.max_content_id
      });
    }.bind(this)}></CreateForm>;
   }
   else if(this.state.mode==='update'){

    /*
    기존의 내용을 읽어오기 위해 선택한 게시물의 일련번호에서 1을 차감한 후
    index로 사용하고 있다. 이 부분은 게시물을 삭제하는 경우 문제가 발생한다.
    (차후 수정 예정)
    */
    //let _readData = this.state.contents[this.state.selected_content_id-1];
    let _readData;

    let i = 0;
    //contents의 갯수만큼 반복한다.
    while (i < this.state.contents.length){
      //증가하는 i값을 통해 배열의 항목을 가져온다.
      var data = this.state.contents[i];
      //현재 조회중인 게시물 번호(selected_content_id)와 배열의 저장된 id값이 일치하면...
      if (data.id === this.state.selected_content_id){
        //해당 게시물을 변수에 저장한다.
        _readData = data;
        //게시물을 찾았다면 즉시 반복문을 탈출한다.
        break;
      }
      i++
    }


    //게시물 수정을 위한 수정폼 컴포넌트 추가. 현재 조회중인 게시물을 props로 전달한다.
    //수정폼에서 작성한 폼값을 전달받기 위한 props도 전달한다.
    _article = <UpdateForm readData={_readData}
      onSubmitValue={function(_id, _title, _desc){
      //전송된 폼값을 확인
      console.log(_id, _title, _desc)

      //기존의 배열을 복사하기 위해 Array.from()을 사용한다.
      var _contents = Array.from(this.state.contents);

      //수정할 게시물의 id에서 1을 차감한 배열의 인덱스를 통해 수정된 객체를 저장한다.
      //수정된 객체를 폼값으로 전송된 값으로 새롭게 생성한 JSON객체이다.
      //_contents[this.state.selected_content_id-1]
      //  = {id:Number(_id), title:_title, desc:_desc}; -> 인덱싱에 문제있음
      var i = 0;
      //복사한 배열의 갯수만큼 반복한다.
      while(i < _contents.length){
        //복사한 배열에서 i번째 원소를 가져온다.
        var data = _contents[i];
        //배열의 id값과 수정폼에서 전송한 값을 비교한다.
        if(data.id === Number(_id)){
          //일치하는 id가 있으면 해당 인덱스에 수정할 객체를 추가한다.
          _contents[i] = {id:Number(_id), title:_title, desc:_desc};
          break;
        }
        i++;
      }
      //변경된 배열을 state에 적용한 후 렌더링한다. 특히 mode를 read로 변경하여
      //수정된 내용을 즉시 확인할 수 있다.
      this.setState({
        contents : _contents,
        mode : 'read'
      });
    }.bind(this)}></UpdateForm>;
   }
   return (
      <div className="App">
        {/* Subject 컴포넌트로 onChangePage라는 props를 전달한다. 자식에서 호출시 
        mode를 welcome으로 변경하는 역할을 한다. */}
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
        onChangePage={function(){
          //alert("이벤트 확인용(부모)");
          this.setState({mode:'welcome'});
        }.bind(this)}
        ></Subject>
        {/* Navi 컴포넌트로 onChangePage라는 props를 전달한다. 자식에서 호출시 
          mode를 read로 변경하고, 매개변수로 전달된 값으로 selected_content_id를 변경한다. */}
        <Navi data={this.state.contents}
          onChangePage={function(id){
            //alert('이벤트 확인용(Navi)');
            this.setState({
              mode : 'read',
              selected_content_id : Number(id)
            });
          }.bind(this)}
          ></Navi>


        {/* mode값을 변경할 수 있는 기능을 onChangeMode라는 props로 자식에게 전달한다. */}
        <Buttons onChangeMode={function(btn_mode){
          if(btn_mode==='delete'){
            //리엑트에서는 confirm() 사용시 window를 반드시 붙여야한다.
            if(window.confirm('삭제할까요?')){
              //기존의 배열을 복사한다.
              var _contents = Array.from(this.state.contents);
              var i = 0;
              //복사한 배열에서 삭제할 id값을 가진 원소를 찾는다.
              while(i<_contents.length){
                if(_contents[i].id===this.state.selected_content_id){
                  //splice()를 통해 i번째 원소 1개를 삭제한다.
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              /*
              게시물을 삭제하면 더이상 read 할 수 없으므로 welcome으로 변경한다.
              또한 삭제된 배열의 복사본을 state에 적용한다.
              */
              this.setState({
                mode : 'welcome',
                contents : _contents
              });
            }
          }
          else{
            //mode가 delete가 아닐때는 단순히 state를 변경해준다.
            this.setState({
              mode : btn_mode
          });
        }
      }.bind(this)}></Buttons>
        
      {_article}
      </div>
    );
  }
}
export default App;
