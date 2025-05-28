import { useState } from "react";

function Chat() {
  const [text, setText] = useState("");
  const [showTalk, setShowTalk] = useState(false);

  return (<>
    <button onClick={() => setShowTalk(!showTalk)}
      className={styles.chat_button}>
      {showTalk ? "채팅 닫기" : "채팅 열기"}</button>
    {showTalk && (
      <div className={styles.chat_div}>
        <h2>Talk 페이지</h2>
        <br />
        <textarea name="chat" value={text}
          onChange={(e)=> setText(e.target.value)}
          style={{
            width: '100%',
            height: '400px',
          }}></textarea>
      </div>
    )}
  </>)
}



export default Chat;