/* 
react-router-dom
  : React는 기본적으로 화면의 새로고침 없이 화면을 갱신한다. 이경우 주소가
  하나로 고정되기 때문에 즐겨찾기와 같은 기능을 사용할 수 없다.
  어떤 주소로 들어왔을때 그 주소를 알아내어 그에 해당하는 컴포넌트를 렌더링하고,
  그 상태를 광리하기 위해 내부적으로 state나 props를 관리할 수 있게 해주는
  도구가 react-router-dom 이다.

라우팅이란?
  : 사용자가 어떤 주소로 들어왔을때 그 주소에 해당하는 적당한 페이지
  즉 컴포넌트를 사용자측으로 렌더링해주는것을 말한다.

BrowserRouter
  : 리엑트 라우터 돔을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는
  Wrapper(래퍼)로 사용한다.

Route
  : URL에 따른 적당한 컴포넌트를 렌더링 하기 위해 사용하는 컴포넌트이다.
  Route는 Routes로 전체를 감싸야 한다.

Link
  : 링크를 걸때 주로 <a> 태그를 사용하지만 클릭할때마다 페이지가 새롭게 로딩되어
  새로고침되므로 적합하지 않다. Link는 클릭할때 페이지가 리로드(reload) 되지 않도록
  처리해준다.

NavLink
 : Link와 동일한 기능을 제공하지만, 추가적으로 class속성을 해당 엘리먼트에 
 삽입해준다. 따라서 스타일을 적용할 수 있다.
*/
import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from "react-router-dom"
import { useLocation, useSearchParams } from "react-router-dom"


function Home(){
  /* 
  요청URL 뒤의 쿼리스트링 전체를 얻어올 때 사용하는 훅(Hook)이다.
  웹URL?a=1&b=eng&c=안녕"과 같다면 ? 뒤의 모든 쿼리스트링을 얻어온다.
  */
  const location = useLocation();

  /* 
  const [쿼리스트링 값, 쿼리스트링을 설정하기 위한 함수] = useSearchParams();
  특정 쿼리스트링의 값을 얻어올때는 get()함수를 사용한다.
  */
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');
  const onToggleDetail = () => {
    setSearchParams({mode, detail: detail==='true' ? false : true});
    /* 
    두번째 반환값인 setSearchParams() 함수를 통해 쿼리스트링을 설정할 수 있다.
    위와 같이 기술하면 "현재의요청URL?mode=mode값&detail=detail값" 와 같이
    쿼리스트링이 설정된다.
    */
  }
  const onIncreaseMode = () => {
    /* 
    쿼리스트링 중 detail은 그대로 사용하고, mode값만 +1한 결과값을 설정한다.
    */
    const nextMode = (mode===null || isNaN(mode)) ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode : nextMode, detail });
  }
  return (
    <div>
      <h2>Home</h2>
      Home컴포넌트
      <div>
        <p>쿼리스트링 : {location.search}</p>
        <p>detail : {detail}</p>
        <p>mode : {mode}</p>
        <button onClick={onToggleDetail}>Toggle detail</button>
        <button onClick={onIncreaseMode}>mode + 1</button>
      </div>
    </div>
  );
}

/* 
Topics 컴포넌트에서 메뉴로 사용하기 위해 JSON객체 형태의 변수 생성.
객체가 하위 객체를 포함한 형태로 생성.
*/
const menuObject = {
  free : {title:'자유게시판', desc:'<h2>자유게시판 리스트</h2>'},
  qna : {title:'질문과답변', desc:'<h2>질문과답변 리스트</h2>'},
  faq : {title:'자주묻는질문', desc:'<h2>자주묻는질문 리스트</h2>'},
};

