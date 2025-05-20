import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // 서버 연결
    socketRef.current = new WebSocket("ws://localhost:3001");

    // 메시지 받았을 때
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => socketRef.current.close(); // 연결 해제
  }, []);

  const sendMessage = () => {
    socketRef.current.send(input);
    setInput("");
  };

  return (
    <div>
      <h2>💬 채팅</h2>
      <div style={{ border: "1px solid gray", height: "200px", overflowY: "scroll", padding: "10px"}}>
        {messages.map((msg) => <div key={msg.id}>{msg.text}</div>)}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown = {handleKeyDown}
        placeholder = "메세지를 입력하세요"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default App;