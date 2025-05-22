import { useState } from "react"

// Context import
import { ThemeContext } from "./context/ThemeContext";
import { SimpleContext } from "./context/SimpleContext";

// 모듈화된 컴포넌트 import
import Page from "./components/Page";

function App() {
  // 테마변경을 위한 State
  const [isDark, setIsDark] = useState(false) ;
  
  /* 데이터 공유를 위한 Provider는 2개 이상 겹쳐서 wrapping이 가능하다. */
  return (<>
  {/* SimpleContext를 주석 처리하면 모듈에서 초기화했던 값이 출력되고,
  활성화하면 value속성으로 부여한 값이 출력된다. 즉, SimpleContext 내의 값보다
  Provider로 wrapping한 value값이 더 우선순위가 높다. */}
    {/* <SimpleContext.Provider value={'Welcome 헝딜동'}> */}
    <ThemeContext.Provider value={{isDark, setIsDark}}>
      <Page />
    </ThemeContext.Provider>
    {/* </SimpleContext.Provider> */}
  </>) 
}

export default App;