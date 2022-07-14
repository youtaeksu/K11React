import React, {Component} from 'react';
/* 
2Depth에 AddNumber 컴포넌트를 자식으로 포함하고 있다.
*/
import AddNumber from "../components/AddNumber";

export default class AddNumberRoot extends Component {
    render(){
        return (
            <div>
                <h3>숫자 증가(Depth1)</h3>
                {/* 자식 컴포넌트로 addNumberClick2 기능의 props를 전달한다. 
                매개변수로 전달받은 값을 부모(App컴포넌트)로 전송한다. */}
                <AddNumber addNumberClick2={(aNum)=>{
                    this.props.addNumberClick(aNum);
                }}></AddNumber>
            </div>
        );
    }
}

