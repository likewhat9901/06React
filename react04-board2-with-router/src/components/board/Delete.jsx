import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Delete(props) {
  const { boardData, setBoardData, navigate } = props;

  const params = useParams();
  const pno = Number(params.no);
  console.log('삭제할 파라미터: ', params.no);

  // let vi = props.boardData.reduce((newBoardData, curr)=>{
  //   if(curr.no !== pno){
  //     newBoardData.push(curr);
  //   }
  //   return newBoardData;
  // }, []);

  useEffect(()=>{
    const newBoardData = boardData.filter(item => item.no !== pno);
    setBoardData(newBoardData);
    navigate('/list');
  }, []);

  return null;
}

export default Delete;