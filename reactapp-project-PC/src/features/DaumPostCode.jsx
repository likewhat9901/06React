import { useEffect } from "react";

function DaumPostcode({ onAddressSelect }) {
  useEffect(() => {
    const existingScript = document.getElementById("daum-postcode-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.id = "daum-postcode-script";
      document.body.appendChild(script);
    }
  }, []);

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const { zonecode, roadAddress, jibunAddress } = data;
        let extra = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extra += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extra += (extra ? ", " + data.buildingName : data.buildingName);
        }

        if (extra) {
          extra = ` (${extra})`;
        }

        onAddressSelect({
          zonecode,
          roadAddress,
          jibunAddress,
          extraAddress: extra,
        });
      },
    }).open();
  };

  return (
    <button type="button" onClick={handlePostcode}>
      우편번호 찾기
    </button>
  );
}

export default DaumPostcode;
