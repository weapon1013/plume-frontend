<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo class="mb-2"></Plumelogo>
        </div>
        <div class="mx-4" v-show="showSections.section1">
            <div class="h-19rem relative">
                <div class="flex flex-column">
                    <InputText v-model="idVal" placeholder="아이디"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal" toggleMask placeholder="비밀번호"/>
                </div>
                <div class="flex flex-column mt-4">
                    <Password v-model="passVal2" toggleMask placeholder="비밀번호확인"/>
                </div>
                <div class="flex flex-column mt-4">
                    <DatePicker v-model="birthVal" dateFormat="yy-m-d" showIcon :minDate="minDate" :maxDate="maxDate" :manualInput="false" showButtonBar placeholder="생년월일"/>
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
                    <InputText v-model="emailVal" placeholder="이메일"/>
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
import { ref } from 'vue';
import {axiosSet} from '@/plugins/axios';

// default setting
const idVal      = ref(null);       // 아이디
const passVal    = ref(null);       // 비밀번호
const passVal2   = ref(null);       // 비밀번호 확인
const genderVal  = ref('man');      // 성별 - 초기값(남)
const incomeVal  = ref(null);       // 수입 (연2000 미만 / 연2000 - 연5000 / 연5000 - 연8000 / 연8000 초과)
const emailVal   = ref(null);       // 이메일
const certifyVal = ref(null);       // 인증번호

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

const submit = async () => {
  try {
    const response = await axiosSet.post("/auth/join", {
          userId: idVal.value               // 아이디
        , userPw: passVal.value             // 비밀번호
        , userBirth: passVal.value          // 생년월일
        , userNickname: passVal.value       // 성별
        , userEmail: passVal.value          // 수입
    });
    

    // default == 200
    if(response.status == 200) {
      console.log(response.status, response.data);

    }
    if (response.status == 201) {
      console.log(response.status, response.data);
      
    }
  } catch (e) {
    console.log(`${e.name}(${e.code}): ${e.message})`);
  }
};
</script>

<style scoped>
@import "../../assets/css/modal.css";
@import 'primeicons/primeicons.css';
.btn-modal{ background: #fff !important; border: 1px solid rgb(223, 204, 204) !important; color: rgb(68, 68, 68) !important;}
</style>