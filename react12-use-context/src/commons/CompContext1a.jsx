import CompContext2a from "./CompContext2a";

// props 없이 컴포넌트를 일단 삽입
const CompContext1a = () => {
  return (
    <div>
      <h4>useContext 적용</h4>
      <CompContext2a />
    </div>
  )
}

export default CompContext1a;