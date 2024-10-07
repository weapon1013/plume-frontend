import { getToken } from "@/assets/js/tokenUtils.js";
import axios from "axios"

// 일시적으로 잠시 주석처리 나중에 풀 것
//const BASE_URL = 'http://localhost:8080/api/v1';

// 쿼리스트링 변환 함수
const appendQueryString = (data) => {
  const params = new URLSearchParams(data).toString();
  return params ? `?${params}` : '';
};

// Axios 인스턴스 생성 함수
const axiosSet = axios.create({
  // 일시적으로 잠시 주석처리 나중에 풀 것
  //baseURL : BASE_URL,
  timeout: 5000,
  headers: {
      'Content-Type': 'application/json;charset=utf-8',
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

// 요청 인터셉터 추가하기
axiosSet.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if(accessToken){
      config.headers.Authorization  = `Bearer ${accessToken}`;
    } else {
      // 토큰이 없을 경우 'Bearer '만 설정
      config.headers.Authorization = 'Bearer ';
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axios.interceptors.request.use()