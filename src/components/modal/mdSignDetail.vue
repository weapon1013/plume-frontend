<template>
    <div class="modal_left">
        <div class="flex justify-content-center my-5">
            <Plumelogo class="mb-2"></Plumelogo>
        </div>
        <div class="mx-4" v-show="showSections.section1">
            <div class="h-19rem relative">
                <div class="flex flex-column">
                    <InputGroup>
                        <InputText v-model="idVal" placeholder="아이디" :class="{'btn-input': !disalbedId}" :disabled="disalbedId"/>
                        <Button v-if="!isIdBtnHid" label="중복체크" @click="idCheck" data/>
                    </InputGroup>
                    <small class="ml-2 text-red-500" id="id-help">{{ idHelpText }}</small>
                </div>
                <div class="flex flex-column mt-3">
                    <Password v-model="passVal" toggleMask placeholder="비밀번호" :feedback="false"/>
                    <small class="ml-2 text-red-500" id="pw-help">{{ pwHelpText }}</small>
                </div>
                <div class="flex flex-column mt-3">
                    <Password v-model="passVal2" toggleMask placeholder="비밀번호확인" :feedback="false"/>
                    <small class="ml-2 text-red-500" id="pw-help2">{{ pwHelpText2 }}</small>
                </div>
                <div class="flex flex-column mt-3">
                    <DatePicker v-model="birthVal" dateFormat="yy-mm-dd" showIcon showButtonBar placeholder="생년월일 예)2000-01-01"/>
                </div>
                <div class="flex flex-column mt-3 align-items-center">
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
                    <div>수입</div>
                    <input type="range" id="a" name="ages" min="1" max="4" step="1" v-model="incomeVal">
                    <output>{{ incomeText }}</output>
                </div>
                <div class="flex flex-column mt-4">
                    <InputGroup>
                        <InputText v-model="emailVal" placeholder="이메일" :class="{'btn-input': !disalbedEmail}" :disabled="disalbedEmail" class="btn-input" />    
                        <Button v-if="!isEmailBtnHid" label="전송" @click="Emailsend" />
                    </InputGroup>
                    <small class="ml-2 text-red-500" id="email-help">{{ emailHelpText }}</small>
                </div>
                <div class="flex flex-column mt-4">
                    <div>인증번호</div>
                    <InputOtp v-model="certifyVal" integerOnly :length="6"/>
                    <Button label="인증번호 확인" @click="OtpCheck" />
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
import InputOtp from 'primevue/inputotp';
import { ref, defineEmits, watch, computed } from 'vue';
import { axiosGet, axiosPost} from '@/plugins/axios';
import { filterValue, validateValue } from '@/assets/js/common.js';
import { sToast, wToast, eToast } from '@/assets/js/toast';

const emit = defineEmits(['submit-success']);

// default setting
const idVal      = ref(null);       // 아이디
const passVal    = ref(null);       // 비밀번호
const passVal2   = ref(null);       // 비밀번호 확인
const birthVal   = ref(null);       // 비밀번호 확인
const genderVal  = ref('man');      // 성별 - 초기값(남)
const incomeVal  = ref(1);          // 수입 (연2000 미만 / 연2000 - 연5000 / 연5000 - 연8000 / 연8000 초과)
const emailVal   = ref(null);       // 이메일
const certifyVal = ref(null);       // 인증번호
const disalbedId = ref(false);      // 아이디의 disabled 상태
const isIdBtnHid = ref(false);      // 아이디 중복버튼의 표시 여부
const disalbedEmail = ref(false);   // 이메일의 disabled 상태
const isEmailBtnHid = ref(false);   // 이메일의 중복버튼의 표시 여부
const disalbedPw = ref(false);      // 비밀번호 확인 상태

const idHelpText = ref('영문(소문자), 숫자 조합 (4-10자)');
const pwHelpText = ref('영문(대소문자),숫자,특수문자 조합 (8-16자)');
const pwHelpText2 = ref('');
const emailHelpText = ref('');

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

// 수입 텍스트 동적으로 변경
const incomeText = computed(() => {
    if (incomeVal.value == 1) {
        return '연2000 미만';
    } else if (incomeVal.value == 2) {
        return '연2000 이상 - 연 5000 미만';
    } else if (incomeVal.value == 3) {
        return '연2000 이상 - 연 8000 미만';
    } else {
        return '연8000 초과';
    }
});

