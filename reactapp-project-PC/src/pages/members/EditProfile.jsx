import { useState, useEffect, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { doc, getDoc, setDoc } from "firebase/firestore";

import styles from "./Register.module.css";
import DaumPostcode from "@/features/DaumPostCode";


const MemberDB = async () => {
  /* DB에서 계정 데이터 가져오기 */
  const userId = JSON.parse(localStorage.getItem("user")).id; // 문자열 → 객체
  console.log('user_id',userId);

  const docSnap = await getDoc(doc(firestore, "Members", userId));
  const docData = docSnap.data();

  const [emailId = "", emailDomain = ""] = docData.email.split("@");
  const phoneParts = (docData.phone || "").split("-");
  const addressParts = (docData.address || "").split("|").map(part => part.trim());

  const userData = { 
    ...docData, 
    email: { id: emailId, domain: emailDomain },
    phone: phoneParts.length === 3 ? phoneParts : ["", "", ""],
    address: { base: addressParts[0], detail: addressParts[1], extra: addressParts[2] }
  }

  console.log('userData', userData);

  return userData;
}

const initialState = {
  id: "",
  idValid: null,
  pw: "",
  pwCheck: "",
  pwValid: null,
  name: "",
  email: { id: "", domain: ""},
  phone: ["", "", ""],
  postcode: "",
  address: { base: "", detail: "", extra: "" }
};

function reducer(state, action) {
  switch(action.type) {
    case "FETCH_USER": return { ...state, ...action.userData };
    case "SET_ID": return { ...state, id: action.value };
    case "SET_ID_VALID": return { ...state, idValid: action.value };
    case "SET_PW": return { ...state, pw: action.value };
    case "SET_PW_CHECK": return { ...state, pwCheck: action.value };
    case "SET_PW_VALID": return { ...state, pwValid: action.value };
    case "SET_NAME": return { ...state, name: action.value };
    case "SET_EMAIL_FIELD":
      return {
        ...state,
        email: {
          ...state.email,
          [action.field]: action.value
        }
      };
    case "SET_PHONE": 
      const updatedPhone = [...state.phone];

      let inputNum = action.value.replace(/\D/g, ""); // 숫자만 남기기
      if (inputNum.length > action.maxNum) {
        inputNum = inputNum.slice(0, action.maxNum);
      }
      
      updatedPhone[action.index] = inputNum;
      return { ...state, phone: updatedPhone };
    case "SET_POSTCODE": return { ...state, postcode: action.value };
    case "SET_ADDRESS_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value // 동적으로 객체키 지정
        }
      };
    default: return state;
  }
}

/* Account - 계정만들기 $$$$$*/
const memberEdit = async (memberData) => {
  await setDoc(doc(firestore, "Members", memberData.id), memberData, { merge: true });
  console.log("입력성공");
};

