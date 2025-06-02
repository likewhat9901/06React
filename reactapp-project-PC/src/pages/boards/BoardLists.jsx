import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { formatDate } from "./utils/dateUtils";
import css from "./BoardLists.module.css"

/* DB에 저장된 게시판 데이터 불러오기 */
const getBoard = async (boardType) => {
  // 'MainBoard' 컬렉션 참조 가져오기
  const mainBoardCollection = collection(firestore, 'boards');
  const boardRef = query(mainBoardCollection, 
    where('boardType', '==', boardType), orderBy('createdAt', 'desc'));
  const boardSnap = await getDocs(boardRef);

  return boardSnap;
}

/* MAIN COMPONENT */
function BoardLists() {
  const { type } = useParams();
  const boardTitleMap = {
    main: '자유게시판',
    qna: 'Q&A게시판',
    file: '자료실게시판',
  };
  const [ posts, setPosts ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  /* DB 데이터 렌더링 */
  useEffect(() => {
    const fetchData = async () => {
      const boardSnap = await getBoard(type); 
      const postsArray = boardSnap.docs.map(doc => ({
        id: doc.id, ...doc.data(),
      }));
      setPosts(postsArray);
      setCurrentPage(1);
    }
    fetchData();
  }, [type]);
  

  /* 페이징 기능 */
  const totalPages = Math.ceil(posts.length / postsPerPage); // 전체 페이지 수 계산
  const indexOfLastPost = currentPage * postsPerPage; // 현재 페이지에서 보여줄 마지막 게시글의 인덱스
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 현재 페이지에서 보여줄 첫 게시글의 인덱스
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에서 보여줄 게시글만 추출

  return (<>
    <div className={css.boardContainer}>
      <header>
        <h2 className={css.boardHeader}>{boardTitleMap[type] || '게시판'}</h2>
      </header>
      <nav className={css.boardNav}>
        <Link to="/board/main/lists">자유게시판</Link>
        <Link to="/board/qna/lists">Q&A게시판</Link>
        <Link to="/board/file/lists">자료실게시판</Link>
      </nav>
      <article>
        <table className={css.boardTable}>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
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
            {currentPosts.map((post, index) => {
              const date = formatDate(post.createdAt);
              // 전체 게시글 수 - ( 현재 페이지의 첫 게시글의 인덱스 (0부터 시작) +	현재 페이지 안에서 반복 중인 글의 인덱스 (0~4) )
              // ex) 16 - (10 + 0~9) => 1번째 페이지는 16,15..8,7 순으로 보임.
              const postNum = posts.length - (indexOfFirstPost + index); 
              return (
                <tr key={post.id}>
                  <td>{postNum}</td>
                  <td>
                    <Link to={"../view/" + post.id}>{post.title}</Link>
                  </td>
                  <td>{post.writer}</td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 페이징 버튼 */}
        <div className={css.pagination}>
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

        <nav className={css.boardNavBottom}>
          <Link to="../write">글쓰기</Link>
        </nav>
      </article>
    </div>
  </>) 
}

export default BoardLists;