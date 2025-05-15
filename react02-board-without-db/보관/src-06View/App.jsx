/* 스테이트 사용을 위한 훅 import */
import { useState } from "react";

import NavList from "./components/navigation/NavList";
import NavView from "./components/navigation/NavView";
import NavWrite from "./components/navigation/NavWrite";
import ArticleList from "./components/article/ArticleList";
import ArticleView from "./components/article/ArticleView";
import ArticleWrite from "./components/article/ArticleWrite";

/* 페이지가 없을때 임시로 사용하기 위한 컴포넌트 */
function ReadyComp() {
  return (<>
    <h3>컴포넌트 준비중입니다^^</h3>
    <a href="/">Home바로가기</a>
  </>) 
}

/* 매개변수 props를 통해 전달된 값(타이틀) 출력
헤더 컴포넌트는 모든 페이지에서 공통으로 사용된다. */
function Header(props) {
  console.log('props', props.title);
  return (<>
    <header>
      <h2>{props.title}</h2>
    </header> 
  </>)
}


function App(props) {
  const boardData = [
    {no: 1, title: '오늘은 React공부하는날', writer: '낙짜쌤', date: '2023-01-01',
      contents: 'React를 뽀개봅시당'},
    {no: 2, title: '어제는 Javascript공부함', writer: '유겸이', date: '2023-03-03',
      contents: 'Javascript는 할게 너무 많아요'},
    {no: 3, title: '내일은 Project해야지', writer: '개똥이', date: '2023-05-05',
      contents: 'Project는 뭘 만들어볼까?'},
  ];
  const [mode, setMode] = useState('list');

  /* 선택한 게시물의 일련번호를 저장. 첫 실행시 선택 게시물이 없으므로 null로 초기값 설정. */
  const [no, setNo] = useState(null);
  
  /* 컴포넌트와 제목을 저장할 변수 생성 */
  /* 선택할 게시물의 객체를 저장할 변수 추가. */
  let articleComp, navComp, titleVar, selectRow;

  /* mode 값에 따라 화면전환 */
  if(mode === 'list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }} />
    articleComp = <ArticleList boardData={boardData}
      onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:' + no);
      /* 화면을 '열람'으로 전환 */
      setMode('view');
      /* 선택한 게시물의 일련번호로 State 변경 */
      setNo(no);
    }} />
  }
  else if(mode === 'view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }} />
    
    console.log('현재no:', no, typeof(no));
    /* 선택한 게시물의 일련번호와 일치하는 객체를 찾기 위해 반복 */
    // for (let i = 0; i < boardData.length; i++) {
    //   if (no===boardData[i].no) {
    //     /* 일치하는 게시물이 있다면 변수에 저장 */
    //     selectRow = boardData[i];
    //   }
    // }
    const selectRow = boardData.reduce((acc, data)=>{
      if (data.no === no) acc = data;
      return acc;
    }, null)

    // 선택한 게시물을 props를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow={selectRow} />
  }
  else if(mode === 'write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }} />
    articleComp = <ArticleWrite />;
  }
  else {
    /* mode값이 없는 경우 '준비중'을 화면에 표시한다. */
    navComp = <ReadyComp />;
    articleComp = '';
  }

  return (<>
    {/* 문자열은 '을 통해 props를 전달한다. */}
    <Header title={titleVar}></Header>
    {/* mode의 변화에 따라 다른 컴포넌트를 렌더링한다. */}
    {navComp}
    {articleComp}
  </>) 
}
export default App;