<script>
export default {
    name: 'AppHeader',
}
</script>

<template>
    <header class="bg-white py-3 w-100 sticky-top">
        <nav class="navbar navbar-expand-sm navbar-light">
            <div class="container">
                <router-link class="navbar-brand" to="/"><img src="../assets/img/Boolbnb.png" width="100"></router-link>
                <div class="d-flex gap-3">
                    <a class="nav-link active" aria-current="page" href="http://127.0.0.1:8000/login">Login</a>
                    <a class="nav-link active" aria-current="page" href="http://127.0.0.1:8000/register">Register</a>
                </div>

            </div>
        </nav>

    </header>
</template>

<style lang="scss" scoped></style>