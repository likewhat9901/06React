import styles from "./editPage.module.css";
import { useState } from "react";
import DaumPostcode from "../DaumPostCode";

function EditPage() {
  const [emailDomain, setEmailDomain] = useState("");

  const handleEmailSelect = (e) => {
    const selected = e.target.value;
    if (selected) {
      setEmailDomain(selected);
    } else {
      setEmailDomain("");
    }
  };

  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const handleAddressSelect = ({ zonecode, roadAddress, extraAddress }) => {
    setPostcode(zonecode);
    setAddress(roadAddress);
    setExtraAddress(extraAddress);
  };
  
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  
  return (<section className={styles.regPage}>
    <h2>회원정보수정(개인)</h2>
    <form>
      <table className={styles.regTab}>
        <tbody>
          <tr>
            <td><label htmlFor="userid">아이디</label></td>
            <td>
              <input type="text" id="userid" name="userid" required />
              <button type="button" onClick={()=>setIdCheck(true)}>중복확인</button><br />
              {idCheck && <span style={{color: 'red', fontSize: '14px'}}>이미 존재하는 아이디입니다.</span>}
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">패스워드</label></td>
            <td><input type="password" id="password" name="password" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="confirmPassword">패스워드 확인</label></td>
            <td><input type="password" id="confirmPassword" name="confirmPassword" required 
              onChange={()=>setPwCheck(true)}/><br />
            {pwCheck && <span style={{color: 'red', fontSize: '14px'}}>비밀번호가 일치하지 않습니다.</span>}
            </td>
          </tr>
          <tr>
            <td><label htmlFor="name">이름</label></td>
            <td><input type="text" id="name" name="name" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="email">이메일</label></td>
            <td>
              <input type="text" name="emailId" placeholder="아이디" required /> @
              <input type="text" name="emailDomain" placeholder="도메인" required 
                value={emailDomain}
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
          <tr>
            <td><label htmlFor="phone">휴대폰 번호</label></td>
            <td><input type="tel" id="phone" name="phone" required /></td>
          </tr>
          <tr>
            <td><label htmlFor="zipcode">우편번호</label></td>
            <td>
              <input type="text" id="zipcode" name="zipcode" required
                value={postcode} readOnly />
              <DaumPostcode onAddressSelect={handleAddressSelect} />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="address">기본주소</label></td>
            <td><input type="text" id="address" name="address" required 
                  value={address} placeholder="기본주소" readOnly/></td>
          </tr>
          <tr>
            <td><label htmlFor="detailAddress">상세주소</label></td>
            <td >
              <div className={styles.addressWrapper}>
                <input type="text" id="detailAddress" name="detailAddress"
                  value={detailAddress} placeholder="상세주소를 입력하세요" required
                  onChange={(e) => setDetailAddress(e.target.value)} 
                  className={styles.detailInput} />
                <input type="text" id="extraAddress" name="extraAddress" placeholder="참고항목"
                  value={extraAddress} readOnly
                  className={styles.extraInput} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign: "center"}}>
              <button type="submit">회원가입</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </section>) 
}

export default EditPage;