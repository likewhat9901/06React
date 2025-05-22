import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { SimpleContext } from "../context/SimpleContext";

const Header = () => {
  /* useContext를 통해 ThemeContext의 데이터를 얻어온다. 단, import한
  모듈에서는 null로 초기화되어 있으므로 얻어오는 데이터는 Provider에서
  value로 설정한 값이 된다. */
  /* Provider로 설정한 객체값 중 isDark 값을 가져온다. */
  const { isDark } = useContext(ThemeContext);
  console.log('Header컴포넌트', isDark); // false를 반환

  /* Provider의 value를 통해 설정한 값이 우선순위가 높으므로 wrapping
  여부에 따라 아래 useMessage는 변경되어 출력된다. */
  const userMessage = useContext(SimpleContext) ;
  
  return (<>
    <header className="header"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black'
      }}>
      <h1>{userMessage}..!!</h1>
    </header>
  </>) 
}

export default Header;