import { wToast } from "./toast";

// 형식 검사 (아이디, 비밀번호, 이메일)
export function filterValue(chkValue, type){
    // 추가적인 로직을 여기에 작성
    var formatRegex = '';
    switch(type){
        case 1 :
            formatRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,10}$/;
            break;
        case 2:
            formatRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
            break;
        case 3:
            formatRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
            break;
    }

    return formatRegex.test(chkValue);
}

// 유효성 검사
export const validateValue = (obj) =>{
    const keyMap = {
          userId: '아이디'
        , userPw: '비밀번호'
        , userBirth: '생년월일'
        , userGender: '성별'
        , incomeSeq: '수입'
        , userEmail: '이메일'
    };

    for(const key in obj){
        if(isEmpty(obj[key])){
            wToast(keyMap[key] + ' 입력 필요❗','Check required information');

            return false;
        }
    }
    return true;
}

//문자열 빈 문자열인지 체크하여 true/false리턴
function isEmpty(str){
    if(typeof str === "undefined" || str === null || str === "")
        return true;
    else
        return false ;
}