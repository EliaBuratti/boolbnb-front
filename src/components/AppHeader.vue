<script>
export default {
    name: 'AppHeader',
}
</script>

<template>
    <header class="bg-white sticky-top shadow-sm">
        <div class="container d-flex align-items-center justify-content-between  h-100">
            <router-link class="navbar-brand" to="/"><img src="../assets/img/Logo.svg" width="120"></router-link>
            <div class="d-flex gap-3">
                <a class="nav-link hover" aria-current="page" href="http://127.0.0.1:8000/login">Login</a>
                <a class="nav-link hover" aria-current="page" href="http://127.0.0.1:8000/register">Register</a>
            </div>
        </div>
    </header>
</template>