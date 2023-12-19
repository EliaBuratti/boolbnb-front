<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer class="bg-dark text-light sticky-bottom">
        <div class="container h-100">
            <div class="row row-cols-lg-2 row-cols-1 justify-content-between align-items-center h-100">
                <span class="col d-flex justify-content-center justify-content-lg-start">BoolBnB ©, 2023</span>
                <div class="col d-flex justify-content-center justify-content-lg-end github">
                    <a href="https://github.com/eliaburatti" class="me-3 nav-link hover" target=”_blank”>Elia Buratti</a>
                    <a href="https://github.com/carlofanelli" class="me-3 nav-link hover" target=”_blank”>Carlo Fanelli</a>
                    <a href="https://github.com/lucafranzoi98" class="me-3 nav-link hover" target=”_blank”>Luca Franzoi</a>
                    <a href="https://github.com/danilosalerno" class="me-3 nav-link hover" target=”_blank”>Danilo
                        Salerno</a>
                </div>
            </div>

        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    height: 50px;
}

.github {
    font-size: 0.6rem;
}

@media screen and (min-width: 440px) {
    .github {
        font-size: 0.85rem;
    }
}
</style>