/* 메인 컴포넌트 */
function Register() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  console.log("firestore 연결완료", firestore);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await MemberDB(); // DB에서 데이터 가져오기
      dispatch({ type: "FETCH_USER", userData }); // reducer에 초기 데이터 전달
      setLoading(false);
    };

    fetchData();
  }, []);

  /* id - 중복확인 with firestore */
  const idRef = useRef();

  const checkID = async () => {  
    const docRef = doc(firestore, "Members", state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("이미 존재하는 아이디입니다.", docSnap.data());
      dispatch({ type: "SET_ID_VALID", value: false });
    }
    else {
      console.log("사용 가능한 아이디입니다.", state.id);
      dispatch({ type: "SET_ID_VALID", value: true });
    }
  }

  /* password */
  const pwRef = useRef();

  /* email - 도메인 선택버튼 */
  const emailDomainRef = useRef();

  const handleEmailSelect = (e) => {
    const selected = e.target.value;
    if (selected === "") {
      dispatch({ type: "SET_EMAIL_FIELD", field: "domain", value: "" })
      emailDomainRef.current.readOnly = false;
    } else {
      dispatch({ type: "SET_EMAIL_FIELD", field: "domain", value: selected })
      emailDomainRef.current.readOnly = true;
    }
  };

  /* 핸드폰 번호 */
  const phoneRef2 = useRef();
  const phoneRef3 = useRef();

  /* 우편번호 조회 및 반영 */
  const detailAddressRef = useRef();

  const handleAddressSelect = ({ zonecode, roadAddress, extraAddress }) => {
    dispatch({ type: "SET_POSTCODE", value: zonecode });
    dispatch({ type: "SET_ADDRESS_FIELD", field: "base" , value: roadAddress });
    dispatch({ type: "SET_ADDRESS_FIELD", field: "extra" , value: extraAddress });
  };

  /* Submit $$$$$*/
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (state.pw !== state.pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      pwRef.current.focus();
      return;
    }

    const fullEmail = `${state.email.id}@${state.email.domain}`;
    const fullPhone = state.phone.join("-");
    const fullAddress = `${state.address.base} | ${state.address.detail} | ${state.address.extra}`;

    const memberData = {
      id: state.id,
      pw: state.pw,
      name: state.name,
      email: fullEmail,
      phone: fullPhone,
      postcode: state.postcode,
      address: fullAddress,
    };

    await memberEdit(memberData);
    console.log("회원정보 수정완료");
    // navigate('/');
  }

  /* HTML */
  return (<section className={styles.regPage}>
    <h2>회원정보수정(개인)</h2>
    { loading && <div>로딩 중...</div> }
    <form onSubmit={handleRegisterSubmit}>
      <table className={styles.regTab}>
        <tbody>
          {/* 아이디 완료 - 중복체크, DB 추가 */}
          {/* 미비사항: DB 반영요소 수정(pw,email 등), span 디자인 수정 */}
          <tr>
            <td><label htmlFor="id">아이디</label></td>
            <td>
              <input type="text" id="id" name="id" value={state.id} ref={idRef} required readOnly
                onChange={(e) => dispatch({ type: "SET_ID", value: e.target.value })} />
              <button type="button" disabled onClick={checkID}>중복확인</button><br />
              {state.id && typeof state.idValid === "boolean" && (
                <span style={{ color: state.idValid ? "blue" : "red", fontSize: "14px" }} >
                  {state.idValid ? "사용 가능한 아이디입니다." : "이미 존재하는 아이디입니다."}
                </span>
              )}
            </td>
          </tr>
          {/* 패스워드 완료 */}
          <tr>
            <td><label htmlFor="pw">패스워드</label></td>
            <td><input type="password" id="pw" name="pw" value={state.pw} ref={pwRef} required 
              onChange={(e) => dispatch({ type: "SET_PW", value: e.target.value })} />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="pwCheck">패스워드 확인</label></td>
            <td><input type="password" id="pwCheck" name="pwCheck" value={state.pwCheck} required 
              onChange={(e) => dispatch({ type: "SET_PW_CHECK", value: e.target.value })} /><br />
            {state.pw && state.pwCheck && (
              <span style={{ color: state.pw === state.pwCheck ? "blue" : "red", fontSize: "14px" }}>
                {state.pw === state.pwCheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
              </span>
            )}
            </td>
          </tr>
          {/* 이름 */}
          <tr>
            <td><label htmlFor="name">이름</label></td>
            <td><input type="text" id="name" name="name" value={state.name} required 
              onChange={(e) => dispatch({ type: "SET_NAME", value: e.target.value })} /></td>
          </tr>
          {/* 이메일 */}
          <tr>
            <td><label htmlFor="email">이메일</label></td>
            <td>
              <input type="text" id="email" name="emailId" value={state.email.id} required
                onChange={(e) => dispatch({ type: "SET_EMAIL_FIELD", field: "id", value: e.target.value })} />
              &nbsp;@
              <input type="text" name="emailDomain" placeholder="도메인" required
                value={state.email.domain} ref={emailDomainRef}
                onChange={(e) => dispatch({ type: "SET_EMAIL_FIELD", field: "domain", value: e.target.value })}/>
              <select name="emailSelect" value={state.email.domain}
                onChange={handleEmailSelect}>
                <option value="">직접 입력</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </td>
          </tr>
          {/* 핸드폰 번호 */}
          <tr>
            <td><label htmlFor="phone">휴대폰 번호</label></td>
            <td>
              <input type="tel" id="phone" name="phone1" value={state.phone[0]} required 
                onChange={(e) => {
                  dispatch({ type: "SET_PHONE", index: 0, value: e.target.value, maxNum: 3 })
                  if (e.target.value.length >= 3) phoneRef2.current.focus();
                }} />
              &nbsp;-&nbsp;
              <input type="tel" name="phone2" value={state.phone[1]} ref={phoneRef2} required 
                onChange={(e) => {
                  dispatch({ type: "SET_PHONE", index: 1, value: e.target.value, maxNum: 4 })
                  if (e.target.value.length >= 4) phoneRef3.current.focus();
                }} />
              &nbsp;-&nbsp;
              <input type="tel" name="phone3" value={state.phone[2]} ref={phoneRef3} required 
                onChange={(e) => dispatch({ type: "SET_PHONE", index: 2, value: e.target.value, maxNum: 4 })} />
            </td>
          </tr>
          {/* 우편번호 */}
          <tr>
            <td><label htmlFor="postcode">우편번호</label></td>
            <td>
              <input type="text" id="postcode" name="postcode" value={state.postcode} required readOnly />
              <DaumPostcode onAddressSelect={(e) => {
                handleAddressSelect(e);
                detailAddressRef.current.focus();
                }} />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="address">기본주소</label></td>
            <td><input type="text" id="address" name="address" required readOnly
                  value={state.address.base} placeholder="기본주소" /></td>
          </tr>
          <tr>
            <td><label htmlFor="detailAddress">상세주소</label></td>
            <td >
              <div className={styles.addressWrapper}>
                <input type="text" id="detailAddress" name="detailAddress" className={styles.detailInput} required
                  value={state.address.detail} placeholder="상세주소를 입력하세요" ref={detailAddressRef}
                  onChange={(e) => dispatch({ type: "SET_ADDRESS_FIELD", field: "detail", value: e.target.value })} />
                <input type="text" id="extraAddress" name="extraAddress" className={styles.extraInput} readOnly
                  value={state.address.extra} placeholder="참고항목" />
              </div>
            </td>
          </tr>
          {/* 회원가입 제출 버튼 */}
          <tr>
            <td colSpan={2} style={{textAlign: "center"}}>
              <button type="submit">회원정보수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </section>) 
}

export default Register;