<script>
export default {
    name: 'AppSearchHeader'
}
</script>

<template>
    <div class="position-absolute search-box">
        <div id="search-collapse">Search</div>

        <form action="#" method="get" id="search-box" class="d-none">
            <div class="mb-3">
                <label for="location" class="form-label">Where</label>
                <input type="text" class="form-control" name="location" id="location" placeholder="Where?" />

            </div>

            <div class="mb-3">
                <label for="number" class="form-label">Where</label>
                <input type="number" class="form-control" name="number" id="number" placeholder="Number?" />

            </div>

            <div>
                <button type="submit" class="btn btn-primary">Cerca</button>
            </div>

        </form>

    </div>
</template>

<style lang="scss" scoped>
.search-box {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>