import React from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store/postSlice";

function SearchAddress(props) {
  let rs = useSelector(state => state.post);
  let dispach = useDispatch();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    // console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    dispach(setPost(fullAddress));
    props.close();
  };
  

  const handleSearch = (data) => {
    // console.log(data);
  };

  return (
    <DaumPostcode
      onComplete={handleComplete}
      onSearch={handleSearch}
      {...props}
    />
  );
}

export default SearchAddress;

SearchAddress.defaultProps = {
  style: {
    width: "700px",
    height: "450px",
  },
};

/**
 * "학동로 31길 12" 입력 시
onComplete {Function}
@return
{
  "q": "학동로 31길 12",
  "count": 1
}

handleSearch {Function}
@return
{
  "postcode": "",
  "postcode1": "",
  "postcode2": "",
  "postcodeSeq": "",
  "zonecode": "06052",
  "address": "서울 강남구 학동로31길 12",
  "addressEnglish": "12, Hakdong-ro 31-gil, Gangnam-gu, Seoul, Korea",
  "addressType": "R",
  "bcode": "1168010800",
  "bname": "논현동",
  "bnameEnglish": "Nonhyeon-dong",
  "bname1": "",
  "bname1English": "",
  "bname2": "논현동",
  "bname2English": "Nonhyeon-dong",
  "sido": "서울",
  "sidoEnglish": "Seoul",
  "sigungu": "강남구",
  "sigunguEnglish": "Gangnam-gu",
  "sigunguCode": "11680",
  "userLanguageType": "K",
  "query": "학동로 31길 12",
  "buildingName": "벤쳐캐슬빌딩",
  "buildingCode": "1168010800100820018000001",
  "apartment": "N",
  "jibunAddress": "",
  "jibunAddressEnglish": "",
  "roadAddress": "서울 강남구 학동로31길 12",
  "roadAddressEnglish": "12, Hakdong-ro 31-gil, Gangnam-gu, Seoul, Korea",
  "autoRoadAddress": "",
  "autoRoadAddressEnglish": "",
  "autoJibunAddress": "서울 강남구 논현동 82-17",
  "autoJibunAddressEnglish": "82-17, Nonhyeon-dong, Gangnam-gu, Seoul, Korea",
  "userSelectedType": "R",
  "noSelected": "N",
  "hname": "",
  "roadnameCode": "4166791",
  "roadname": "학동로31길",
  "roadnameEnglish": "Hakdong-ro 31-gil"
}
 */