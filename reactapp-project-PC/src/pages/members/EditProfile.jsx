import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestore } from "@/features/firestore"
import styles from "./Register.module.css";
import DaumPostcode from "@/features/DaumPostCode";


/* DB에서 Account 정보 가져오기 */
const getAcc = async (loginId) => {  
  const docRef = doc(firestore, "Members", loginId);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

/* Account - 계정정보 수정하기 */
const memberEdit = async (id, pw, name, email, phone, postcode, address) => {
  await setDoc(doc(firestore,"Members", id), {
    id,
    pw,
    name,
    email,
    phone,
    postcode,
    address,
  });
  console.log("수정성공");
}


/* Submit */
const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  const navigate = useNavigate();

  const id = e.target.id.value.trim();
  const pw = e.target.pw.value.trim();
  const name = e.target.name.value.trim();
  const email = `${e.target.emailId.value.trim()}@${e.target.emailDomain.value.trim()}`;
  const phone = `${e.target.phone1.value.trim()}-${e.target.phone2.value.trim()}
                  -${e.target.phone3.value.trim()}`;
  const postcode = e.target.postcode.value.trim();
  const address = `${e.target.address.value.trim()} | ${e.target.detailAddress.value.trim()} | ${e.target.extraAddress.value.trim()}`;

  if(idTrue===false){
    alert("아이디 중복체크를 해주세요.");
    idRef.current.focus();
    return;
  }
  if(pwTrue===false){
    alert("비밀번호가 일치하지 않습니다.");
    pwRef2.current.focus();
    return;
  }

  memberEdit(id, pw, name, email, phone, postcode, address); // event로 얻은 값 넣어주기

  setIdTrue(false);
  setPwTrue(false);

  console.log("회원가입완료");
  navigate('/');
}

function EditProfile() {

  /* 계정정보 불러오기, 반영 */
  useEffect(()=>{
    const user = localStorage.getItem("user");
    const getAcc = getAcc(user.id);

    console.log(getAcc);


  }, []);


  /* HTML */
  return (<section className={styles.regPage}>
    <h2>회원정보수정(개인)</h2>
    <form onSubmit={handleRegisterSubmit}>
      <table className={styles.regTab}>
        <tbody>
          {/* 아이디 */}
          <tr>
            <td><label htmlFor="id">아이디</label></td>
            <td>
              <input type="text" id="id" name="id" ref={idRef} required />
              <button type="button" onClick={checkID}>중복확인</button><br />
              {idTrue && <span style={{color: 'blue', fontSize: '14px'}}>사용 가능한 아이디입니다.</span>}
              {idFalse && <span style={{color: 'red', fontSize: '14px'}}>이미 존재하는 아이디입니다.</span>}
            </td>
          </tr>
          {/* 패스워드 */}
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
            <td><input type="text" id="address" name="address" ref={addressRef} required 
                  value={address} placeholder="기본주소" readOnly/></td>
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