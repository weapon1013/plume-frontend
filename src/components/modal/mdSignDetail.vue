<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo class="mb-2"></Plumelogo>
        </div>
        <div class="mx-4" v-show="showSections.section1">
            <div class="h-19rem relative">
                <div class="flex flex-column">
                    <InputGroup>
                        <InputText 
                            v-model="idVal" 
                            placeholder="아이디" 
                            :class="{'btn-input': !disalbedId}"
                            :disabled="disalbedId"             
                            class="btn-input"/>
                        <Button
                            v-if="!isIdBtnHid"
                            label="중복체크"
                            @click="idCheck"
                            />
                    </InputGroup>
                    <small id="username-help">Enter your username to reset your password.</small>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal" toggleMask placeholder="비밀번호"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal2" toggleMask placeholder="비밀번호확인"/>
                </div>
                <div class="flex flex-column mt-4">
                    <DatePicker v-model="birthVal" dateFormat="yy-m-d" showIcon
                        :manualInput="false" showButtonBar placeholder="생년월일"/>
                </div>
                <div class="flex flex-column mt-4 align-items-center">
                    <input type="radio" id="man" value="man" v-model="genderVal" class="hidden"/>
                    <input type="radio" id="woman" value="woman" v-model="genderVal" class="hidden"/>
                    <div class="switch">
                        <label for="man">남</label>
                        <img src="../../assets/img/man.png" :class="{ show: genderVal === 'man' }">
                        <img src="../../assets/img/woman.png" :class="{ show: genderVal === 'woman' }">
                        <label for="woman">여</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-content-end mt-3">
                <Button label="다음" @click="goToSection('section2')" class="btn-modal"/>
            </div>
        </div>
        <div class="mx-4" v-show="showSections.section2">
            <div class="h-15rem relative">
                <div class="flex flex-column">
                    <InputText v-model="incomeVal" placeholder="수입"/>
                </div>
                <div class="flex flex-column mt-4">
                    <InputGroup>
                        <InputText 
                            v-model="emailVal" 
                            placeholder="이메일"
                            :class="{'btn-input': !disalbedEmail}"
                            :disabled="disalbedEmail"
                            class="btn-input"/>    
                        <Button
                            v-if="!isEmailBtnHid"
                            label="전송"
                            @click="Emailsend"
                        />
                    </InputGroup>
                    
                </div>
                <div class="flex flex-column mt-4">
                    <InputText v-model="certifyVal" placeholder="인증번호"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Textarea>아이우에오 여기는 약관동의화면입니다</Textarea>
                </div>
            </div>
            <div class="flex flex-column justify-end gap-2 mx-4 mt-4">
                <Button type="button" label="회원가입" @click="submit" severity="help" raised></Button>
            </div>
            <div class="flex flex-row justify-content-between mt-3">
                <Button label="이전" @click="goToSection('section1')" class="btn-modal"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import DatePicker from 'primevue/datepicker';
import Plumelogo from "@/components/btn/PlumeLogo.vue";
import Textarea from 'primevue/textarea';
import InputGroup from 'primevue/inputgroup';
import { ref, defineEmits } from 'vue';
import {axiosSet} from '@/plugins/axios';

const emit = defineEmits(['submit-success']);

// default setting
const idVal      = ref(null);       // 아이디
const passVal    = ref(null);       // 비밀번호
const passVal2   = ref(null);       // 비밀번호 확인
const birthVal   = ref(null);       // 비밀번호 확인
const genderVal  = ref('man');      // 성별 - 초기값(남)
const incomeVal  = ref(null);       // 수입 (연2000 미만 / 연2000 - 연5000 / 연5000 - 연8000 / 연8000 초과)
const emailVal   = ref(null);       // 이메일
const certifyVal = ref(null);       // 인증번호
const disalbedId = ref(false);      // 아이디의 disabled 상태
const isIdBtnHid = ref(false);      // 아이디 중복버튼의 표시 여부
const disalbedEmail = ref(false);   // 이메일의 disabled 상태
const isEmailBtnHid = ref(false);   // 이메일의 중복버튼의 표시 여부

// section setting
const showSections = ref({
    section1: true,
    section2: false,
});

// section 이동 메서드
const goToSection = (section) => {
    for(let key in showSections.value) {
        showSections.value[key] = key === section ? !showSections.value[key] : false ;
    }
}

// 아이디 중복체크
const idCheck = async() => {
    try{
        const response = await axiosSet.post("auth/check", {
          checkStr: idVal.value               // 아이디
        , type : 'id'
    });
    if(response.status == 200) {
        isIdBtnHid.value = true;     // 버튼 숨기기
        disalbedId.value = true;      // input 비활성화
    }
    }catch (e) {
        console.log(`${e.name}(${e.code}): ${e.message})`);
  }
}

// 이메일 전송
const Emailsend = async() => {
    try{
        const response = await axiosSet.post("auth/email", {
          userEmail: emailVal.value      // 이메일
    });
    if(response.status == 200) {
        isEmailBtnHid.value = true;     // 버튼 숨기기
        disalbedEmail.value = true;     // input 비활성화
    }
    }catch (e) {
        console.log(`${e.name}(${e.code}): ${e.message})`);
  }
}

// 회원가입
const submit = async () => {
  try {
    const response = await axiosSet.post("/auth/sign", {
          userId: idVal.value               // 아이디
        , userPw: passVal.value             // 비밀번호
        , userBirth: birthVal.value         // 생년월일
        , userGender: genderVal.value       // 성별
        , incomeSeq: incomeVal.value        // 수입
        , userEmail: emailVal.value         // 이메일
    });

    if (response.status == 200) {
        alert('성공!')
        console.log(response.status, response.data);
        emit('submit-success');
    }
  } catch (e) {
        alert('실패 ㅜㅜ');
        console.log(`${e.name}(${e.code}): ${e.message})`);
  }
};
</script>

<style scoped>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
.btn-modal{ background: #fff !important; border: 1px solid rgb(223, 204, 204) !important; color: rgb(68, 68, 68) !important;}
</style>