//일반함수 형태의 컴포넌트
function Topics(){
  //<li>태그를 포함한 링크를 추가하기 위한 배열 변수 생성
  let menuArray = [];
  //앞에서 선언한 JSON객체의 크기만큼 반복
  for(var menu in menuObject){
    //배열의 끝에 원소를 하나씩 추가해주는 push()함수를 통해 메뉴 추가
    /* 
    <li> 혹은 <td>와 같이 반복되는 엘리먼트를 사용하는 경우 React에서는 중복되지
    않는 "Key"라는 이름의 prop을 요구한다. 이 부분이 충족되지 않으면 Warning이 뜨게된다.
    일반적으로 PK로 지정된 일련번호를 주로 사용한다.
    */
    menuArray.push(
      <li key={menu}>
        <NavLink to={"/Topics/"+menu}>{menuObject[menu].title}</NavLink>
      </li>
    );
  }
  return (
    <div>
      <h2>Topics</h2>
      Topics컴포넌트
      <ul>
        {/* <li><NavLink to="/Topics/free">자유게시판</NavLink></li>
        <li><NavLink to="/Topics/qna">질문과답변</NavLink></li>
        <li><NavLink to="/Topics/faq">자주묻는질문</NavLink></li> */}
        {menuArray}
      </ul>
      {/* <Outlet>을 사용하지 않는 경우 중첩 처리 */}
      {/* <Desc /> */}

      {/* 중첩 라우팅을 사용한느 경우 자식 컴포넌트로 선언된 객체를 렌더링한다. */}
      <Outlet />
    </div>
  );
}
//Topics하위 메뉴를 선택했을때 설명추가를 위한 컴포넌트
function Desc() {
  //리엑트 훅에서 제공하는 함수로 파라미터 정보를 얻어올 수 있다.
  let params = useParams();
  //아래 라우팅처리 부분에서 Topics의 하위 링크로 :category로 선언한 부분의 값을 얻어온다.
  let category = params.category;
  //화면에 출력할 내용
  let contents = '';

  if(category===undefined){
    contents = {title:'Sorry', desc:'No Selected..!!'}
  }
  else{
    //하위 링크가 qna, faq와 같다면 JSON객체에서 해당 객체를 얻어온다.
    contents = menuObject[category];
  }
  //얻어온 JSON객체를 파싱해서 내용을 출력한다.
  //해당 컴포넌트를 <Topics> 하위에 추가한다.
  return (
    <div>
      <h3>{contents.title}</h3>
      <p>{contents.desc}</p>
    </div>
  );
}
//화살표함수 형태의 컴포넌트
const Contact = () => {
  return (
    <div>
      <h2>Contact</h2>
      Contact컴포넌트
    </div>
  );
}

const NotFound = () => {
  return (
    <div>
      <h2>NotFound</h2>
      페이지를 찾을 수 없습니다. 경로를 확인해주세요.
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello React Router DOM</h1>

        <h4>a태그 : 화면의 깜빡임 있음(사용에 적합치 않음)</h4>
        <ul>
          <li><a href="/">Home(a태그)</a></li>  
          <li><a href="/Topics">Topics(a태그)</a></li>  
          {/* a태그의 깜빡임을 제거하기 위해 preventDefault()를 사용하면 클릭자체가 되지않는다. */}
          <li><a href="/Contact" onClick={function(e){e.preventDefault()}}>Contact(a태그)</a></li>  
        </ul> 

        <h4>Link : 화면의 깜빡임 없음(Style없음)</h4>
        <ul>
          <li><Link to="/">Home</Link></li>  
          <li><Link to="/Topics">Topics</Link></li>  
          <li><Link to="/Contact">Contact</Link></li>  
        </ul> 

        <h4>NavLink : 화면의 깜빡임 없음(Style추가됨)</h4>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>  
          <li><NavLink to="/Topics">Topics</NavLink></li>  
          <li><NavLink to="/Contact">Contact</NavLink></li>  
          <li><NavLink to="/Abcd1234">없는링크</NavLink></li>  
        </ul> 
        {/* 
          <Route path='경로명' element={컴포넌트명}
          만약 앞에서 매칭되는 경로명이 없는 경우 마지막 부분의 *가 모든 URL과
          매칭되어 NotFound컴포넌트를 렌더링한다.
        */}
        <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        {/* <Outlet>을 사용하지 않는 경우 중첩 처리 */}
        {/* 
        <Route path='/Topics' element={<Topics></Topics>}></Route>
        <Route path="/Topics/:category" element={<Topics/>}></Route> 
        */}

        {/* 아래와 같이 중첩해서 라우팅 처리를 하게되면 <Outlet>을 통해
        자식 컴포넌트를 렌더링 할 수 있다. */}
        <Route path='/Topics' element={<Topics></Topics>}>
          <Route path=":category" element={<Desc />}></Route>
        </Route>

        <Route path='/Contact' element={<Contact></Contact>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
