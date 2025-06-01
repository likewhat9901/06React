import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { collection, getDocs, addDoc, serverTimestamp, setDoc } from "firebase/firestore";

import css from "@/pages/boards/main/MainBoard.module.css";

function ClassRoom() {

  /* 게시판 리스트 */

  /* DB에 저장된 게시판 데이터 불러오기 */
  const getPosts = async () => {
    const mainBoardCollection = collection(firestore, 'boards');
    const boardSnap = await getDocs(mainBoardCollection);
  
    return boardSnap;
  }
  
  const formatDate = (timestamp) => {
    const dt = timestamp.toDate();
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const boardSnap = await getPosts('main'); // boardType: 'main'의 boardSnap 반환
      const postsArray = boardSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    }
    fetchData();

  }, []);


  /* 글쓰기 부분 */

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
    <header>
      <h2>자유게시판</h2>
    </header>
    <article>
      <table className={css.boardTable}>
        {/* thead */}
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜, 시간</th>
          </tr>
        </thead>
        {/* tbody */}
        <tbody>
          {posts.map((post) => {
            const date = formatDate(post.createdAt);
            return (
              <tr key={post.id}>
                <td className="cen">{post.id}</td>
                <td>
                  <Link to={"view/" + post.id}>{post.title}</Link>
                </td>
                <td className="cen">{post.writer}</td>
                <td className="cen">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 글쓰기 */}
      <form onSubmit={(e) => {
        e.preventDefault();
        
        addDoc( collection(firestore, 'FreeBoard'), { ...formState } );

        console.log("submit 완료");
      }}>
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
    </article>
  </>)
}

export default ClassRoom;