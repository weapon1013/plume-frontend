// 쿠키 가져오기
export const getToken = getCookie('accessToken')

export function getCookie(name){
    const cookies = document.cookie.split('; ');
    for(let i=0; i<cookies.length; i++){
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if(cookieName === name){
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
