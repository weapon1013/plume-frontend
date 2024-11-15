<template>
    <div class="flex flex-row gap-2 p-2">
        <div >{{ address }}</div>
        <i class="pi pi-map"></i>
    </div>
    <div class="flex gap-2">
        <!-- Today's weather card -->
        <div class="flex flex-column justify-content-between w-20rem align-items-center text-center p-1 surface-100 shadow-2">
            <!-- 제목과 날짜 -->
            <div class="flex flex-column align-items-center">
                <div class="text-2xl font-bold m-2">Today</div>
                <div class="text-sm">{{ todayDate }}<br>{{ todayDay }}</div>
            </div>
            <!-- 온도와 날씨 아이콘 -->
            <div class="flex align-items-center gap-6">
                <div class="text-6xl font-bold m-2">{{ TMP }}°</div>
                <img :src="weatherIconToday" alt="Sunny" class="w-4rem h-4rem">
            </div>
            <!-- 최고기온 & 최저기온 추가 -->
            <div class="flex flex-column align-items-center p-2">
                <div class="text-lg"><span class="text-blue-500">{{ minTMP }}°</span> / <span class="font-bold text-red-500">{{ maxTMP }}°</span></div>
            </div>
        </div>
        <!-- Tomorrow's weather card -->
        <div class="flex flex-column justify-content-between w-20rem align-items-center text-center p-1 surface-100 shadow-2">
            <!-- 제목과 날짜 -->
            <div class="flex flex-column align-items-center">
                <div class="text-2xl font-bold m-2">Tomorrow</div>
                <div class="text-sm">{{ tomorrowDate }}<br>{{ tomorrowDay }}</div>
            </div>
            <!-- 온도와 날씨 아이콘 -->
            <div class="flex align-items-center gap-6">
                <div class="text-6xl font-bold m-2">{{ TMPTmr }}°</div>
                <img :src="weatherIconTomorrow" alt="Sunny" class="w-4rem h-4rem" >
            </div>
            <!-- 최고기온 & 최저기온 추가 -->
            <div class="flex flex-column align-items-center p-2">
                <div class="text-lg"><span class="text-blue-500">{{ minTMPTmr }}°</span> / <span class="font-bold text-red-500">{{ maxTMPTmr }}°</span></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { axiosGet } from '@/plugins/axios';
import { ref } from 'vue';
import { dfs_xy_conv } from '@/assets/js/common.js'

const weekEngName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];       // 요일(영어)
const todayDate     = ref('');      // 오늘 날짜
const todayDay      = ref('');      // 오늘 요일
const tomorrowDate  = ref('');      // 내일 날짜
const tomorrowDay   = ref('');      // 내일 요일
const TMP           = ref('--');    // 현재기온
const TMPTmr        = ref('--');    // 내일기온
const minTMP        = ref('--');    // 오늘최저기온
const maxTMP        = ref('--');    // 오늘최고기온
const minTMPTmr     = ref('--');    // 내일최저기온
const maxTMPTmr     = ref('--');    // 내일최고기온                                                                                                                                                                                   
const weatherIconToday = ref(require('@/assets/img/2.gif'));
const weatherIconTomorrow = ref(require('@/assets/img/2.gif'));
const address = ref('위치를 찾는 중...');

// 오늘과 내일 날짜 초기화
initializeDates();

// 현재 위치 기반으로 날씨 데이터 가져오기
getGeolocation();

// 오늘,내일 날짜 설정
function initializeDates(){
    const today = new Date();
    todayDate.value = today.toISOString().split('T')[0];
    todayDay.value =  weekEngName[today.getDay()];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrowDate.value = tomorrow.toISOString().split('T')[0];
    tomorrowDay.value = weekEngName[tomorrow.getDay()];
}

// 사용자의 현재 위치 가져오기
/* 위도(X좌표,Latitude) 경도(Y표,Longitude) */
/* 사용자가 허용한 경우:: 위도와 경도를 넣어서 현재 날씨를 가져오기 */
/* 사용자가 허용하지 않은 경우:: 기본 위도와 경도를 넣어서 기본 날씨를 가져오기 */
function getGeolocation(){
    navigator.geolocation.getCurrentPosition( async (position) => {
            const base = getBaseDate();
            const pos = dfs_xy_conv('toXY', position.coords.latitude, position.coords.longitude);       // 위도와 경도를 기상청에서 쓰는 x,y축으로 변경
            fetchWeatherData(pos.x, pos.y, base.baseDate, base.baseTime, base.nowHours);
            address.value = await getAddressFromCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            address.value = '위치를 가져올 수 없습니다.';
            console.error('Error occurred: ', error);
        },
    );
}

const getAddressFromCoords = async (latitude, longitude) => {
  const kakaoApiKey = process.env.VUE_APP_REST_KAKAO_MAP_KEY; // 환경 변수에서 API 키 가져오기
  console.log('Kakao API Key:', process.env.VUE_APP_JS_KAKAO_MAP_KEY);
  if (!kakaoApiKey) {
    console.error('Kakao API Key is missing');
    return 'API 키가 없습니다.';
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      return data.documents[0].address_name; // 행정동 주소 반환
    } else {
      return '주소를 찾을 수 없습니다.';
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return '주소를 불러오는 중 오류가 발생했습니다.';
  }
};

