import React, { Component } from "react";

class Subject extends Component {
    render(){
        /* 
        Subject 컴포넌트 렌더링시 속성으로 추가한 내용을 props로
        얻어와서 출력한다.
        */
        return (
            <header>
                <h1><a href="/" onClick={function(e){
                    //링크를 클릭할경우 화면의 깜빡임이 없도록 호출한다.
                    e.preventDefault();
                    //부모에서 props로 전달해준 이벤트 함수를 실행한다.
                    this.props.onChangePage();
                    //일반함수를 사용하는 경우 반드시 this와 bind()해줘야한다.
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;