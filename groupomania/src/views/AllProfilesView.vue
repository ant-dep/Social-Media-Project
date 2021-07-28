<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between">
    <NavbarPost />
    <h1 class="my-2">Liste des utilisateurs</h1>
    <hr class="line w-100 mt-1 mb-0 p-0">
    <div class="row mx-3 py-2 border rounded bg-primary">
            <span class="col-1 text-white font-weight-bold px-3 my-auto">ID</span>
            <span class="col-1 text-white font-weight-bold px-3 my-auto">PHOTO</span>
            <span class="col-1 text-white font-weight-bold px-3 my-auto">PSEUDO</span>
            <span class="col-5 text-white font-weight-bold px-3 my-auto">EMAIL</span>
            <span class="col-1 text-white font-weight-bold px-3 my-auto">ADMIN</span>
            <span class="col-2 text-white font-weight-bold px-3 my-auto">CRÉÉ LE</span>
        </div>

    <AllProfiles v-for="user in users" :key="user.id">
        <template v-slot:AllUsers>
            <div class="row">
                <span class="col-1 text-white font-weight-bold px-3 my-auto">{{ user.id }}</span>
                <img id="imgProfile" :src="user.imageUrl" class="col-1">
                <span class="col-1 text-white font-weight-bold px-3 my-auto">{{ user.pseudo }}</span>
                <span class="col-5 text-white font-weight-bold px-3 my-auto">{{ user.email }}</span>
                <span class="col-1 text-white font-weight-bold px-3 my-auto">{{ user.isAdmin }}</span>
                <span class="col-2 text-white font-weight-bold px-3 my-auto">{{ user.createdAt.substr(0, 10).split("-").reverse().join("-") }}</span>

                <button class="col-1 delete badge badge-danger text-black font-weight-bold py-1" @click.prevent="deleteUser(user.id)">Bannir</button>
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
            userId: parseInt(localStorage.getItem('userId')),
            users: [],
            user: {
                id: "",
                pseudo: "",
                email: "",
                imageUrl: "",
                createdAt: "",
                isAdmin: ""
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

#imgProfile {
    border-radius: 50%;
    height: 60px;
    width: 60px;
}

</style>

