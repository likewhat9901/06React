import { Link } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

function FreeBoardWrite(props) {

  const [databoard, setDataBoard] = useState(
    {
      no: 1,
      title: "",
      content: "",
      writer: "",
      date: "",
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataBoard({
      ...databoard, [name]: value,
    });
  };

  const handleWrite = async (e) => {
    if (databoard.title === "" || databoard.content === "") {
      alert("제목과 내용을 모두 입력해주세요");
      return;
    }
    await addDoc(collection(firestore, "freeboard"), { ...databoard });
    const newPost = {
      no: databoard.no + 1,
      title: '',
      content: '',
      writer: databoard.writer,
      date: databoard.date
    };

    setDataBoard(newPost);
  };

  return (<>
    <Link to="/">Home</Link>
    <h2>💬 자유게시판</h2>
    <form onSubmit={(e) => { 
      e.preventDefault();
      handleWrite();
      console.log("완료");
      }}>
      <input
        type="text"
        name="title"
        value={databoard.title}
        placeholder="제목을 입력하세요"
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={databoard.content}
        placeholder="내용을 입력하세요"
        onChange={handleChange}
        rows="4"
      />
      <button type="submit">작성하기
      </button>
    </form>
    <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>작성자</th>
        <th>날짜</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </>);
}

export default FreeBoardWrite; 