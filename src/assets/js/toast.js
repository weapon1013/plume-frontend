import { useToast } from "primevue/usetoast";

export {sToast, iToast, wToast, eToast, tToast, cToast};

const toast = useToast();

// 성공 토스트
const sToast = (msg) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000 });
};

// 인포 토스트
const iToast = (msg) => {
    toast.add({ severity: 'info', summary: 'Info Message', detail: msg, life: 3000 });
};

// 경고 토스트
const wToast = (msg) => {
    toast.add({ severity: 'warn', summary: 'Warn Message', detail: msg, life: 3000 });
};

// 에러 토스트
const eToast = (msg) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: msg, life: 3000 });
};

// 보조 토스트
const tToast = (msg) => {
    toast.add({ severity: 'secondary', summary: 'Secondary Message', detail: msg, life: 3000 });
};

// 대비 토스트
const cToast = (msg) => {
    toast.add({ severity: 'contrast', summary: 'Contrast Message', detail: msg, life: 3000 });
};