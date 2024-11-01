<template>
    <div class="flex gap-4">
        <!-- Today's weather card -->
        <div class="flex justify-content-between w-26rem align-items-center text-center p-4 surface-100 shadow-2">
            <div class="text-xl font-bold m-1">Today</div>
            <div class="text-sm">{{ todayDate }}<br>{{ todayDay }}</div>
            <div class="text-6xl font-bold m-2">{{ TMP }}°</div>
            <img :src="weatherIcon" alt="Sunny" class="w-4rem h-4rem" >
        </div>
        <!-- Tomorrow's weather card -->
        <div class="flex justify-content-between w-26rem align-items-center text-center p-4 surface-overlay shadow-2">
            <div class="text-xl font-bold m-1">Tomorrow</div>
            <div class="text-sm">{{ tomorrowDate }}<br>{{ tomorrowDay }}</div>
            <div class="text-6xl font-bold m-2">{{ TMPTmr }}°</div>
            <img :src="weatherIcon" alt="Sunny" class="w-4rem h-4rem" >
        </div>
    </div>
</template>

<script setup>
import { axiosGet } from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import { dfs_xy_conv } from '@/assets/js/common.js'

const weekEngName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];       // 요일(영어)
const todayDate     = ref('');      // 오늘 날짜
const todayDay      = ref('');      // 오늘 요일
const tomorrowDate  = ref('');      // 내일 날짜
const tomorrowDay   = ref('');      // 내일 요일

const weatherIcon   = ref(require('@/assets/img/weather/question-mark.png'));                               // 기본 날씨 아이콘
const TMP           = ref('--');            // 현재기온
const TMPTmr        = ref('--');            // 내일기온

// 
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
            getWeather(pos.x, pos.y, base.baseDate, base.baseTime, base.nowHours);
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

    // 5시부터 발표니까 5시 이전이면 이전날짜. 5시 이후면 오늘날짜 => 무조건 6시 기준으로 다 가져오기
    if (hours <= 5) {
        day--;
    }
    var baseTime = '0500';  // 현 시간 변수 ('0705' 형식으로 표현)
    rs['baseDate'] = year + month + day;
    rs['baseTime'] = baseTime;
    rs['nowHours'] = hours + '00';
    return rs;
}

// 날씨 가져오기
async function getWeather(xPos, yPos, baseDate, baseTime, nowHours){
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
        ,nowHours   : nowHours          // 현재 시각
    };

    try {
        // 두 API 요청을 동시에 처리
        const [todayWeather, tomorrowWeather] = await Promise.all([
            getTodayWeather(data),
            getTomorrowWeather(data),
        ]);

        console.log('Today Weather:', todayWeather);
        console.log('Tomorrow Weather:', tomorrowWeather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// 오늘 날씨 :: 현재 날씨 상황 제공 - 초단기실황
function getTodayWeather(data){
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    axiosGet(url, data)
    .then((response) => {
        const resultCode = response.data.response.header.resultCode;
        if(resultCode == '00'){
            const items = response.data.response.body.items.item;                   // 전체 데이터
            const filteredItems = items.filter(item =>                              // 필터링(오늘날짜 & 현재시각) 데이터
                item.fcstDate === data.base_date && item.fcstTime === data.nowHours
            );
            iconInit(filteredItems);        // 날씨 아이콘 추가
            filteredItems.forEach((item) => {
                if(item.category == 'TMP') TMP.value=Math.round(item.fcstValue);
            });
        } else if (resultCode == '03'){
            alert('NO_DATA');
        }
    }).catch((e) => {
        if(e.code === 'ECONNABORTED'){
            console.log('요청이 타임아웃되었습니다.');
            initializeDates();
            getGeolocation();
        } else {
            console.error('요청 실패:', e);
        }
    });
}

// 내일 날씨 :: 내일 날씨 예측 - 단기예보
function getTomorrowWeather(data){
    const tmrDate = tomorrowDate.value.replace(/-/g, '');
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    axiosGet(url, data)
    .then((response) => {
        const resultCode = response.data.response.header.resultCode;
        if(resultCode == '00'){
            const items = response.data.response.body.items.item;                   // 전체 데이터
            const filteredItems = items.filter(item =>                              // 필터링(내일날짜 & 05시) 데이터
                item.fcstDate === tmrDate && item.fcstTime === data.base_time,
            );
            iconInit(filteredItems);        // 날씨 아이콘 추가
            filteredItems.forEach((item) => {
                if(item.category == 'TMP') TMPTmr.value=Math.round(item.fcstValue);
            });
        } else if (resultCode == '03'){
            alert('NO_DATA');
        }
    }).catch((e) => {
        if(e.code === 'ECONNABORTED'){
            console.log('요청이 타임아웃되었습니다.')
            initializeDates();
            getGeolocation();
        } else {
            console.error('요청 실패:', e);
        }
    });
}

// 날씨에 맞는 아이콘 추가
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