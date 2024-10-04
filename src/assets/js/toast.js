import {app} from '@/main.js';


// 성공 토스트
export function sToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'success', summary: note || 'Success Message', detail: msg, life: time ||3000})
}

// 인포 토스트
export function iToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'info', summary: note || 'Info Message', detail: msg, life: time ||3000})
}

// 경고 토스트
export function wToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'warn', summary: note || 'Warn Message', detail: msg, life: time || 3000 })
}

// 에러 토스트
export function eToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'error', summary: note || 'Error Message', detail: msg, life: time ||3000 })
}

// 보조 토스트
export function tToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'secondary', summary: note || 'Secondary Message', detail: msg, life: time ||3000 })
}

// 대비 토스트
export function cToast(msg,note,time) {
    app.config.globalProperties.$toast.add({ severity: 'contrast', summary: note || 'Contrast Message', detail: msg, life: time ||3000 })
}
