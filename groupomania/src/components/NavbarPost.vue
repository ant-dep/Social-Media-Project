<template>
    <div class="container-fluid px-0">
        <nav class="Navbar">
            <b-navbar toggleable="md" type="dark" variant="primary">
                <a href="/allpost"><img class="navbar-brand img-fluid logo" src="../assets/icon-left-font-monochrome-black.svg" aria-label="logo groupomania" alt="Logo groupomania"></a>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <div class="d-flex justify-content-end align-items-center">
                            <b-nav-item v-if="isAllpost" id="Accueil" size="sm" class="mr-3 font-weight-bold"><router-link to="/allpost" class="nav-link">Accueil</router-link></b-nav-item>
                            <b-nav-item v-if="isProfile" size="sm" class="mr-3 font-weight-bold"><router-link to="/profile" class="nav-link">Mon Compte</router-link></b-nav-item>
                            <b-nav-item size="sm" class="mr-2 font-weight-bold"  @click="logout" >Se déconnecter</b-nav-item>
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
    created: function() {
    if (window.location.pathname === '/allpost') {
            this.isAllpost = false
        } else if (window.location.pathname === '/profile') {
            this.isProfile = false
        }
    },

    data() {
        return {
            isAllpost: true,
            isProfile: true
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