<template>
    <div class="container-fluid">
            <div class="row">
                <div class="col-8 mx-auto">
                    <h1 class="my-4">Votre profil</h1>
                </div>
                <div class="col-8 mx-auto">
                    <p class="text-secondary font-weight-bold">{{ user.pseudo}}</p>
                    <img alt="Profil image" class="rounded-circle py-2" src="https://picsum.photos/80/80/?random?image=4">
                    <div>
                        <b-button v-b-toggle.newPassword class="btn btn-light text-secondary font-weight-bold">Modifier mes infos</b-button>
                        <b-collapse id="newPassword">
                            <div class="card col-12 col-lg-8 mx-auto bg-white py-4">
                                <h1 class="h3 text-secondary mt-3">Modifier mes infos</h1>
                                <form id="form" class="mt-3" @submit.prevent="updateProfile()" method="post" novalidate="true">
                                    <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.pseudo.$error }">
                                        <div class="col mx-auto position-relative">
                                            <label for="pseudo"></label>
                                            <div class="d-flex justify-content-center input-group">
                                                <span class="icon position-absolute input-group-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                    </svg>
                                                </span>
                                                <input id="pseudo" name="pseudo" type="text" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.pseudo.$model" :placeholder="user.pseudo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.email.$error }">
                                        <div class="col mx-auto position-relative">
                                            <label for="email"></label>
                                            <div class="d-flex justify-content-center input-group">
                                                <span class="icon position-absolute input-group-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                    </svg>
                                                </span>
                                                <input id="email" name="email" type="email" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.email.$model" :placeholder="user.email">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.password.$error }">
                                        <div class="col mx-auto position-relative">
                                            <label for="password"></label>
                                            <div class="d-flex justify-content-center input-group">
                                                <span class="icon position-absolute input-group-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                                                        <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
                                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                                                    </svg>
                                                </span>
                                                <input id="password" name="password" type="password" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.password.$model" placeholder="Mot de passe">
                                            </div>
                                            <span class="badge badge-danger" v-if="!$v.password.minLength">{{$v.password.$params.minLength.min}} caractères min !.</span>
                                        </div>
                                    </div>
                                    <button v-b-toggle.newPassword class="btn btn-dark btn-sm mt-3" type="submit" @click.prevent="updateProfile">Valider</button>
                                </form>
                            </div>
                        </b-collapse>
                    </div>
                </div>
            </div>

            <div class="form-group mt-4">
                <div class="row">
                    <div class="col-8 mx-auto">
                        <b-link class="btn bg-groupomania mr-5 font-weight-bold mb-5" to="Allpost">Voir le forum</b-link>
                        <b-link class="btn bg-groupomania font-weight-bold mb-5" to="Addpost">Rédiger un post</b-link>
                        <div>
                            <b-link v-if="isActive" class="btn btn-light text-secondary font-weight-bold" to="AllProfiles">Consulter les profiles</b-link>
                        </div>
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
import {minLength, email} from "vuelidate/lib/validators";
import axios from "axios";


export default {
    name: 'profile',

    created() {
        axios
            .get('http://localhost:3000/api/users/profile', {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
                this.user = response.data
                console.log(response);
            })
            .catch(e => {
                console.log(e + "User inconnu");
                this.$router.push('/login');
                window.alert('Veuillez vous connecter pour accéder au site')
            })
    },

    data() {
        return {
            user: [],
            token: localStorage.getItem('token'),
            userId: parseInt(localStorage.getItem('userId')),
            submited: false,
            pseudo: "",
            email: "",
            password: "",
            isActive: false,
        }
    },

    validations: {
        pseudo: {
            minLength: minLength(5)
        },
        email: {
            email
        },
        password: {
            minLength: minLength(6)
        }
    },

    methods:{

        handleFileUpload(){
            this.image = this.$refs.image.files[0];
        },

        updateProfile() {

            axios
                .put(`http://localhost:3000/api/users/${this.userId}`, {
                    userId: this.userId,
                    pseudo: this.pseudo,
                    email: this.email,
                    password: this.password
                })
                .then(() => {
                    localStorage.setItem('pseudo', this.pseudo)
                    console.log(this.pseudo)
                    alert("Merci ! Votre compte est bien modifié")
                    this.$router.go()
                })
                .catch(error => {
                    console.log("quelque chose s'est mal passé :(" + (error))
                })
        },

        deleteUser() {
            const id = this.userId;
            if(id == id || id == 4) {
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