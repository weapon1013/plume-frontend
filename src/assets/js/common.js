// chkValue :: 새롭게 넣은 값
// helpTerm :: 바꿔야하는 help 
// id :: 유효성 해야하는 값 (1:아이디 유효성, 2:비밀번호유효성)
export function filterValue(chkValue, type){
    // 추가적인 로직을 여기에 작성
    var formatRegex = '';
    switch(type){
        case 1 :
            formatRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,10}$/;
            break;
        case 2:
            formatRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    }

    return formatRegex.test(chkValue);
}