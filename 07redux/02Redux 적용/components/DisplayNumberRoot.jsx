import React, {Component} from 'react';
import DisplayNumber from '../components//DisplayNumber';

export default class DisplayNumberRoot extends Component {
    render(){
        return (
        <div>
            <h3>숫자 출력(Depth1)</h3>
            {/* props를 제거한다 */}
            <DisplayNumber></DisplayNumber>
        </div>
        );
    }
}

