import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { storage } from "@/features/storageConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import css from "./BoardWrite.module.css"


function BoardWrite() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    boardType: '',
    writer: '',
    title: '',
    contents: '',
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log('formState', formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileURL = null;

    if (file) {
      const filename = `${Date.now()}_${file.name}`;
      const fileRef = ref(storage, `uploads/${filename}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    await addDoc(collection(firestore, 'boards'), {
      ...formState,
      fileURL, // ← 이걸 함께 저장
      createdAt: serverTimestamp(),
    });

    navigate('../lists');
  };
  
  return (<>
      <form className={css.writeForm} onSubmit={handleSubmit}>
        <div className={css.writeContainer}>
          <select name="boardType" required
            value={formState.boardType} onChange={handleInputChange} >
            <option value="">--게시판 선택--</option>
            <option value="main">자유게시판</option>
            <option value="qna">Q&A게시판</option>
            <option value="file">자료게시판</option>
          </select>
          <table className={css.writeTable}>
            <tbody>
              <tr>  
                <th>작성자</th>
                <td><input type="text" name="writer" required
                  value={formState.writer} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" required
                  value={formState.title} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" cols="22" rows="3" required
                  value={formState.contents} onChange={handleInputChange} ></textarea></td>
              </tr>
              {formState.boardType === 'file' && (
                <tr>
                  <th>파일 첨부</th>
                  <td>
                    <input type="file" name="attachment" onChange={(e) => setFile(e.target.files[0])} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <input type="submit" value="전송" className={css.writeSubmit} />
        </div>
      </form>
  </>) 
}

export default BoardWrite;