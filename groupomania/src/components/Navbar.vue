<template>
    <div class="Navbar">
        <b-navbar toggleable="md" type="dark" variant="primary">
            <a href="/"><img class="img-fluid logo" src="../assets/icon-left-font-monochrome-black.svg" aria-label="logo groupomania" alt="Logo groupomania"></a>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    user: false
}
</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
    color: white;
}
.logo {
    max-height: 80px;
    max-width: 120px;
}
</style>