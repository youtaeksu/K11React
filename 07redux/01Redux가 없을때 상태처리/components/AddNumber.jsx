import React, {Component} from 'react';

export default class AddNumber extends Component {
    //state 선언 및 초기화
    state = {adder : 1}
    render(){
        return (
            <div>
                <h4>숫자 증가 Form(Depth2)</h4>
                <p>숫자를 변경한 후 증가 버튼을 누르세요.</p>
                {/* state값을 value로 지정하고, 값의 변화가 있을때 state에 즉시 적용한다. */}
                <input type="number" className="addInput" value={this.state.adder}
                    onChange={(e)=>{
                        //Event객체를 통해 input상자에 입력된 값을 얻어올 수 있다.
                        this.setState(
                            {adder:Number(e.target.value)}
                        );
                    }
                }></input>
                {/* 1Depth의 부모 컴포넌트가 props를 통해 전달해준 이벤트객체를 통해 
                현재의 state값을 매개변수로 전달한다. */}
                <input type="button" className="addBtn" value="증가" 
                    onClick={()=>{
                        this.props.addNumberClick2(this.state.adder);
                    }
                }></input>
            </div>
        );
    }
}
