import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestore } from "@/features/firestore"
import styles from "./Register.module.css";
import DaumPostcode from "@/features/DaumPostCode";
import { useEffect } from "react";


/* Account - 계정만들기 */
const memberWrite = async (id, pw, name, email, phone, postcode, address) => {
  await setDoc(doc(firestore,"Members", id), {
    id,
    pw,
    name,
    email,
    phone,
    postcode,
    address,
  });
  console.log("입력성공");
}

function EditProfile() {
  console.log("firestore 연결완료", firestore);
  const navigate = useNavigate();
  
  /* Ref 모음 */
  const idRef = useRef(); // id input
  const pwRef = useRef(); // pw input
  const pwRef2 = useRef(); // pw2 input
  const nameRef = useRef(); 
  const emailIdRef = useRef();
  const emailDomainRef = useRef();
  const phoneRef1 = useRef();
  const phoneRef2 = useRef();
  const phoneRef3 = useRef();
  const postcodeRef = useRef();
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const extraAddressRef = useRef();

  
  useEffect(()=>{
    const dataInput = async () => {
      /* DB에서 계정 데이터 가져오기 */
      const userStr = localStorage.getItem("user");
      const userObj = JSON.parse(userStr); // 문자열 → 객체
      const userId = userObj.id; // id 값 가져오기 (key는 실제 구조에 따라 다름)
      console.log('user_id',userId);

      const docRef = doc(firestore, "Members", userId);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      console.log('docRef', docData);
      
      idRef.current.value = docData.id;
      pwRef.current.value = docData.pw;
      pwRef2.current.value = docData.pw;
      nameRef.current.value = docData.name;
      emailIdRef.current.value = docData.email.split('@')[0];
      emailDomainRef.current.value = docData.email.split('@')[1];
      phoneRef1.current.value = docData.phone.split('-')[0].trim();
      phoneRef2.current.value = docData.phone.split('-')[1].trim();
      phoneRef3.current.value = docData.phone.split('-')[2].trim();
      postcodeRef.current.value = docData.postcode;
      addressRef.current.value = docData.address.split('|')[0].trim();
      detailAddressRef.current.value = docData.address.split('|')[1].trim();
      extraAddressRef.current.value = docData.address.split('|')[2].trim();
    }
    dataInput();
  },[])

  /* 비밀번호 */
  const [pwTrue, setPwTrue] = useState(false);
  const [pwFalse, setPwFalse] = useState(false);

  const checkPW = (pwCheck) => {  
    if (pwRef.current.value.trim() === pwCheck) {
      console.log("비밀번호가 일치합니다.");
      setPwTrue(true);
      setPwFalse(false);
    }
    else {
      console.log("비밀번호가 일치하지 않습니다.");
      setPwTrue(false);
      setPwFalse(true);

    }
  }

  /* email - 도메인 선택버튼 */
  const [emailDomain, setEmailDomain] = useState("");

  const handleEmailSelect = (e) => {
    const selected = e.target.value;
    if (selected !== "") {
      setEmailDomain(selected);
      emailDomainRef.current.readOnly = true;
    } else {
      setEmailDomain("");
      emailDomainRef.current.readOnly = false;
    }
  };

  /* 핸드폰 번호 */
  const handlePhoneInput = (e, order, maxNum) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > maxNum) {
      value = value.slice(0, maxNum);
    }

    e.target.value = value;

    // 3자리가 되면 다음 input으로 포커스 이동
    if (value.length === maxNum && order === 1) {
      phoneRef2.current.focus();
    }
    else if(value.length === maxNum && order === 2) {
      phoneRef3.current.focus();
    }
  };

  /* 우편번호 조회 및 반영 */
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const handleAddressSelect = ({ zonecode, roadAddress, extraAddress }) => {
    setPostcode(zonecode);
    setAddress(roadAddress);
    setExtraAddress(extraAddress);

    detailAddressRef.current.focus();
  };

  /* Submit */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();


    const id = e.target.id.value.trim();
    const pw = e.target.pw.value.trim();
    const name = e.target.name.value.trim();
    const email = `${e.target.emailId.value.trim()}@${e.target.emailDomain.value.trim()}`;
    const phone = `${e.target.phone1.value.trim()}-${e.target.phone2.value.trim()}
                    -${e.target.phone3.value.trim()}`;
    const postcode = e.target.postcode.value.trim();
    const address = `${e.target.address.value.trim()} | ${e.target.detailAddress.value.trim()} | ${e.target.extraAddress.value.trim()}`;

    if(pwTrue===false){
      alert("비밀번호가 일치하지 않습니다.");
      pwRef2.current.focus();
      return;
    }

    await memberWrite(id, pw, name, email, phone, postcode, address); // event로 얻은 값 넣어주기

    setPwTrue(false);

    console.log("회원정보 수정완료");
    navigate('/');
  }

  /* HTML */
  return (<section className={styles.regPage}>
    <h2>회원정보수정(개인)</h2>
    <form onSubmit={handleRegisterSubmit}>
      <table className={styles.regTab}>
        <tbody>
          {/* 아이디 완료 - 중복체크, DB 추가 */}
          {/* 미비사항: DB 반영요소 수정(pw,email 등), span 디자인 수정 */}
          <tr>
            <td><label htmlFor="id">아이디</label></td>
            <td>
              <input type="text" id="id" name="id" ref={idRef} readOnly />
              <button type="button">중복확인</button><br />
            </td> 
          </tr>
          {/* 패스워드 완료 */}
          <tr>
            <td><label htmlFor="pw">패스워드</label></td>
            <td><input type="password" id="pw" name="pw" ref={pwRef} required 
              onChange={()=>{
                if (pwRef2.current.value.trim() !== "") {
                  checkPW(pwRef2.current.value.trim());
                }
              }} /></td>
          </tr>
          <tr>
            <td><label htmlFor="pwCheck">패스워드 확인</label></td>
            <td><input type="password" id="pwCheck" name="pwCheck" ref={pwRef2} required 
              onChange={(e)=>{
                if (e.target.value.trim() !== "") {
                  checkPW(e.target.value.trim())
                }
              }} /><br />
            {pwTrue && <span style={{color: 'blue', fontSize: '14px'}}>비밀번호가 일치합니다.</span>}
            {pwFalse && <span style={{color: 'red', fontSize: '14px'}}>비밀번호가 일치하지 않습니다.</span>}
            </td>
          </tr>
          {/* 이름 */}
          <tr>
            <td><label htmlFor="name">이름</label></td>
            <td><input type="text" id="name" name="name" ref={nameRef} required /></td>
          </tr>
          {/* 이메일 */}
          <tr>
            <td><label htmlFor="email">이메일</label></td>
            <td>
              <input type="text" id="email" name="emailId" ref={emailIdRef} required />
              &nbsp;@
              <input type="text" name="emailDomain" placeholder="도메인" required 
                value={emailDomain} ref={emailDomainRef}
                onChange={(e) => setEmailDomain(e.target.value)}/>
              <select name="emailSelect"
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
              <input type="tel" id="phone" name="phone1" ref={phoneRef1} required 
                onInput={(e)=>handlePhoneInput(e, 1, 3)} />&nbsp;-&nbsp;
              <input type="tel" name="phone2" ref={phoneRef2} required
                onInput={(e)=>handlePhoneInput(e, 2, 4)} />&nbsp;-&nbsp;
              <input type="tel" name="phone3" ref={phoneRef3} required
                onInput={(e)=>handlePhoneInput(e, 3, 4)} />
            </td>
          </tr>
          {/* 우편번호 */}
          <tr>
            <td><label htmlFor="postcode">우편번호</label></td>
            <td>
              <input type="text" id="postcode" name="postcode" required
                value={postcode} ref={postcodeRef} readOnly />
              <DaumPostcode onAddressSelect={handleAddressSelect} />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="address">기본주소</label></td>
            <td><input type="text" id="address" name="address" required 
                  value={address} placeholder="기본주소" ref={addressRef} readOnly/></td>
          </tr>
          <tr>
            <td><label htmlFor="detailAddress">상세주소</label></td>
            <td >
              <div className={styles.addressWrapper}>
                <input type="text" id="detailAddress" name="detailAddress" ref={detailAddressRef}
                  value={detailAddress} placeholder="상세주소를 입력하세요" required
                  onChange={(e) => setDetailAddress(e.target.value)} 
                  className={styles.detailInput} />
                <input type="text" id="extraAddress" name="extraAddress" placeholder="참고항목"
                  value={extraAddress} ref={extraAddressRef} readOnly
                  className={styles.extraInput} />
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

export default EditProfile;