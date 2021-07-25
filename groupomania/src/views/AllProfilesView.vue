<template>
  <div class="AllProfiles">
    <Navbar />
    <AllProfiles
        v-for="user in users"
        :userId ="user.id"
        :pseudo ="user.pseudo"
        :email ="user.email"
        :key="user.id"
    >
    </AllProfiles>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AllProfiles from '@/components/AllProfiles.vue'
import Footer from '@/components/Footer.vue'

import axios from "axios";

export default {
  name: 'AllProfiles',

  mounted() {
            axios
                .get('http://localhost:3000/api/users', {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                this.users = response.data;
                console.log(response);
                })
                .catch(e => {
                console.log(e + "User inconnu ou Users indisponibles");
                })
    },

  components: {
    Navbar, AllProfiles, Footer
  },

    data() {
        return {
            users: [],
            user: {
                id: "",
                pseudo: "",
                email: "",
            }
        }
    },

    methods: {

        deleteUser(id) {
            axios
                .delete('http://localhost:3000/api/users/' + id, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Le compte id:" + id + "à bien été supprimé !");
                })
                .catch(error => (console.log('cannot delete user ' + error )))
        }
    }
}
</script>

