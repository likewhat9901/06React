/* 스테이트 사용을 위한 훅 import */
import { useState } from "react";

import NavList from "./components/navigation/NavList";
import NavView from "./components/navigation/NavView";
import NavWrite from "./components/navigation/NavWrite";
import NavEdit from "./components/navigation/NavEdit";
import ArticleList from "./components/article/ArticleList";
import ArticleView from "./components/article/ArticleView";
import ArticleWrite from "./components/article/ArticleWrite";
import ArticleEdit from "./components/article/ArticleEdit";

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
  // 게시판의 데이터로 사용할 객체형 배열
  /* 작성을 위해 기존 객체형 배열을 State로 변환한다. 데이터의 추가, 삭제가 있을때
  새로운 렌더링이 되어야 하기 때문. */
  const [boardData, setBoardData] = useState([
    {no: 1, title: '오늘은 React공부하는날', writer: '낙짜쌤', date: '2023-01-01',
      contents: 'React를 뽀개봅시당'},
    {no: 2, title: '어제는 Javascript공부함', writer: '유겸이', date: '2023-03-03',
      contents: 'Javascript는 할게 너무 많아요'},
    {no: 3, title: '내일은 Project해야지', writer: '개똥이', date: '2023-05-05',
      contents: 'Project는 뭘 만들어볼까?'},
  ]);
  // 화면 mode 변경
  const [mode, setMode] = useState('list');
  // 게시물 일련번호
  const [no, setNo] = useState(null);
  // 게시물 일련번호 부여
  // 새로운 게시물 작성시 사용할 시퀀스(Sequence) 용도의 State 생성
  const [nextNo, setNextNo] = useState(4);
  
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
    for (let i = 0; i < boardData.length; i++) {
      if (no===boardData[i].no) {
        /* 일치하는 게시물이 있다면 변수에 저장 */
        selectRow = boardData[i];
      }
    }
    // 선택한 게시물을 props를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow={selectRow} />
  }
  else if(mode === 'write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }} />
    articleComp = <ArticleWrite writeAction={(t, w, c)=>{
      /* 3개의 값을 받을 수 있는 함수를 정의하여 Props로 전달 */
      console.log('App.js', t,w,c);

      // 현재날짜
      // 작성일을 Date객체를 통해 생성
      const dateObj = new Date();
      // 현재년도
      var year = dateObj.getFullYear();
      // getMonth() : 0~11까지를 반환하므로 +1 해야 현재월을 구할 수 있다.
      var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
      var day = ("0" + dateObj.getDate()).slice(-2);
      /* 월과 일이
        한자리인 경우에는 01과 같이 생성되고
        두자리인 경우에는 012와 같이 생성되므로 끝에서 두자리만 잘라낸다.
        이때 slice(-2)를 사용한다. */
      // 0000-00-00 형식으로 날짜를 생성한다.
      const nowDate = year + "-" + month + "-" + day;

      // State 배열에 추가할 객체 생성
      /* 일련번호를 State로 선언한 nextNo으로 사용하고, 작성폼에서 입력한 값을 받아서 구성 */
      let addBoardData = {no: nextNo, title: t, writer: w, contents: c, date: nowDate};

      // 추가방법1
      /* 스프레드 연산자로 복사본 배열을 하나 생성 */
      let copyBoardData = [...boardData];
      // 복사된 배열에 객체 추가
      copyBoardData.push(addBoardData);
      // 스테이트를 새로운 객체로 변경
      setBoardData(copyBoardData);

      /* 배열의 복사본을 만들면 메모리에는 새로운 배열이 하나 추가된다. 복사본에
      데이터를 추가한 후 이를 통해 State를 변경한다. 그러면 새롭게 생성된 배열의
      참조값을 통해 State를 변경했으므로 React는 변화를 감지하여 새로운 렌더링을
      하게 된다.
      JavaScript는 얕은 참조라는 개념을 통해 객체의 변화를 감지하도록 설계되어있어
      이와같이 처리하는 것이다. */
      // 추가방법2(비추천)
      // boardData.push(addBoardData);
      // console.log(boardData);
      // setBoardData(boardData);

      // 게시물 일련번호 +1
      setNextNo(nextNo+1);
      // 'list'로 되돌아가기
      setMode('list');
    }}/>;
  }
  else if (mode === 'delete') {
    // 삭제1(권장)
    /* 새로운 빈 배열 생성 */
    let newBoardData = [];
    for (let i = 0; i < boardData.length; i++) {
      /* 삭제하려는 게시물이 아닌 것만 새로운 배열에 추가 */
      if (no !== boardData[i].no) {
        /* 새로운 배열에는 삭제하려는 게시물이 추가되지 않는다. */
        newBoardData.push(boardData[i]);
      }
    }
    /* 새로운 배열로 State를 변경. 리렌더링 */
    setBoardData(newBoardData);

    // 삭제2(비추천)
    // for (let i = 0; i < boardData.length; i++) {
    //   if (no === boardData[i].no) {
    //     boardData.splice(i, 1);
    //   }
    // }
    // setBoardData(boardData);

    // 삭제가 완료되면 리스트로 전환.
    setMode('list');
  }
  else if (mode === 'edit') {
    titleVar = '게시판 - 수정(props)';

    navComp = <NavEdit onChangeMode={()=>{
      /* 목록으로 전환하는 기능 */
      setMode('list');
    }}
    onBack={()=>{
      /* 열람으로 전환하는 기능 */
      setMode('view');
      setNo(no);
    }} />

    // 데이터의 개수만큼 반복해서 수정할 게시물 선택
    for (let i = 0; i < boardData.length; i++) {
      if (no===boardData[i].no) {
        selectRow = boardData[i];
      }
    }
    // 수정할 게시물을 자식 컴포넌트로 전달
    articleComp = <ArticleEdit selectRow={selectRow} 
      editAction={(t,w,c)=>{
        /* 수정을 위한 객체를 생성. 단, 일련번호와 작성일은 기존의 값을 그대로
        사용한다. */
        let editBoardData = {no:no, title:t, writer:w, contents:c,
          date:selectRow.date};
        console.log('수정내용', editBoardData);

        // 스프레드 연산자로 기존 배열데이터의 복사본을 생성
        let copyBoardData = [...boardData];
        for (let i = 0; i < copyBoardData.length; i++) {
          /* 수정할 객체를 찾는다. */
          if (copyBoardData[i].no === no) {
            /* 수정된 내용의 객체로 변경한다. */
            copyBoardData[i] = editBoardData;
            /* 반복문 탈출 */
            break;
          }
        }
        /* 복사본을 통해 State를 변경한다. */
        setBoardData(copyBoardData);
        /* 수정된 내용 확인을 위해 '열람' 화면으로 전환 */
        setMode('view');
      }}
    />
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