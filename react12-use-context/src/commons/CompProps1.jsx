import CompState2 from "./CompProps2";

/* 부모에서 전달된 2개의 prop들을 개별 매개변수로 받아서 사용 */
const CompProps1 = ({ propData, myNumber }) => {
  
  return (<>
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData}
      {/* prop drilling으로 자식 컴포넌트에 다시 전달 */}
      <CompState2 propData2={propData} myNumber={myNumber} />
    </div>
  </>) 
}

export default CompProps1;