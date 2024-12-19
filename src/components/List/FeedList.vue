<template>
    <div class="overflow-auto">
        <div class="flex w-auto p-2 m-2 flex-row justify-content-start border-1">
            <!--이미지 section -->
            <div class="slider-container" style="border: 1px solid black">
                <div class="slider-wrapper" id="slide_list">
                    <img src="../../assets/img/image.png" class="slide active">
                    <img src="../../assets/img/back_img.jpg" class="slide">
                </div>
                <div class="slider-controls">
                    <i class="pi pi-angle-left" onclick=""></i>
                    <i class="pi pi-angle-right"></i>
                </div>
                <div class="slider__dot" id="slde_dot">
                    <!--슬라이드 개수만큼 dot 개수 추가-->
                </div>
            </div>
            
            <!--내용 section-->
            <div class="content_wrap">
                <!-- 프로필 section -->
                <div class="prof" style="border-bottom: 1px solid black;">
                    <span class="prof_img"><img src="../../assets/img/image.png"></span>
                    <span class="prof_nick font-semibold">닉네임</span>
                </div>
                
                
                <!-- 본문 section -->
                <div class="content_wrapper" style="border-bottom: 1px solid black;">
                    <div class="prof">
                        <img src="../../assets/img/image.png">
                    </div>
                    <div class="content_wrapper">
                        <span class="font-semibold">닉네임asdfa</span>
                        <span class="content_item">
                            국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다.
                        </span>
                    </div>
                </div>

                <!-- 댓글 section -->
                <div class="reply_wrapper">
                    <div class="prof">
                        <img src="../../assets/img/man.png">
                    </div>
                    <div class="content_wrapper">
                        <div class="prof_nick font-semibold">닉네임asdfasdfasdfa</div>
                        <span class="content_item">
                            국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
var count = document.querySelector('slider-wrapper');

</script>
<style>
.content_wrap { padding-left: 1rem; width: 100%; }
.prof { display: flex; padding-top: 0.5rem; gap: 0.3rem; align-items: center; flex-shrink: 0; }
.prof img { width: 50px; height: 50px; border-radius: 30px; }
.content_wrapper { display: flex; flex-wrap: nowrap; align-items: center; gap: 0.5rem; width: 100%; }
.prof_nick { flex-shrink: 0; white-space: nowrap; text-overflow: ellipsis; max-width: 150px; }
.content_item { display: inline; text-align: left; padding-left: 0.5rem; line-height: 1.5; padding-top: 1rem; word-wrap: break-word;}
.reply_wrapper { display: flex; flex-wrap: nowrap; align-items: center; gap: 0.5rem; width: 100%; }


/* 슬라이더 컨테이너 스타일 */
.slider-container {
    position: relative;
    width: 17rem;
    height: 28rem;
    overflow: hidden; /* 슬라이더 밖의 이미지는 숨김 */
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
}

/* 슬라이더 내부 이미지 스타일 */
.slider-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    align-items: center; /* 슬라이더 내 이미지 세로 중앙 정렬 */
    justify-content: center; /* 슬라이더 내 이미지 가로 중앙 정렬 */
    width: 100%; /* 슬라이더의 너비를 부모 컨테이너에 맞춤 */
    height: 100%; /* 슬라이더의 높이를 부모 컨테이너에 맞춤 */
}

.slide {
    max-width: 100%; /* 부모 너비를 넘지 않도록 제한 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 제한 */
    width: auto; /* 비율 유지 */
    height: auto; /* 비율 유지 */
    display: none; /* 기본적으로 숨김 */
    object-fit: contain; /* 이미지를 비율에 맞게 조정 */
}

.slide.active {
    display: block; /* 활성화된 슬라이드는 보임 */
    margin: auto;
}

/* 슬라이더 컨트롤 버튼 스타일 */
.slider-controls {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.slider-controls i {
    background-color: rgb(255 247 247 / 77%);;
    color: #745454;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
}
</style>