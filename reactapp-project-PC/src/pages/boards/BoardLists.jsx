import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import css from "./Board.module.css";

/* DB에 저장된 게시판 데이터 불러오기 */
const getPosts = async (boardType) => {
  // 'MainBoard' 컬렉션 참조 가져오기
  const mainBoardCollection = collection(firestore, 'boards');
  const boardRef = query(mainBoardCollection, 
    where('boardType', '==', boardType), orderBy('createdAt', 'desc'));
  const boardSnap = await getDocs(boardRef);

  return boardSnap;
}

const formatDate = (timestamp) => {
  const dt = timestamp.toDate();
  const now = new Date();

  const isToday = 
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() === now.getDate();

  if (isToday) {
    // 시간 표시 (예: 14:03)
    return `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
  } else {
    // 날짜 표시 (예: 2025-06-01)
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
};


function BoardLists() {
  const { type } = useParams();
  const [ posts, setPosts ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const boardSnap = await getPosts(type); 
      const postsArray = boardSnap.docs.map(doc => ({
        id: doc.id, ...doc.data(),
      }));
      setPosts(postsArray);
    }
    fetchData();

  }, [type]);

  /* 페이징 기능 */
  const totalPages = Math.ceil(posts.length / postsPerPage); // 전체 페이지 수 계산
  const indexOfLastPost = currentPage * postsPerPage; // 현재 페이지에서 보여줄 마지막 게시글의 인덱스
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 현재 페이지에서 보여줄 첫 게시글의 인덱스
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에서 보여줄 게시글만 추출

  return (<div>
    <header>
      <h2>자유게시판</h2>
    </header>
    <nav>
      <Link to="/board/main/lists">자유게시판</Link>
      <Link to="/board/qna/lists">Q&A게시판</Link>
      <Link to="/board/file/lists">자료실게시판</Link>
      <Link to="/">Home</Link><br />
      <Link to="../write">글쓰기</Link>
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
          {currentPosts.map((post) => {
            const date = formatDate(post.createdAt);
            return (
              <tr key={post.id}>
                <td className="cen">{post.id}</td>
                <td>
                  <Link to={"../view/" + post.id}>{post.title}</Link>
                </td>
                <td className="cen">{post.writer}</td>
                <td className="cen">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 페이징 버튼 */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </article>
  </div>) 
}

export default BoardLists;