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
  withCredentials: true,
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