<template>
    <div class="container-fluid">
            <div class="row">
                <div class="col-8 mx-auto">
                    <h1 class="my-4">Votre profil</h1>
                </div>
                <div class="col-8 mx-auto">
                        <img alt="Profil image" class="rounded-circle py-2" src="https://picsum.photos/80/80/?random?image=4">
                        <p class="text-secondary font-weight-bold">{{ pseudo}}</p>
                </div>
            </div>
            <div class="form-group mt-4">
                <div class="row">
                    <div class="col-8 mx-auto">
                        <b-link class="btn bg-groupomania mr-5 font-weight-bold mb-5" to="Allpost">Voir le forum</b-link>
                        <b-link class="btn bg-groupomania font-weight-bold mb-5" to="Addpost">Rédiger un post</b-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 mx-auto">
                        <b-link class="delete badge badge-light font-weight-bold py-1 my-5" @click.prevent="deleteUser"><small>Supprimer mon compte</small></b-link>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import axios from "axios";


export default {
    name: 'profile',
    data() {
        return {
            token: localStorage.getItem('token'),
            name:"",
            image: "",
            pseudo: localStorage.getItem('pseudo'),
            userId: parseInt(localStorage.getItem('userId')),
            submited: false,
        }
    },

    validations: {
    name: {
            required,
        },
    },

  beforeCreate() {
    axios
        .get('http://localhost:3000/api/users/profile', {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {
        console.log(response);
        })
        .catch(e => {
        console.log(e + "User inconnu");
        this.$router.push('/login');
        window.alert('Veuillez vous connecter pour accéder au site')
        })
  },

    methods:{

        handleFileUpload(){
            this.image = this.$refs.image.files[0];
        },

        deleteUser() {
            const id = this.userId;
            const isAdmin = 1 ;
            if(id == id || isAdmin == 1) {
                axios
                    .delete('http://localhost:3000/api/users/' + id, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        console.log(res);
                        alert("Votre compte à bien été supprimé !");
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("pseudo");
                        this.$router.push('/signup');
                    })
                    .catch(error => (console.log('cannot delete user ' + error )))
            }
        }
    }
}
</script>

<style>
.bg-groupomania {
    background-color: #FFD7D8;
}
.delete {
    border: 1px solid #FFD7D8;
    color: black;
}
</style>