import { useState } from "react";

function Talk() {
  const [text, setText] = useState("");

  return (
  <section style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px'
  }}>
    <h2>Talk 페이지</h2>
    <br />
    <textarea name="chat" value={text}
      onChange={(e)=> setText(e.target.value)}
      style={{
        width: '100%',
        height: '400px',
      }}></textarea>
  </section>
  )
}

export default Talk;