// 가져올 날짜,시간 설정
function getBaseDate(){
    const now = new Date();
    const hours = now.getHours();
    // 한 자리수일 경우 앞에 0 추가
    const formattedHours = `${hours}`.padStart(2, '0');

    const baseDate = new Date(now);
    const formattedDate = baseDate.toISOString().slice(0, 10).replace(/-/g, '');
    return {
        baseDate: formattedDate,
        baseTime: '0200',
        nowHours: `${formattedHours}00`
    };
}

// 날씨 가져오기
async function fetchWeatherData(xPos, yPos, baseDate, baseTime, nowHours){
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
        ,nowHours                       // 현재 시각
    };
    try {
        // 오늘과 내일의 날씨를 동시에 가져오기
        const [weatherResponse, minMaxResponse] = await Promise.all([
            getWeather(data),
            getMinMaxWeather(data)
        ]);
        processWeatherData(weatherResponse);
        processMinMaxWeatherData(minMaxResponse);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// 날씨 가져오기 (오늘 & 내일)
async function getWeather(data) {
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const response = await axiosGet(url, data);
    const tDate = todayDate.value.replace(/-/g, '');                // 오늘 날짜
    const tmrDate = tomorrowDate.value.replace(/-/g, '');           // 내일 날짜
    if(response.status == '200'){
        const resultCode = response.data.response.header.resultCode;    // 응답 코드
        if (resultCode === '00') {                                      // 성공할 시
            const items = response.data.response.body.items.item;       // 전체 데이터
            const filterToday = items.filter(item => item.fcstDate === tDate && item.fcstTime === getBaseDate().nowHours);
            const filterTomorrow = items.filter(item => item.fcstDate === tmrDate && item.fcstTime === '1200');
            const obj = {
                today: filterToday,
                tomorrow: filterTomorrow,
            };
            return obj;                  
        }
    }
}

// 날씨 가져오기 (오늘 최고,최저 기온 & 내일 최고,최저 기온)
async function getMinMaxWeather(data) {
    const url = '/api/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const response = await axiosGet(url, data);
    const tDate = todayDate.value.replace(/-/g, '');                // 오늘 날짜
    const tmrDate = tomorrowDate.value.replace(/-/g, '');           // 내일 날짜
    if(response.status == '200'){
        const resultCode = response.data.response.header.resultCode;    // 응답 코드
        if (resultCode === '00') {                                      // 성공할 시
            const items = response.data.response.body.items.item;       // 전체 데이터
            const minMaxToday = items.filter(item => item.fcstDate === tDate && (item.category === 'TMN' || item.category === 'TMX'));
            const minMaxTomorrow = items.filter(item => item.fcstDate === tmrDate && (item.category === 'TMN' || item.category === 'TMX'));
            const obj = {
                today : minMaxToday,
                tomorrow : minMaxTomorrow
            }
            return obj;
        }
    }        
}

// 날씨 데이터 처리(오늘 & 내일)
function processWeatherData(response) {
    const todayData = response.today;
    const tmrData = response.tomorrow;

    var tmpItem = todayData.find(item => item.category === 'TMP');
    if (tmpItem) TMP.value = tmpItem.fcstValue;

    var tmpItem2 = tmrData.find(item => item.category === 'TMP');
    if (tmpItem2) TMPTmr.value = tmpItem2.fcstValue;

    // 날씨 아이콘 설정
    iconInit(todayData, weatherIconToday);
    iconInit(tmrData, weatherIconTomorrow);
}

function processMinMaxWeatherData(response) {
    const minMaxTodayData = response.today;
    const minMaxTmrData = response.tomorrow;
    var tmpItem = minMaxTodayData.find(item => item.category === 'TMN');
    if (tmpItem) minTMP.value = tmpItem.fcstValue;

    var tmpItem2 = minMaxTodayData.find(item => item.category === 'TMX');
    if (tmpItem2) maxTMP.value = tmpItem2.fcstValue;

    var tmpItem3 = minMaxTmrData.find(item => item.category === 'TMN');
    if (tmpItem3) minTMPTmr.value = tmpItem3.fcstValue;

    var tmpItem4 = minMaxTmrData.find(item => item.category === 'TMX');
    if (tmpItem4) maxTMPTmr.value = tmpItem4.fcstValue;
}



// 날씨 아이콘 설정
function iconInit(items, targetIcon){
    const sky = items.find(item => item.category === 'SKY')?.fcstValue;
    const rain = items.find(item => item.category === 'PTY')?.fcstValue;
    if (sky === '1') {		
        targetIcon.value = require('@/assets/img/weather/sun.png');         // 맑음
    } else if (rain === '1' || rain === '4') {		
        targetIcon.value = require('@/assets/img/weather/rain.png');        // 비
    } else if (rain === '2' || rain === '3') {		
        targetIcon.value = require('@/assets/img/weather/snowman.png');     // 눈
    } else if (sky === '3' || sky === '4') {                               
        targetIcon.value = require('@/assets/img/weather/cloud.png');       // 흐림
    }
}
</script>