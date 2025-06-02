import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { doc, getDoc, updateDoc } from "firebase/firestore";

import css from "./BoardEdit.module.css"

/* DB에 저장된 게시판 데이터 불러오기 */
const getPost = async (postID) => {

  // 'MainBoard' 컬렉션 참조 가져오기
  const postRef = doc(firestore, 'boards', postID);
  const postSnap = await getDoc(postRef);

  return postSnap;
}

const updatePost = async (postID, updatedData) => {  
  const postRef = doc(firestore, "boards", postID);
  await updateDoc(postRef, updatedData);
  console.log("DB저장완료");
}

const formatDate = (timestamp) => {
  const dt = timestamp.toDate();
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

function BoardEdit() {
  const navigate = useNavigate();
  let params = useParams();
  const [formState, setFormState] = useState({
      id: '', writer: '', title: '', date: '', contents: '',
  });

  useEffect(() => {
    if(!params.id) {
      console.log('params.id 없음');
      return;
    }
    const fetchData = async () => {
      const postSnap = await getPost(params.id); 
      if (postSnap.exists()) {
        const { writer, title, createdAt, contents} = postSnap.data();
        const id = postSnap.id;
        const date = formatDate(createdAt);
        setFormState({ id, writer, title, date, contents, })
      }
      else {
        alert("불러올 데이터가 없습니다.");
      }
    }
    fetchData();

  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log('formState', formState);
  };
  
  return (<>
    <div className={css.editContainer}>
      <div className={css.editHeader}>
        <h2>Edit 페이지</h2>
      </div>

      <form onSubmit={(e)=>{
        e.preventDefault();
        updatePost(params.id, formState);
        navigate(`../view/${formState.id}`);
      }}>
        <table className={css.editTable}>
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{formState.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title"
                value={formState.title} onChange={handleInputChange}/></td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{formState.date}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea type="text" name="contents"
                value={formState.contents} onChange={handleInputChange}/></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className={css.submitBtn}>수정완료</button>
      </form>
    </div>
  </>) 
}

export default BoardEdit;