import React, {Component} from 'react';
//store를 임포트한다.
import store from "../store";

/* 
리덕스를 사용하므로 props를 통해 전달된 값이 아니라 스토어에 정의된
데이터를 이용해야 한다. store.getState() 함수를 통해 리덕스 스토어에 
정의된 number를 가져올 수 있다. 
*/
export default class DisplayNumber extends Component {
    
    //store의 값을 통해 해당 컴포넌트의 state를 변경한다.
    state = {number : store.getState().number}

    constructor(props){
        super(props);
        /* 
        스토어의 state값이 변경되는지를 통보받을 수 있도록 구독한다.
        구독은 subscribe() 함수로 구현한다. 즉, 스토어의 state가 변경되면
        자동으로 호출되어 값을 얻어올 수 있다.
        */
        store.subscribe(()=>{
            this.setState(
                {number : store.getState().number}
            )
        });
    }
    render(){
        return (
            <div>
                <h4>숫자 출력(Depth2)</h4>
                <input type="text" className="disInput" value={this.state.number}
                    readOnly ></input>
            </div>
        );
    }
}

