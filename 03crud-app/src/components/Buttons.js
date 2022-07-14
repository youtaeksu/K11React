import React, { Component } from "react";

class Buttons extends Component {
    render(){
        /* React에서 Style을 지정할 경우 {} 표현식 안에 JSON형태로 속성과 값을
        지정해야 한다. 따라서 중첩된 중괄호를 사용하게된다.
        list-style-type 속성을 통해 기본 블릿을 제거한다. */
        return (
        /*
            이벤트 리스너에 일반함수를 사용하는 경우 반드시 bind()함수를 사용해야한다.
            하지만 화살표 함수를 사용하면 bind() 없이도 정상적인 작동이 된다.
            일반함수를 사용하면 호출한 객체에 따라 this가 달라지므로 해당 엘리먼트를
            찾이 못하기 때문에 에러가 발생한다.
        */
        <ul>
            <li style={{listStyleType:'none'}}>
                <input type="button" value="create" onClick={(e)=>{
                    e.preventDefault();
                    this.props.onChangeMode('create');
                    }}
                />
                <input type="button" value="update" onClick={(e)=>{
                    e.preventDefault();
                    this.props.onChangeMode('update');
                    }}
                />
                <input type="button" value="delete" onClick={(e)=>{
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                    }}
                />
            </li>
        </ul>
        );
    }
}
export default Buttons;
