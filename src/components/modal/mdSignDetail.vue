<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo style="margin-bottom: 20px;"></Plumelogo>
        </div>
        <div class="mx-4" v-show="showSections.section1">
            <div class="h-19rem relative">
                <div class="flex flex-column">
                    <InputText id="username" v-model="nameVal" aria-describedby="username-help" placeholder="아이디"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal" toggleMask placeholder="비밀번호"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal2" toggleMask placeholder="비밀번호확인"/>
                </div>
                <div class="flex flex-column mt-4">
                    <DatePicker placeholder="생년월일" v-model="date" dateFormat="yy-m-d" showIcon :minDate="minDate" :maxDate="maxDate" :manualInput="false" showButtonBar/>
                </div>
                <div class="flex flex-column mt-4 align-items-center">
                    <input type="radio" id="man" value="man" v-model="selectedGender" class="hidden"/>
                    <input type="radio" id="woman" value="woman" v-model="selectedGender" class="hidden"/>
                    <div class="switch">
                        <label for="man">남</label>
                        <img src="../../assets/img/man.png" :class="{ show: selectedGender === 'man' }">
                        <img src="../../assets/img/woman.png" :class="{ show: selectedGender === 'woman' }">
                        <label for="woman">여</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-content-end mt-3">
                <Button label="다음" @click="goToSection('section2')"/>
            </div>
        </div>
        <div class="mx-4" v-show="showSections.section2">
            <div class="h-15rem relative">
                <div class="flex flex-column">
                    <label for="username">수입</label>
                    <div class="flex flex-column gap-2 mt-2">
                        <!-- <Slider v-model="categoryVal" class="w-56" /> -->
                        <!-- <div v-for="category in categories" :key="category.key" class="flex items-center">
                            <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic" :value="category.name" />
                            <label :for="category.key" class="ml-2">{{ category.name }}</label>
                        </div> -->
                        <div class="range-slider grad" style='--min:0; --max:10000; --step:100; --value:200; --text-value:"200"; --prefix:"$"'>
                            <input type="range" min="0" max="10000" step="100" value="200" oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify((+this.value).toLocaleString()))">
                            <output></output>
                            <div class='range-slider__progress'></div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-column mt-4">
                    <InputText id="email" v-model="emailVal" placeholder="이메일"/>
                </div>
                <div class="flex flex-column mt-4">
                    <InputText id="certify" v-model="certifyVal" placeholder="인증번호"/>
                </div>
                <div class="flex flex-column gap-2">
                    <label>약관동의화면</label>
                    <Textarea>아이우에오 여기는 약관동의화면입니다</Textarea>
                </div>
            </div>
            <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
                <Button type="button" label="회원가입" @click="visible = false" severity="help" raised></Button>
            </div>
            <div class="flex flex-row justify-content-between mt-3">
                <Button label="이전" @click="goToSection('section1')"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import DatePicker from 'primevue/datepicker';
//import RadioButton from 'primevue/radiobutton';
// import Slider from 'primevue/slider';
import { ref } from 'vue';
import Plumelogo from "@/components/btn/PlumeLogo.vue";
import Textarea from 'primevue/textarea';

const visible = ref(false);
const nameVal = ref(null);
const passVal = ref(null);
const passVal2 = ref(null);
const selectedGender = ref('man'); // 초기값 설정
// const categoryVal = ref(null);
//const selectedCategory = ref('');
// const categories = ref([
//     { name: '연 2000만원 미만', key: 'A' },
//     { name: '연 2000만원 이상 - 연 5000만원 미만', key: 'B' },
//     { name: '연 5000만원 이상 - 연 8000만원 미만', key: 'C' },
//     { name: '연 8000만원 초과', key: 'D' }
// ]);
const emailVal = ref('');
const certifyVal = ref('');

//날짜 최대최소 설정
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;

const date = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

const showSections = ref({
    section1: false,
    section2: true,
    section3: false,
})

const goToSection = (section) => {
    for(let key in showSections.value) {
        showSections.value[key] = key === section ? !showSections.value[key] : false ;
    }
}
</script>

<style scoped>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';

.switch{
    width:100%;
    height:3rem;
    text-align: center;
    background-color: #7469B6;
    transition : all 0.2s ease ;
    border-radius : 10px ;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.2rem;
}
.switch label{
    cursor :pointer;
    color : #554747a1;
    width :60px;
    line-height :50px;
    transition :all 0.2s ease;
}
.switch label:hover{
    color:black;
}
.switch img{
    color:white;
    width: 2rem;
    opacity: 0;
    transition: opacity 0.8s ease;
    position: absolute; /* Position to allow smooth transition */
}
.switch img.show {
    opacity: 1;
}
#woman:checked ~ .switch { background: #F8B7B3; }
#man:checked ~ .switch label[for=man]{ color : white;}
#woman:checked ~ .switch label[for=woman]{ color: white;}
.range-slider.grad {
  --progress-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2) inset;
  --progress-flll-shadow: var(--progress-shadow);
  --fill-color: linear-gradient(to right, LightCyan, var(--primary-color));
  --thumb-shadow: 0 0 4px rgba(0, 0, 0, 0.3),
    -3px 9px 9px rgba(255, 255, 255, 0.33) inset,
    -1px 3px 2px rgba(255, 255, 255, 0.33) inset,
    0 0 0 99px var(--primary-color) inset;
}
.range-slider.grad input:hover { --thumb-transform: scale(1.2);}
.range-slider.grad input:active { --thumb-shadow: inherit; --thumb-transform: scale(1); }
</style>