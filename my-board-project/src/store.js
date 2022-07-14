/* 
리덕스(Redux)
    -리엑트 생태계에서 가장 사용률이 높은 상태관리 라이브러리
    -컴포넌트들의 깊이(Depth)에 상관없이 스토어(store)를 통해 효율적인 관리가
    가능하다.

리듀서(Reducer)
    -변화를 일으키는 함수를 말한다.
    -state(현재의 상태), action(전달 받은 액션) 두가지의 파라미터를 받아온다.
디스패치(Dispatch)
    -스토어의 내장함수로 액션을 발생시킨다.
    -액션과 타입 등을 매개변수로 전달한다.
구독(Subscribe)
    -스토어의 내장함수로 함수 형태의 값을 전달하면 파라미터로 받아온다.
    -subscribe 함수에 특정 함수를 전달하면, 액션이 디스패치 될때마다 전달해준
    함수가 호출된다.
*/

//createStore 모듈 임포트
import { legacy_createStore as createStore } from "redux";

/* 
createStore()는 첫번째 매개변수로 reducer 함수를 사용한다.
reducer 함수는 2개의 매개변수로 
    state : 데이터
    action : 데이터를 수정할 수 있는 여러가지 액션을 정의한다.
*/
export default createStore(function(state, action){
    //만약 state가 undefined 이라면 number를 0으로 초기화한다.
    if(state===undefined){
        return {number:0}
    }
    //인수로 전달된 action.type이 INCREMENT 라면 두 숫자(state와 인수)를 더해서
    //state를 변경한다.
    if(action.type==='INCREMENT'){
        /* 
        기존 state의 모든값을 객체에 그대로 적용하되 number의 값만 변경한다.
        이런 문법을 '구조분해할당'이라고 한다.
        */
        return {...state, number:state.number + action.size}
    }
    return state;
})