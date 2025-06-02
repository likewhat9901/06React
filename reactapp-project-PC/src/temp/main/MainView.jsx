import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { doc, getDoc, deleteDoc } from "firebase/firestore";

/* DB에 저장된 게시판 데이터 불러오기 */
const getPost = async (postID) => {

  // 'MainBoard' 컬렉션 참조 가져오기
  const postRef = doc(firestore, 'boards', postID);
  const postSnap = await getDoc(postRef);

  return postSnap;
}

const deletePost = async (postID) => {
  const postRef = doc(firestore, "boards", postID);
  await deleteDoc(postRef);
  console.log('삭제완료');
  alert("삭제완료");
}

const formatDate = (timestamp) => {
  const dt = timestamp.toDate();
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

function MainView() {
  let params = useParams();
  const navigate = useNavigate();
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
  
  return (<>
    <article>
      <h2>View 페이지</h2>
      <Link to={`../edit/${formState.id}`}>수정</Link>
      <button type="button" onClick={()=>{
        deletePost(params.id);
        navigate('../');
      }}>삭제</button>
      <table id="boardTable">
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
            <td>{formState.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{formState.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{formState.contents}</td>
            {/* <td 
              className="tableImg"
              dangerouslySetInnerHTML={{__html: formState.contents}}
              style={{ whiteSpace:"pre-wrap" }}
            ></td> */}
          </tr>
        </tbody>
      </table>
    </article>
  </>) 
}

export default MainView;