<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div class="col-md-3 mb-2 mb-md-0">
                <router-link to="/" class="d-inline-flex link-body-emphasis">
                    <img src="../assets/img/plume_logo_temp.svg" alt="PLUME 로고" class="float-start"/>
                </router-link>
                |
                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                </form>
            </div>
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><router-link to="/feed" class="nav-link px-2 link-secondary">Feed</router-link></li>
                <li><router-link to="/recm" class="nav-link px-2">Recommend</router-link></li>
                <li><router-link to="/rank" class="nav-link px-2">Rank</router-link></li>
                <li></li>
                <li></li>
            </ul>
            <div class="col-md-3 text-end">
                <button type="button" class="btn btn-outline-primary me-2"><router-link to="/sign" class="nav-link px-2">Sign up</router-link></button>
                <button type="button" class="btn btn-primary"><router-link to="/login" class="nav-link px-2">Login</router-link></button>
            </div>
        </header>
        <br/>
    </div>
    <div class="container">
        <header class="border-bottom">
            <div class="row">
                <div class="col-md-3">
                    <router-link to="/" class="">
                        <img src="../assets/img/plume_logo_temp.svg" alt="PLUME 로고" class="float-start"/>
                    </router-link>
                    <span class="">|</span>
                    <input type="search" placeholder="Search..." aria-label="Search" class="">
                </div>
                <div class="col">2</div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-outline-primary me-2"><router-link to="/sign" class="nav-link px-2">Sign up</router-link></button>
                    <button type="button" class="btn btn-primary"><router-link to="/login" class="nav-link px-2">Login</router-link></button>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>