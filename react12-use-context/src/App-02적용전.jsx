import { useState } from "react"

const Header = ({isDark}) => {
  // isDark에 따라 배경색과 글자색을 변경하도록 스타일 설정
  return (
    <header className="header"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black'
      }}>
      <h1>Welcome 헝딜동..!!</h1>
    </header>
  )
}

const Content = ({isDark}) => {
  return (
    <div className="content"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black'
      }}>
      <p>헝딜동 반가워..ㅋㅋ</p>
    </div>
  )
}

const Footer = ({isDark, setIsDark}) => {
  // 다크모드를 토글시켜주는 함수 정의
  const toggleTheme = () => {
    // State 변경하는 Setter 함수
    setIsDark(!isDark)
  }
  return (
    <div className="footer"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray'
      }}>
      <input type="button" value="Dark Mode" className="button"
        onClick={toggleTheme} />
    </div>
  )
}

// App 컴포넌트가 전달해준 Props를 다시 Page의 하위 컴포넌트로 전달
const Page = ({isDark, setIsDark}) => {
  return (
    <div className="page">
      {/* State 변수만 전달 */}
      <Header isDark={isDark} />
      <Content isDark={isDark} />
      {/* State 변수, 함수를 같이 전달 */}
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(false) ;
  return (<>
    <Page isDark={isDark} setIsDark={setIsDark} />
  </>) 
}

export default App;