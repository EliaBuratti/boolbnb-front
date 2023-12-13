<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer class="bg-dark text-light py-3">
        <div class="container">
            <div class="row row-cols-md-2 row-cols-1 g-3 justify-content-between">
                <span class="col">BoolBnB ©, 2023</span>
                <div class="col d-flex justify-content-end github">
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
.github {
    font-size: 0.85rem;
}
</style>