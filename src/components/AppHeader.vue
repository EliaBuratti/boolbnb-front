<script>
import AppSearchHeader from './AppSearchHeader.vue';
export default {
    name: 'AppHeader',
    components: {
        AppSearchHeader,
    }
}
</script>

<template>
    <header class="py-3 w-100">
        <nav class="navbar navbar-expand-sm navbar-light">
            <div class="container">
                <a class="navbar-brand" href="#">BoolBnb Logo</a>
                <AppSearchHeader></AppSearchHeader>
                <a class="nav-link active" aria-current="page" href="#">Login</a>
            </div>
        </nav>

    </header>
</template>

<style lang="scss" scoped></style>