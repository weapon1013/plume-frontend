<template>
    <div>여기는 날씨가 올 자리입니다!</div>
</template>

<script setup>
import { axiosGet } from '@/plugins/axios';

// 사용자의 현재 위치 가져오기
// 위도(X좌표,Latitude) 경도(Y표,Longitude)

/* 사용자가 허용한 경우:: 위도와 경도를 넣어서 현재 날씨를 가져오기 */
/* 사용자가 허용하지 않은 경우:: 기본 위도와 경도를 넣어서 기본 날씨를 가져오기 */
navigator.geolocation.getCurrentPosition(
    position => {
        const nx = position.coords.latitude
        const ny = position.coords.longitude
        getWeather()
        console.log(nx);
        console.log(ny);
    },
    error => {
    // error 콜백 함수
    console.error('Error occurred: ', error);
  },
);

function getWeather(){
    const url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=Agq0eONiaOCbZSk615%2FaE5%2F0%2Fi3U45shsush6jD4YPx2J0qBufB3QJQ7hyvgUXmr1qM4RNDgIuKmXmaYwNOdCQ%3D%3D&pageNo=1&numOfRows=1000&dataType=XML&base_date=20241006&base_time=0500&nx=37&ny=127";
    const data = {
        
    }
    axiosGet(url, data)
    .then((response) => {
        console.log(response);
    }).catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    })
}


</script>

<style scoped>

</style>