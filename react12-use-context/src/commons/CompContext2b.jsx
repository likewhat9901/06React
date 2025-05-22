import { useContext } from "react";
import { SimpleContext } from "../context/SimpleContext";

const CompContext2b = () => {
  const contextData = useContext(SimpleContext);
  return (<>
    <div>
      <h4>Context2b 컴포넌트</h4>
      {/* Context Provider로 wrapping할땐 value 속성을 통해 데이터를
      전달하고 공유받게 된다. 이 데이터는 JSON 객체이므로 키를 통해 파싱하면 된다. */}
      {contextData.str} <br />
      myNumber : {contextData.num}
    </div>
  </>) 
}

export default CompContext2b;