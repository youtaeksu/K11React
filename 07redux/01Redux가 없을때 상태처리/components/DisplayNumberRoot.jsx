import React, {Component} from 'react';
import DisplayNumber from '../components//DisplayNumber';

export default class DisplayNumberRoot extends Component {
    render(){
        return (
            <div>
            <h3>숫자 출력(Depth1)</h3>
            {/* App컴포넌트로부터 받은 props를 자식 컴포넌트로 다시 전달한다. */}
            <DisplayNumber subNumber2={this.props.subNumber}></DisplayNumber>
        </div>
        );
    }
}

