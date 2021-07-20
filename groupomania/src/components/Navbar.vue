<template>
    <div class="Navbar">
        <b-navbar toggleable="md" type="dark" variant="primary">
            <a href="/"><img class="img-fluid logo" src="../assets/icon-left-font-monochrome-black.svg" aria-label="logo groupomania" alt="Logo groupomania"></a>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <div class="d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="mr-2 bi bi-person-fill" viewBox="2 1 10 13">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                        <b-nav-item size="sm" class="mr-sm-2 font-weight-bold"><router-link to="/login" class="nav-link">Se connecter</router-link></b-nav-item>
                    </div>
                    <b-nav-item size="sm" class="mr-sm-2 font-weight-bold"><router-link to="/signup" class="nav-link">S'inscrire</router-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
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