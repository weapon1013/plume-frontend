import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/v1';

// 쿼리스트링 변환 함수
const appendQueryString = (data) => {
  const params = new URLSearchParams(data).toString();
  return params ? `?${params}` : '';
};

// Axios 인스턴스 생성 함수
const axiosSet = axios.create({
  baseURL : BASE_URL,
  timeout: 1000,
  headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : 'Bearer ' // + 로그인 후 AccessToken 값을 쿠키로 저장하고, Bearer 뒤에 쿠키에 저장된 토큰 값을 붙여서 API 요청하면 됨
  },
});

// GET 방식
const axiosGet = (url,data) => {
  return axiosSet.get(`${url}${appendQueryString(data)}`);
}

// POST 방식
const axiosPost = (url,data) => {
  return axiosSet.post(url, data);
}

export {axiosGet, axiosPost, axiosSet};


// const axiosGetSet = (url,data) => axios.create({
//   baseURL : process.env.VUE_APP_API_BASE_URL + url + appendQueryString(data),
//   timeout: 1000,
//   headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Authorization' : 'Bearer ' // + 로그인 후 AccessToken 값을 쿠키로 저장하고, Bearer 뒤에 쿠키에 저장된 토큰 값을 붙여서 API 요청하면 됨
//   },
//   methods : 'GET',
// });

// const axiosPostSet = () => axios.create({
//   baseURL : process.env.VUE_APP_API_BASE_URL,
//   timeout: 1000,
//   headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Authorization' : 'Bearer ' // + 로그인 후 AccessToken 값을 쿠키로 저장하고, Bearer 뒤에 쿠키에 저장된 토큰 값을 붙여서 API 요청하면 됨
//   },
//   methods : 'POST',
// });

// const axiosPutSet = () => axios.create({
//   baseURL : process.env.VUE_APP_API_BASE_URL,
//   timeout: 1000,
//   headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Authorization' : 'Bearer ' // + 로그인 후 AccessToken 값을 쿠키로 저장하고, Bearer 뒤에 쿠키에 저장된 토큰 값을 붙여서 API 요청하면 됨
//   },
//   methods : 'PUT',
// });

// const axiosDeleteSet = () => axios.create({
//   baseURL : process.env.VUE_APP_API_BASE_URL,
//   timeout: 1000,
//   headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Authorization' : 'Bearer ' // + 로그인 후 AccessToken 값을 쿠키로 저장하고, Bearer 뒤에 쿠키에 저장된 토큰 값을 붙여서 API 요청하면 됨
//   },
//   methods : 'DELETE',
// });

// get방식 예제 :: 조회
/*
const get = () => {
    axiosSet({
        url: "/" ,
        data : {
            userId: '1',
            title:  'Article title',
            body:   'Article body content'
        }
    })
    .then((response) => {
        if(response.status == 200){
            console.log('200' + response.data);
        }
    })
    .catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    })
}
*/

// post방식 예제 :: 저장
/*
const post = async () => {
  try {
    const response = await axiosSet.post("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    // 201: created
    if (response.status == 201) {
      console.log(response.status, response.data);
    }
  } catch (e) {
    console.log(`${e.name}(${e.code}): ${e.message})`);
  }
};
*/

// put 방식 :: 수정

// delete 방식 :: 삭제

// 



