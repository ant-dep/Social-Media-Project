<template>
  <div class="AllProfiles">
    <Navbar />
        <AllProfiles
        v-for="user in users"
        :userId ="user.userId"
        :pseudo ="user.User.pseudo"
        :email ="user.email"
        :createdAt ="user.createdAt"
        :key="user.id" >
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
  components: {
    Navbar, AllProfiles, Footer
  },

  async beforeCreate() {

    if (parseInt(localStorage.getItem('userId')) === 4) {
            this.isActive = true
        }

    // USERS
    await axios
        .get('http://localhost:3000/api/users', {
        headers: {
            "Content-Type": "multipart/form-data",
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

    data() {
        return {
            users: [],
            token: localStorage.getItem('token'),
            userId: "",
            pseudo: "",
            email: "",
            isActive: false
        }
    },
}
</script>

