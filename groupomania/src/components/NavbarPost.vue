<template>
    <div class="container-fluid px-0">
        <nav class="Navbar">
            <b-navbar toggleable="md" type="dark" variant="primary">
                <a href="/"><img class="navbar-brand img-fluid logo" src="../assets/icon-left-font-monochrome-black.svg" aria-label="logo groupomania" alt="Logo groupomania"></a>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <div class="d-flex justify-content-end align-items-center">
                            <b-nav-item v-if="isActive" id="Accueil" size="sm" class="mr-sm-3 font-weight-bold"><router-link to="/allpost" class="nav-link">Accueil</router-link></b-nav-item>
                            <b-nav-item size="sm" class="mr-sm-3 font-weight-bold"><router-link to="/profile" class="nav-link">Mon Compte</router-link></b-nav-item>
                            <b-nav-item size="sm" class="mr-sm-2 font-weight-bold"  @click="logout" >Se déconnecter</b-nav-item>
                        </div>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </nav>
    </div>
</template>

<script>
export default {
    // Check if the current page is allpost and hide the "Acceuil" button now useless
    mounted: function() {
    if (window.location.pathname === '/Allpost') {
            this.isActive = false
        }
    },

    data() {
        return {
            isActive: true
        }
    },
    name: 'NavbarPost',
    methods: {
    logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('pseudo')
        localStorage.removeItem('userId')

        this.$router.push('/login')
    },
},


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