// 아이디 중복체크
const idCheck = () => {
    const data = {
        checkStr: idVal.value,  // 아이디 값
        type: 'id'              // 체크 타입 (id or nick)
    };
  
    axiosGet("auth/check", data)
    .then((response) => {
      var idExists = response.data.data.check;
      if (response.status === 200) {
        if(!idExists){
            sToast('아이디 사용가능😎', 'Id Check Success');
            isIdBtnHid.value = true;   // 버튼 숨기기
            disalbedId.value = true;   // input 비활성화
        } else {
            wToast('아이디 사용불가능😵', 'Id Check Error');
        }
      }
    }).catch((e) => {
        eToast('잠시 후에 다시 시도해주세요😱','Server Error')
        console.log(`${e.name}(${e.code}): ${e.message})`);
    });
};

// 이메일 전송
const Emailsend = () => {
    const data = {
        userEmail: emailVal.value      // 이메일
    };

    axiosPost("auth/email", data)
    .then((response) => {
        if(response.status == 200){
            sToast('이메일 전송성공💌💨', 'Email Send Success');
            isEmailBtnHid.value = true;     // 버튼 숨기기
            disalbedEmail.value = true;     // input 비활성화
        } else {
            wToast('이메일 전송실패🏴‍☠️', 'Email Send Fail')
        }
    }).catch((e) => {
        eToast('잠시 후에 다시 시도해주세요😱','Server Error')
        console.log(`${e.name}(${e.code}): ${e.message})`);
    })
}

// 인증번호 확인
const OtpCheck = () => {
    const data = {
        code: certifyVal.value      // 이메일
    };
    axiosGet("auth/email", data)
    .then((response) => {
        if(response.status == 200){
            sToast('인증번호 확인성공✨', 'Otp Check Success');
        } else {
            wToast('인증번호 확인실패⚠', 'Otp Check Fail')
        }
    }).catch((e) => {
        eToast('잠시 후에 다시 시도해주세요😱','Server Error')
        console.log(`${e.name}(${e.code}): ${e.message})`);
    })
}

// 회원가입
const submit = () => {
    const data = {
          userId:       idVal.value                 // 아이디
        , userPw:       passVal.value               // 비밀번호
        , userBirth:    birthVal.value              // 생년월일
        , userGender:   genderVal.value             // 성별
        , incomeSeq:    incomeVal.value             // 수입
        , userEmail:    emailVal.value              // 이메일
    }

    if(!disalbedId.value){
        wToast('아이디 중복체크⚠','Check required information')
        return false;
    } else if(!disalbedEmail.value){
        wToast('이메일 중복체크⚠','Check required information')
        return false;
    } else if(!disalbedPw.value){
        wToast('비밀번호를 확인⚠','Check required information')
        return false;
    }

    if(validateValue(data)){
        axiosPost("auth/sign", data)
        .then((response) => {
            if (response.status == 200) {
                sToast('🎉회원가입 완료🎉', 'Welcome to Plume')
                console.log(response.status, response.data);
                emit('submit-success');
            }
        }).catch((e) => {
            eToast('잠시 후에 다시 시도해주세요😱','Server Error')
            console.log(`${e.name}(${e.code}): ${e.message})`);
        })
    }
};

//아이디
watch(idVal, (newValue) => {
    if(!filterValue(newValue, 1)){
        idHelpText.value = '영문(소문자), 숫자 조합 (4-10자)';
    } else {
        idHelpText.value = '';
    }
});

// 비밀번호
watch(passVal, (newValue) => {
    if(!filterValue(newValue, 2)){
        pwHelpText.value = '영문(대소문자),숫자,특수문자 조합 (8-16자)';
    } else {
        pwHelpText.value = ' ';
    }
});

// 비밀번호 확인
watch([passVal,passVal2], ([newPassVal,newPassVal2]) => {
    if(newPassVal2){
        if(newPassVal !== newPassVal2){
            pwHelpText2.value = '비밀번호와 일치X';
            disalbedPw.value = false;
        } else {
            pwHelpText2.value = ' ';
            disalbedPw.value = true;
        }
    }
});

// 이메일
watch(emailVal, (newValue) => {
    if(!filterValue(newValue, 3)){
        emailHelpText.value = '이메일 형식 확인';
    } else {
        emailHelpText.value = ' ';
    }
});
</script>
<style scoped>
@import "../../assets/css/modal.css";
@import "primeicons/primeicons.css";
.btn-modal{ background: #fff !important; border: 1px solid rgb(223, 204, 204) !important; color: rgb(68, 68, 68) !important;}
</style>