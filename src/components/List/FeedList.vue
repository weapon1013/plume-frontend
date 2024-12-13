<template>
    <div class="overflow-auto">
        <div class="flex w-auto p-2 m-2 flex-row justify-content-start border-1">
            <!--이미지 section -->
            <div class="slider-container" style="border: 1px solid black">
                <div class="slider-wrapper">
                    <img src="../../assets/img/image.png" class="slide active">
                    <img src="../../assets/img/back_img.jpg" class="slide">
                </div>
                <div class="slider-controls">
                    <i class="pi pi-angle-left"></i>
                    <i class="pi pi-angle-right"></i>
                </div>
                <div class="slider__dot">
                    <!--슬라이드 개수만큼 dot 개수 추가-->
                </div>
            </div>
            
            <!--내용 section-->
            <div class="border-1" style="width:100%">
                <!-- 프로필 section -->
                <div class="section">

                </div>

                <!-- 본문 section -->
                <div class="section">
                    
                </div>

                <!-- 댓글 section -->
                <div class="section">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
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