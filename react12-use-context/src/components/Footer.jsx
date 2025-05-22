import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);  
  const toggleTheme = () => {
    // State 변경하는 Setter 함수
    setIsDark(!isDark)
  }
  return (<>
    <div className="footer"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray'
      }}>
      <input type="button" value="Dark Mode" className="button"
        onClick={toggleTheme} />
    </div>
  </>) 
}

export default Footer;