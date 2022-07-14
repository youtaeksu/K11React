import React, { Component } from "react";

//게시물 수정을 위한 수정폼 컴포넌트
class UpdateForm extends Component {
    /* 
    수정폼 컴포넌트로 전달된 데이터를 수정하기 위해서는 state를 통한 변경만 가능하다.
    따라서 props로 전달된 값을 <input>에 직접 입력하는 방식이 아닌, state를 초기화하고
    state를 <input>에 입력하는 방식으로 처리한다. 
    */
    //생성자 추가 및 state 생성
    constructor(props){
        super(props);
        //부모 컴포넌트인 App.js에서 props를 통해 전달해준 게시물로 state를 초기화한다.
        //state는 게시물을 수정을 위해 필요한 일련번호, 제목, 내용으로 구성된다.
        this.state = {
            id : this.props.readData.id,
            title : this.props.readData.title,
            desc : this.props.readData.desc
        }
    }
    
    /* 
    각 <input> 상자에 입력한 내용이 있을때 state값을 변경하기 위해 선언한 함수로
    setState() 함수를 통해 값을 변경한다. 이벤트 객체를 통해 <input> 상자의 name, value
    속성을 얻어와 지정된값을 변경한다.
    이때 대괄호 표기법을 사용한다.
    */
    inputChangeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    render(){
        return (
        <article>
            <h2>Update</h2>
            <form action="/create_process" method="post" onSubmit={(e)=>{
                    e.preventDefault();
                    //부모에서 전달할 props를 통해 폽값을 전송한다. 즉 부모 컴포넌트로 전달한다.
                    this.props.onSubmitValue(
                        e.target.id.value,
                        e.target.title.value,
                        e.target.desc.value
                    );
                }
            }>
                {/* 기존 게시물에 대한 수정이므로 게시물 아이디(일련번호)를 저장할 hidden박스가
                필요하다. */}
                <input type="hidden" name="id" value={this.state.id} />
                {/* 수정폼 이므로 value속성에 기존에 입력된 값을 삽입해야 하지만, 일반적인
                방식을 사용하면 React가 props로 인식하여 수정이 불가능한 상태가 된다.
                즉 "value=기존값" 과 같이 사용할 수 없다. */}

                {/* 부모 컴포넌트인 App.js에서 기존 게시물을 props로 전달한 후 input 상자에
                즉시 삽입하면, 기존 게시물을 출력할 수는 있으나 역시나 수정은 불가능하다.
                props는 읽기전용 데이터이므로 값의 변경은 state를 통해서만 가능하기때문이다. */}

                {/* input 상자의 value값은 state로 변경한다. 값 변경시 onChange이벤트 리스너를
                통해 함수가 호출되고, 이를 통해 입력값에 대한 변경이 state에 적용된다. */}
                <p><input type="text" name="title" placeholder="제목입력" 
                        value={this.state.title}
                        onChange={this.inputChangeHandler} /></p>
                <p><textarea name="desc" placeholder="내용입력"
                        value={this.state.desc}
                        onChange={this.inputChangeHandler}></textarea></p>
                <p><input type="submit" value="전송" /></p>
            </form>
        </article>
        );
    }
}

export default UpdateForm;