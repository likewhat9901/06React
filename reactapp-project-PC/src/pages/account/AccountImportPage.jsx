import React, { useState } from "react";
import * as XLSX from "xlsx";
import css from "./AccountImportPage.module.css";
import { Link } from "react-router-dom";
import AccountTable from "./components/AccountTable"

import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function AccountImportPage() {
  const [parsedData, setParsedData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" }); // 바이너리 data를 엑셀 문서(workbook) 형식으로 변환
      const sheet = workbook.Sheets[workbook.SheetNames[1]]; // 두번째 시트만 가져오기
      const json = XLSX.utils.sheet_to_json(sheet); // sheet를 json 배열로 변환

      // 날짜 포맷 통일하기
      const formatted = json.map((row) => {
        const newRow = { ...row };

        // 날짜 처리
        if (typeof newRow.날짜 === 'number') { 
          const parsed = XLSX.SSF.parse_date_code(newRow.날짜);
          const yyyy = parsed.y;
          const mm = String(parsed.m).padStart(2, '0');
          const dd = String(parsed.d).padStart(2, '0');
          newRow.날짜 = `${yyyy}-${mm}-${dd}`;
        }

        // 시간 처리
        if (typeof newRow.시간 === 'number') {
          const parsed = XLSX.SSF.parse_date_code(newRow.시간);
          const hh = String(parsed.H).padStart(2, '0');
          const min = String(parsed.M).padStart(2, '0');
          newRow.시간 = `${hh}:${min}`;
        }

        return newRow;
      });

      setParsedData(formatted);
    };
    reader.readAsArrayBuffer(file); // 실제 파일 읽기 트리거 -> 다 읽으면 onload 콜백함수 실행
  };


  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>
          🧾 나만의 가계부 만들기
          {parsedData.length !== 0 && <span>✅ 데이터 업로드 완료</span>}
        </h1>
        <div className={css.nav}>
          <Link to="./">개요</Link>
          <Link to="data">가계부 데이터</Link>
        </div>
      </div>

      {parsedData.length === 0 ? (
        <div className={css.uploadSection}>
          <p>뱅크샐러드에서 다운로드한 엑셀 파일을 업로드해주세요.</p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
      ) : (
        <div className={css.resultSection}>
          <div>
            <h1>총 지출</h1>

          </div>


          <h2>📊 일별 지출</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={parsedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="날짜" />
              <YAxis tickFormatter={(val) => `${val/10000}만원`} />
              <Tooltip formatter={(val) => `${Number(val).toLocaleString()}원`}  />
              <Bar dataKey="금액" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <br /><br />


          <AccountTable
            parsedData={parsedData}
          />
          
        </div>
      )}
    </div>
  );
}

export default AccountImportPage;
