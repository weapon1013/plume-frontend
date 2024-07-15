<template>
    <div class="card flex justify-center">
        <Button label="Login" @click="visible = true" />
        <Dialog v-model:visible="visible" modal>
            <!-- <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <img src="../assets/img/plume_logo_temp.svg">
                </div>
            </template> -->
            <div class="aa">
                <div class="abcd">
                    abcd
                </div>
                <div class="efgh">
                    efgh
                </div>
            </div>
            <div class="card flex justify-center">
                <FloatLabel>
                    <InputText id="username" v-model="nameVal" autocomplete="off"/>
                    <label for="username">Username</label>
                </FloatLabel>
            </div>
            <div class="card flex justify-center">
                <FloatLabel>
                    <InputText id="email" v-model="emailVal" autocomplete="off"/>
                    <label for="email">email</label>
                </FloatLabel>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="visible = false"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref } from 'vue';

const visible = ref(true);
const nameVal = ref(null);
const emailVal = ref(null);
</script>


<style>
@import "../assets/css/modal.css";
.p-dialog{
    width: 50rem !important;
    height: 40rem;
    background-color: burlywood !important;
}

.p-dialog-header-actions{display:none !important;}

.aa{display:flex; justify-content: center; width: 45rem !important;
    height: 30rem;}
.abcd{display:flex; border: 1px solid black;     width: 100%; height:100%}
.efgh{display:flex; border: 1px solid black;     width: 100%;height:100%}
</style>


