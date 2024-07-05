<template>
    <div class="container">
        <header class="d-flex justify-content-between align-items-center border-bottom py-3">
            <div class="d-flex align-items-center">
                <div class="border-right">
                    <router-link to="/" class="fs-2 m-3">
                        <i class="bi bi-search-heart"></i>
                    </router-link>
                </div>
                <div class="ms-3">
                    <input type="search" placeholder="Search..." aria-label="Search" class="form-control ml-3"/>
                </div>
            </div>
            <ul class="d-flex nav">
                <li><router-link to="/feed" class="nav-link px-2" >Feed</router-link></li>
                <li><router-link to="/recm" class="nav-link px-2" >Recommend</router-link></li>
                <li><router-link to="/rank" class="nav-link px-2" >Rank</router-link></li>
            </ul>
            <div class="d-flex">
                <button type="button" class="btn btn-outline-primary me-2"><router-link to="/sign" class="nav-link">Sign up</router-link></button>
                <button type="button" class="btn btn-outline-primary"><router-link to="/login" class="nav-link">Login</router-link></button>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    
}

</script>

<style scoped>
.border-right{ border-right: 1px solid #ccc;}
</style>