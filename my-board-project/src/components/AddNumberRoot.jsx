import React, {Component} from 'react';
import AddNumber from "../components/AddNumber";

export default class AddNumberRoot extends Component {
    render(){
        return (
            <div>
                <h3>숫자 증가(Depth1)</h3>
                {/* props를 제거한다. */}
                <AddNumber></AddNumber>
            </div>
        );
    }
}

