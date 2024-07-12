<template>
    <header class="layout-topbar">
        <div class="layout-topbar-start">
            <router-link to="/">
                <img src="../assets/img/plume_logo_temp.svg">
            </router-link>
            <i class="pi pi-search"></i>
            <input placeholder="검색창">
        </div>
        <div class="layout-topbar-mid">
            <ul class="list-none">
                <li>
                    <router-link to="/feed">
                        <span>Feed</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/recm">
                        <span>Recommend</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/rank">
                        <span>Rank</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="layout-topbar-end">
            <router-link to="/sign" class="block-action">
                <span>Sign up</span>
            </router-link>
            <router-link to="/login" class="block-action">
                <span>Login</span>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {

}

</script>

<style scoped>

.list-none{
    display: flex;
    align-items: center;
}

.list-none li{
    display: flex;
    padding: .5rem 1rem;
    align-items: center;
    overflow: hidden;
    position:relative;
}

.list-none li a{
    text-decoration-line: none;
    font-weight: 500;
    color: var(--primary-menu-color);
}

</style>