<template>
    <button @click="getGeolocation()">날씨버튼</button>
    <div class="flex gap-4">
        <!-- Today's weather card -->
        <div class="flex justify-content-between w-26rem align-items-center text-center p-4 surface-100 shadow-2">
            <div class="text-xl font-bold m-1">Today</div>
            <div class="text-sm">{{ todayDate }}<br>{{ todayDay }}</div>
            <div class="text-6xl font-bold m-2">{{ TMP }}°</div>
            <img :src="weatherIcon" alt="Sunny" class="w-4rem h-4rem">
        </div>
            <p>최저기온 : {{ TMN }}°</p>
            <p>최고기온 : {{ TMX }}°</p>
        <!-- Tomorrow's weather card -->
        <div class="flex justify-content-between w-26rem align-items-center text-center p-4 surface-overlay shadow-2">
            <div class="text-xl font-bold m-1">Tomorrow</div>
            <div class="text-sm">{{ tomorrowDate }}<br>{{ tomorrowDay }}</div>
            <div class="text-6xl font-bold m-2">16°</div>
            <img src="https://cdn-icons-png.flaticon.com/512/414/414927.png" alt="Rainy" class="w-4rem h-4rem">
        </div>
    </div>
</template>
<script setup>
import { axiosGet } from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import {dfs_xy_conv} from '@/assets/js/common.js'

const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayDate = ref('');
const todayDay = ref('');
const tomorrowDate = ref('');
const tomorrowDay = ref('');

const weatherIcon = ref('');
const TMP = ref('');        // 1시간 기온
const TMN = ref('');        // 일 최저기온
const TMX = ref('');        // 일 최고기온

onMounted(() => {
    initializeDates();
    getGeolocation()
})

// 오늘,내일 날짜 설정
function initializeDates(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    todayDay.value =  weekEngName[today.getDay()];
    todayDate.value = `${year}-${month}-${day}`;

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const yearTmr = tomorrow.getFullYear();
    const monthTmr = ('0' + (tomorrow.getMonth() + 1)).slice(-2);
    const dayTmr = ('0' + tomorrow.getDate()).slice(-2);
    
    tomorrowDay.value = weekEngName[tomorrow.getDay()];
    tomorrowDate.value = `${yearTmr}-${monthTmr}-${dayTmr}`;
}

// 사용자의 현재 위치 가져오기
/* 위도(X좌표,Latitude) 경도(Y표,Longitude) */
/* 사용자가 허용한 경우:: 위도와 경도를 넣어서 현재 날씨를 가져오기 */
/* 사용자가 허용하지 않은 경우:: 기본 위도와 경도를 넣어서 기본 날씨를 가져오기 */
function getGeolocation(){
    navigator.geolocation.getCurrentPosition(
        position => {
            const base = getBaseDate();
            const pos = dfs_xy_conv('toXY', position.coords.latitude, position.coords.longitude);       // 위도와 경도를 기상청에서 쓰는 x,y축으로 변경
            getWeather(pos.x, pos.y, base.baseDate, base.baseTime);
        },
        error => {
            console.error('Error occurred: ', error);
        },
    );
}

// 가져올 날짜,시간 설정
function getBaseDate(){
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = today.getHours();
    var rs = {};

    if (hours == 0) {
        hours = 24;
        day--;
    }
    hours -= 2;        // (기상청에서 제공하는 데이터의 업데이트가 느릴 수 있어서 1시간 전 데이터로 변경)
    var baseTime = '';  // 현 시간 변수 ('0705' 형식으로 표현)
    if (hours < 10) {
        baseTime += '0';
    }

    baseTime += hours;
    baseTime += '00';
    
    rs['baseDate'] = year + month + day;
    rs['baseTime'] = baseTime
    
    return rs;
}

// 날씨 가져오기
function getWeather(xPos, yPos, baseDate, baseTime){
    const key = 'Agq0eONiaOCbZSk615/aE5/0/i3U45shsush6jD4YPx2J0qBufB3QJQ7hyvgUXmr1qM4RNDgIuKmXmaYwNOdCQ==';
    const data = {
         serviceKey : key			    // 공공데이터포털에서 받은 인증키
        ,pageNo 	: '1'				// 페이지 번호
        ,numOfRows	: '1000'			// 한 페이지 결과 수
        ,dataType	: 'JSON'			// 요청자료형식(XML/JSON) Default: XML
        ,base_date	: baseDate		    // ‘21년 6월 28일 발표
        ,base_time	: baseTime			// 06시 발표(정시단위)
        ,nx 		: xPos			    // 예보지점의 X 좌표값
        ,ny			: yPos			    // 예보지점의 Y 좌표값
    }
    getTodayWeather(data);
    // getTomorrow(data);
}

// 오늘 날씨 :: 현재 날씨 상황 제공 - 초단기실황
function getTodayWeather(data){
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    axiosGet(url, data)
    .then((response) => {
        if(response.status == '200'){
            const items = response.data.response.body.items.item;
            iconInit(items);        // 날씨 아이콘 추가
            items.slice(0, 11).forEach((item) => {
                switch (item.category) {
                    case 'TMP':     // 1시간 기온
                        TMP.value=Math.round(item.fcstValue);
                        break;
                    case 'TMN':     // 일 최저기온
                        TMN.value=Math.round(item.fcstValue);
                        break;
                    case 'TMX':     // 일 최고기온
                        TMX.value=Math.round(item.fcstValue);
                        break;
                }
            });
        }
    }).catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    });
}

// 내일 날씨 :: 내일 날씨 예측 - 단기예보
// function getTomorrow(data){
//     const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';

//     axiosGet(url, data)
//     .then((response) => {
//         console.log(response);
//     }).catch((e) => {
//         console.log(`${e.name}(${e.code}): ${e.message})`);
//     });
// }

function iconInit(items){
    var sky = items[5].fcstValue
    var rain = items[6].fcstValue

    if (sky == 1) { // 맑음
        weatherIcon.value = require('@/assets/img/weather/sun.png');
    } else {
        if(rain == 1 || rain == 4){  //비
            weatherIcon.value = require('@/assets/img/weather/rain.png');
        } else if(rain == 2 || rain == 3){   //눈
            weatherIcon.value = require('@/assets/img/weather/snowman.png');
        } else {    //흐림
            weatherIcon.value = require('@/assets/img/weather/cloud.png');
        }
    }
}
</script>