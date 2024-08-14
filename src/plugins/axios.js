import axios from "axios"

const axiosSet = axios.create({
    baseURL : process.env.VUE_APP_API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

export {axiosSet};

// get방식 예제
/*
const get = () => {
    axiosSet({
        url: "/" ,
        data : {
            userId: '1',
            title:  'Article title',
            body:   'Article body content'
        }
    })
    .then((response) => {
        if(response.status == 200){
            console.log('200' + response.data);
        }
    })
    .catch((e) => {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    })
}
*/

// post방식 예제
/*
const post = async () => {
  try {
    const response = await axiosSet.post("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    // 201: created
    if (response.status == 201) {
      console.log(response.status, response.data);
    }
  } catch (e) {
    console.log(`${e.name}(${e.code}): ${e.message})`);
  }
};
*/