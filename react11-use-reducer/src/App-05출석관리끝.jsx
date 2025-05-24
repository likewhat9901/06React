import { useReducer, useState } from "react";

/* 학생 컴포넌트 정의
컴포넌트에서 매개변수를 정의하는 2가지 방법
1. props라는 대표 매개변수를 사용한다. 이때는 2개 이상의 인수를 객체형태로
받을 수 있으므로 'props.속성명'과 같이 사용한다.
2. 인수를 개별 변수로 전달받는다.
  {매개변수1, 매개변수2, ... N} */
const Student = ({name, dispatch, id, isHere}) => {
  return (<>
    <div>
      {/* 학생의 이름을 클릭하면 출석기능이 토글됨. */}
      {/* 학생이 출석한 상태이면 가운데 줄과 회색으로 변경되는 스타일 추가
      isHere에 따라 토글 */}
      <span style={{
        textDecoration: isHere ? 'line-through' : 'none',
        color: isHere ? 'gray' : 'black',
        cursor: "pointer",
        transition: "transform 0.07s",
        display: "inline-block"
      }}
        onClick={()=>{
          /* 디스패치 함수 호출시 액션객체를 전달해서 상태를 변경.
          이때 Reducer함수가 실행. */
          dispatch({ type: 'mark', param: {id} })
        }}
        onMouseDown={(e)=>{
          e.target.style.transform = "scale(0.9)";
        }}
        onMouseUp={(e)=>{
          e.target.style.transform = "scale(1)";
        }}
      >{name}</span>
      {/* 삭제 버튼 */}
      <button onClick={()=>{
        /* 삭제버튼 누르면 confirm으로 확인 후 삭제 */
        if (window.confirm('삭제할까요?')) {
          dispatch({ type: 'delete', param: {id} });
        }
      }}>삭제</button>
    </div>
  </>)
}

// Reducer 함수 선언
const reducer = (state, action) => {
  switch(action.type){
    // 학생 추가
    case 'add':
      // 학생 이름은 전달된 액션객체의 key값을 통해 읽어온다.
      const name = action.param.name;
      // 추가를 위한 새로운 객체 생성
      const newStudent = {
        id: Date.now(),
        name, /* 이름은 key와 value가 동일하므로 하나만 작성 */
        isHere: false, //출석여부
      }
      return {
        // 학생수 증가
        count: state.count + 1,
        // 스프레드 연산자로 기존 배열에 새로운 객체 추가
        students: [...state.students, newStudent]
      }
    case 'delete':
      return {
        count: state.count - 1,
        /* filter함수를 이용해서 삭제할 학생을 제외한 나머지를 반환
        화살표함수는 매개변수가 1개인 경우 소괄호 생략가능.
        반환값이 1줄인 경우 중괄호와 return 생략가능. */
        students: state.students.filter(
          student => student.id !== action.param.id
        )
      }
    // 출결처리
    case 'mark':
      return {
        // 학생수는 변함 없음
        count: state.count,
        /* 학생수 변함이 없음으로 map사용.
        처리할 학생을 찾은 후 isHere만 true/false로 변경 */
        students: state.students.map((student) => {
            return student.id === action.param.id ? 
              {...student, isHere: !student.isHere} : student //뒤의 isHere은 덮어쓰기됨
          }
        )
      }
    default:
  }
}

// 앱에서 사용할 데이터 객체로 학생수와 학생의 정보를 담은 배열로 정의한다.
const initialState = {
  count : 1,
  students : [
    {
      id: Date.now(), name: '김철수', isHere: false,
    },
  ],
}

function App() {
  // 학생이름 입력을 위한 input상자에서 사용할 State
  const [name, setName] = useState('');
  // 리듀서 변수 생성 및 함수 생성
  // initialState 객체가 studentInfo의 초기값
  /* dispatch({a, b})
  => reducer(studentInfo, {a, b}) */
  const [studentInfo, dispatch] = useReducer(reducer, initialState);
  
  return (<>
    <p>총학생수 : {studentInfo.count}</p>
    {/* 추가할 학생의 이름을 입력하기 위한 상자 */}
    <input type="text" placeholder="이름을 입력하세요"
      value={name} onChange={(e)=>{
        setName(e.target.value);
      }} />
    {/* 버튼을 누르면 디스패치를 통해 액션객체를 Reducer로 전달해서 학생을 추가한다.
    특히 param의 value는 객체로 정의되어 있다. */}
    <button onClick={()=>{
      dispatch({type: 'add', param: {name}});
      setName('');
    }}>추가</button>
    <br />
    {
      // 데이터의 학생 수만큼 반복해서 <Student>컴포넌트를 출력함
      studentInfo.students.map((student)=>{
        // 컴포넌트에서 사용할 값을 props로 전달
        return <Student key={student.id} name={student.name}
          dispatch={dispatch} id={student.id}
          isHere={student.isHere}
          />
      })
    }
  </>) 
}

export default App;