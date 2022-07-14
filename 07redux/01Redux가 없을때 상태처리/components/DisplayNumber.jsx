import React, {Component} from 'react';

export default class DisplayNumber extends Component {
    render(){
        return (
            <div>
                <h4>숫자 출력(Depth2)</h4>
                {/* 부모로부터 전달받은 props를 value속성으로 추가한다. */}
                <input type="text" className="disInput" value={this.props.subNumber2}
                 readOnly ></input>
            </div>
        );
    }
}

