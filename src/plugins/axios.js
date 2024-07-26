import axios from "axios"

const axiosSetting = axios.create({
    baseURL : "http://localhost:8080/plume/",
    timeout: 1000
});

export {axiosSetting};
