function ArticleWrite(props) {
  return (<>
    <article>
      <form onSubmit={(event)=>{
        // 제출을 차단
        event.preventDefault();

        // form submit이 제출한 value값들을 변수에 할당
        // 이벤트 객체의 target 속성으로 form 하위 태그에 접근하여 value를 읽어옴.
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        // 부모 컴포넌트에 정의된 게시물 추가생성 함수 실행
        /* 3개의 폼값을 부모로 전달하여 쓰기처리 */
        props.writeAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>) 
}

export default ArticleWrite;