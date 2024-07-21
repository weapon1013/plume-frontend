<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <img src="../../assets/img/plume_logo_temp.svg">
        </div>
        <div class="mx-4" v-show="showSections.section1">
            <div class="h-18rem relative">
                <div class="flex flex-column">
                    <InputText id="username" v-model="nameVal" aria-describedby="username-help" placeholder="아이디"/>
                </div>
                <div class="flex flex-column mt-3">
                    <Password v-model="passVal" toggleMask placeholder="비밀번호"/>
                </div>
                <div class="flex flex-column mt-3">
                    <Password v-model="passVal2" toggleMask placeholder="비밀번호확인"/>
                </div>
                <div class="flex flex-column mt-3">
                    <DatePicker placeholder="생년월일" v-model="date" dateFormat="yy-m-d" showIcon :minDate="minDate" :maxDate="maxDate" :manualInput="false" showButtonBar/>
                </div>
            </div>
            <div class="flex flex-row justify-content-end mt-3">
                <Button label="다음" @click="goToSection('section2')"/>
            </div>
        </div>
        <div class="mx-4" v-show="showSections.section2">
            <div class="h-18rem relative">
                <label for="username">성별</label>
                <div class="flex justify-content-start gap-4 mt-2">
                    <div class="flex items-center">
                        <RadioButton v-model="sex" inputId="sex1" name="sex" value="man" />
                        <label for="sex1" class="ml-2">남성</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton v-model="sex" inputId="sex2" name="sex" value="woman" />
                        <label for="sex2" class="ml-2">여성</label>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <label for="username">수입</label>
                <div class="flex flex-column gap-2 mt-2">
                    <div v-for="category in categories" :key="category.key" class="flex items-center">
                        <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic" :value="category.name" />
                        <label :for="category.key" class="ml-2">{{ category.name }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-content-between mt-3">
                <Button label="이전" @click="goToSection('section1')"/>
                <Button label="다음" @click="goToSection('section3')"/>
            </div>
        </div>
        <div class="mx-4" v-show="showSections.section3">
            <div class="flex flex-column gap-2">
                <label for="email">이메일</label>
                <InputText id="email" v-model="emailVal" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="certify">인증번호입력</label>
                <InputText id="certify" v-model="certifyVal" />
            </div>
            <div class="flex flex-column gap-2">
                <label>약관동의화면</label>
                <textarea>아이우에오 여기는 약관동의화면입니다</textarea>
            </div>
            <div class="flex flex-row justify-content-start mt-3">
                <Button label="이전" @click="goToSection('section2')"/>
            </div>
            <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
                <Button type="button" label="회원가입" @click="visible = false" severity="help" raised></Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import DatePicker from 'primevue/datepicker';
import RadioButton from 'primevue/radiobutton';
import { ref } from 'vue';

const visible = ref(false);
const nameVal = ref(null);
const passVal = ref(null);
const passVal2 = ref(null);
const sex = ref('');
const selectedCategory = ref('');
const categories = ref([
    { name: '연 2000만원 미만', key: 'A' },
    { name: '연 2000만원 이상 - 연 5000만원 미만', key: 'B' },
    { name: '연 5000만원 이상 - 연 8000만원 미만', key: 'C' },
    { name: '연 8000만원 초과', key: 'D' }
]);
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

// const showSections = ref({
//     section1: true,
//     section2: false,
//     section3: false,
// })

// 임시
const showSections = ref({
    section1: true,
    section2: false,
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
</style>