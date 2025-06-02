import { useState } from "react";

import { firestore } from "@/features/firestore"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const addPost = async (postData) => {  
  await addDoc(collection(firestore, 'boards'), {
    ...postData,
    createdAt: serverTimestamp(),
  });
  console.log("DB저장완료");
}

function MainWrite() {
  const [formState, setFormState] = useState({
    boardType: '',
    writer: '',
    title: '',
    contents: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log('formState', formState);
  };
  
  return (<>
      <form onSubmit={(e) => {
        e.preventDefault();
        addPost(formState);
        console.log("submit 완료");
      }}>
        <select name="boardType" required
          value={formState.boardType} onChange={handleInputChange} >
          <option value="">--게시판 선택--</option>
          <option value="main">자유게시판</option>
          <option value="qna">Q&A게시판</option>
          <option value="file">자료게시판</option>
        </select>
        <table id="boardTable">
          <tbody>
            <tr>  
              <th>작성자</th>
              <td><input type="text" name="writer"
                value={formState.writer} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title"
                value={formState.title} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" cols="22" rows="3"
                value={formState.contents} onChange={handleInputChange} ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
  </>) 
}

export default MainWrite;