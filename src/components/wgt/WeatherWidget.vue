<template>
    <button @click="getGeolocation()">날씨버튼</button>
    <div class="flex gap-4">
        <!-- Today's weather card -->
        <div class="flex justify-content-between w-26rem align-items-center text-center p-4 surface-100 shadow-2">
            <div class="text-xl font-bold m-1">Today</div>
            <div class="text-sm">{{ todayDate }}<br>{{ todayDay }}</div>
            <div class="text-6xl font-bold m-2">20°</div>
            <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Sunny" class="w-4rem h-4rem">
        </div>

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

const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayDate = ref('');
const todayDay = ref('');
const tomorrowDate = ref('');
const tomorrowDay = ref('');


onMounted(() => {
    initializeDates();
})

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
// 위도(X좌표,Latitude) 경도(Y표,Longitude)

/* 사용자가 허용한 경우:: 위도와 경도를 넣어서 현재 날씨를 가져오기 */
/* 사용자가 허용하지 않은 경우:: 기본 위도와 경도를 넣어서 기본 날씨를 가져오기 */
function getGeolocation(){
    navigator.geolocation.getCurrentPosition(
        position => {
            const xPos = Math.round(position.coords.latitude);
            const yPos = Math.round(position.coords.longitude);
            const baseDate = getBaseDate();
            const baseTime = getBaseTime();
            getWeather(xPos, yPos, baseDate, baseTime);
        },
        error => {
        // error 콜백 함수
        console.error('Error occurred: ', error);
        },
    );
}

function getBaseDate(){
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var baseDate = year + month + day;
    return baseDate;
}

function getBaseTime(){
    var today = new Date();   
    var hours = today.getHours();
    var baseTime = hours + '00';
    return baseTime;
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
    getTomorrow(data);
}

// 오늘 날씨 :: 현재 날씨 상황 제공 - 초단기실황
function getTodayWeather(data){
    const url = '/api/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

    axiosGet(url, data)
    .then((response) => {
        if(response.status == 200){
            console.log(response.data.response.body.items);
        }
    }).catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    });
}

// 내일 날씨 :: 내일 날씨 예측 - 단기예보
function getTomorrow(data){
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';

    axiosGet(url, data)
    .then((response) => {
        console.log('내일');
        console.log(response);
    }).catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    });
}
</script>