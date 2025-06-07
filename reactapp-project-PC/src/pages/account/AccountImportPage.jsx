import React, { useState } from "react";
import * as XLSX from "xlsx";
import css from "./AccountImportPage.module.css";

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
  const allColumns = ['날짜', '시간', '타입', '대분류', '소분류','내용', '금액', '화폐', '결제수단', '메모'];
  const [selected, setSelected] = useState(allColumns);
  const visibleColumns = allColumns.filter((col) => selected.includes(col));
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

  const handleToggleColumn = (column) => {
    setSelected((prev) =>
      prev.includes(column) ? prev.filter((c) => c !== column) : [...prev, column]
    );
  };

  return (
    <div className={css.container}>
      <h1>🧾 나만의 가계부 만들기</h1>

      {parsedData.length === 0 ? (
        <div className={css.uploadSection}>
          <p>뱅크샐러드에서 다운로드한 엑셀 파일을 업로드해주세요.</p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
      ) : (
        <div className={css.resultSection}>
          <h2>✅ 데이터 업로드 완료</h2> <br />

          <h2>📊 바 차트</h2>
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


          <h2>📂 가계부 데이터</h2>
          {/* 체크박스로 표시할 컬럼 선택 */}
          <div>
            {['날짜', '시간', '타입', '대분류', '소분류','내용', '금액', '화폐', '결제수단', '메모'].map((col) => (
              <label key={col}>
                <input
                  type="checkbox"
                  checked={selected.includes(col)}
                  onChange={() => handleToggleColumn(col)}
                />
                {col}
              </label>
            ))}
          </div>

          {/* 데이터 테이블 */}
          <table className={css.previewTable}>
            <thead>
              <tr>
                {allColumns
                  .filter((col) => selected.includes(col))
                  .map((col) => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, i) => (
                <tr key={i}>
                  {allColumns
                    .filter((col) => selected.includes(col))
                    .map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </div>
  );
}

export default AccountImportPage;
