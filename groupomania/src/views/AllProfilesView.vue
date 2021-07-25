<template>
  <div class="AllProfiles">
    <Navbar />
    <AllProfiles v-for="user in users" :key="user.id">
        <template v-slot:Users v-if="users !== null">
            <div class="container-fluid">
                <div class="row mx-auto mb-5">
                    <div class="col-8 col-lg-6 mx-auto border rounded bg-primary py-2">
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
                            <b-link class="delete badge badge-light font-weight-bold py-1 my-5" @click.prevent="deleteUser(user.id)"><small>Supprimer ce compte</small></b-link>
                        </div>
                        <hr class="line w-100 mb-1">
                    </div>
                </div>
            </div>
        </template>
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

  created() {
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
                imageUrl: "",
                createdAt: "",
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

