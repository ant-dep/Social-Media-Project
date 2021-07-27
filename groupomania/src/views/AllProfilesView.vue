<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between bg-primary">
    <NavbarPost />
    <h1 class="my-2">Liste des utilisateurs</h1>
    <hr class="line w-100 mt-1 mb-0 p-0">

    <AllProfiles v-for="user in users" :key="user.id">
        <template v-slot:AllUsers>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-white font-weight-bold px-3">{{ user.id }}</span>
                <img id="imgProfile"
                    v-if="users.map((user) => {if (user.id === user.userId) return user.imageUrl;}).join('') !== (null || '')"
                    :src="users.map((user) => {if (user.id === user.userId) return user.imageUrl;}).join('')"
                    class="rounded-circle"
                 >
                <span class="text-white font-weight-bold px-3">{{ user.pseudo }}</span>
                <span class="text-white font-weight-bold px-3">{{ user.email }}</span>
                <span class="text-white font-weight-bold px-3">{{ user.createdAt.substr(0, 10).split("-").reverse().join("-") }}</span>

                <button v-if="user.id !== 4" class="delete badge badge-danger text-black font-weight-bold py-1" @click.prevent="deleteUser(user.id)">Bannir</button>
            </div>
        </template>
    </AllProfiles>
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import AllProfiles from '@/components/AllProfiles.vue'
import Footer from '@/components/Footer.vue'

import axios from "axios";

export default {
    name: 'AllUsers',
    components: {
        NavbarPost, AllProfiles, Footer
    },

    data() {
        return {
            users: [],
            user: {
                id: "",
                pseudo: "",
                email: "",
                imageUrl: "",
                createdAt: "",
            },
        }
    },


    async created() {
        await axios
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
                    this.$router.go()
                })
                .catch(error => (console.log('cannot delete user ' + error )))
        }
    }
}
</script>

<style scoped>

</style>

