import { useState } from "react";

function AccountTable({ parsedData }) {
  const allColumns = ['날짜', '시간', '타입', '대분류', '소분류','내용', '금액', '화폐', '결제수단', '메모'];
  const [selected, setSelected] = useState(allColumns);

  const handleToggleColumn = (column) => {
    setSelected((prev) =>
      prev.includes(column) ? prev.filter((c) => c !== column) : [...prev, column]
    );
  };

  const visibleColumns = allColumns.filter((col) => selected.includes(col));

  return (
    <div>
      <h2>📂 가계부 데이터</h2>

      {/* 컬럼 선택 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {allColumns.map((col) => (
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
      <table>
        <thead>
          <tr>
            {visibleColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedData.map((row, i) => (
            <tr key={i}>
              {visibleColumns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
