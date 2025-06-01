import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import css from "./QnABoard.module.css";

/* DB에 저장된 게시판 데이터 불러오기 */
const getPosts = async (boardType) => {
  const mainBoardCollection = collection(firestore, 'boards');
  const boardRef = query(mainBoardCollection, 
    where('boardType', '==', boardType), orderBy('createdAt', 'desc'));
  const boardSnap = await getDocs(boardRef);

  return boardSnap;
}

const formatDate = (timestamp) => {
  const dt = timestamp.toDate();
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};


function QnABoard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const boardSnap = await getPosts('qna'); // boardType: 'main'의 boardSnap 반환
      const postsArray = boardSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    }
    fetchData();

  }, []);

  return (<div>
    <header>
      <h2>Q&A게시판</h2>
    </header>
    <nav>
      <Link to="main">자유게시판</Link>
      <Link to="file">자료실게시판</Link>
      <Link to="/">Home</Link>
      <Link to="write">글쓰기</Link>
    </nav>
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
    </article>
  </div>) 
}

export default QnABoard;