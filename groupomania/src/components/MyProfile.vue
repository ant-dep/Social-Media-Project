<template>
    <div class="container-fluid">
        <div class="card col-8 mx-auto">
            <div class="row">
                <div class="col-8 mx-auto my-4">
                    <div class="d-flex justify-content-center align-items-center">
                        <b-img id="imgProfile" :src="user.imageUrl" fluid></b-img>
                        <h1 class="ml-2 align-self-end">{{ user.pseudo}}</h1>
                    </div>
                    <hr class="line w-75">
                </div>
            </div>

            <div class="form-group mt-4">
                <div class="row">
                    <div class="col-10 mx-auto mb-3">
                        <b-link v-b-toggle.newPassword class="btn bg-groupomania font-weight-bold px-2 mr-2">Modifier mes infos</b-link>
                        <b-collapse id="newPassword">
                            <form class="card col col-lg-8 mx-auto bg-white py-4" @submit.prevent="updateProfile" enctype="multipart/form-data">
                                <div class="form-group mt-3">
                                    <label id="imageLabel" for="image" class="font-weight-bold">Modifier mon image</label>
                                    <input type="file" name="image" id="image" ref="image" v-on:change="handleFileUpload()"/>
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
                                            <span class="badge badge-danger" v-if="!$v.pseudo.minLength">{{$v.pseudo.$params.minLength.min}} caractères min !</span>
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
                                    <div class="form-group form-group-sm">
                                        <div class="col mx-auto position-relative">
                                            <label for="confirmPassword"></label>
                                            <div class="d-flex justify-content-center input-group">
                                                <span class="icon position-absolute input-group-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                                                        <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
                                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                                                    </svg>
                                                </span>
                                                <input id="confirmPassword" name="confirmPassword" type="password" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.confirmPassword.$model" placeholder="Confirmation">
                                            </div>
                                        </div>
                                    </div>
                                    <button v-b-toggle.newPassword class="btn btn-dark btn-sm mt-3" type="submit">Valider</button>
                                </div>
                            </form>
                        </b-collapse>
                        <b-link class="btn bg-groupomania font-weight-bold px-3" to="Addpost">Rédiger un post</b-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 mx-auto my-5">
                        <b-link v-if="this.user.isAdmin == 1" class="delete badge badge-light font-weight-bold py-1 mr-2" to="AllProfiles"><small>Consulter les profiles</small></b-link>
                        <b-link class="delete badge badge-light font-weight-bold py-1 " @click.prevent="deleteUser"><small>Supprimer mon compte</small></b-link>
                    </div>
                </div>
            </div>
            <b-alert v-if="errorInputs" show dismissible variant="danger">Pseudo ou Email déjà utilisé</b-alert>
            <b-alert v-if="confirmUpdate" show dismissible variant="success">Profil mis à jour</b-alert>
            <b-alert v-if="errorDelete" show dismissible variant="danger">Une erreur est survenue. Veuillez contacter un administrateur</b-alert>
            <b-alert v-if="differentConfirmPassword" show dismissible variant="danger">Les mots de passe sont différents</b-alert>
        </div>
    </div>
</template>

<script>
import {minLength, email} from "vuelidate/lib/validators";
import axios from "axios";


export default {
    name: 'profile',

    async created() {
        await axios
                .get('http://localhost:3000/api/users/profile', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + this.token,
                },
                })
                .then((response) => {
                    this.user = response.data
                    console.log(response);
                })
                .catch(e => {
                    console.log(e + "User inconnu");
                    this.$router.push('/login');
                })
    },

    data() {
        return {
            user: [],
            token: localStorage.getItem('token'),
            userId: parseInt(localStorage.getItem('userId')),

            pseudo: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: "",
            isAdmin: "",

            submited: false,
            isActive: false,
            errorInputs: false,
            confirmUpdate: false,
            errorDelete: false,
            differentConfirmPassword: false,
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
        },
        confirmPassword: {
        },
    },

    methods:{

        handleFileUpload(){
            this.image = this.$refs.image.files[0];
        },

        updateProfile() {

            this.$v.$touch();
            // Checks if password input is filled
            if(this.password !== null) {
                // Checks if both matches
                if(this.password !== this.confirmPassword) {
                    // Throw error if not
                    this.differentConfirmPassword = true
                    this.$router.go()
                // Send the request if OK
                } else {
                    const formData = new FormData();

            if (this.image) {
                    formData.append("image", this.image);
                    formData.append("userId",this.userId);
                    formData.append("pseudo", this.pseudo);
                    formData.append("email", this.email);
                    formData.append("password", this.password);
            } else {
                    formData.append("userId", this.userId);
                    formData.append("pseudo", this.pseudo);
                    formData.append("email", this.email);
                    formData.append("password", this.password);
                }

            axios
                .put(`http://localhost:3000/api/users/${this.userId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => {
                    localStorage.setItem('pseudo', this.pseudo)
                    this.confirmUpdate = true
                    this.$router.go()
                })
                .catch(() => {
                    this.errorInputs = true
                })
                }

            // If password input is not filled,
            } else { // send the request with other inputs

                const formData = new FormData();
                // If there is an image uploaded :
                if (this.image) {
                        formData.append("image", this.image);
                        formData.append("userId",this.userId);
                        formData.append("pseudo", this.pseudo);
                        formData.append("email", this.email);
                        formData.append("password", this.password);
                // if not :
                } else {
                        formData.append("userId", this.userId);
                        formData.append("pseudo", this.pseudo);
                        formData.append("email", this.email);
                        formData.append("password", this.password);
                    }

                axios
                    .put(`http://localhost:3000/api/users/${this.userId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": 'Bearer ' + this.token
                        }
                    })
                    .then(() => {
                        localStorage.setItem('pseudo', this.pseudo)
                        this.confirmUpdate = true
                        this.$router.go()
                    })
                    .catch(() => {
                        this.errorInputs = true
                        this.$router.go()
                    })
            }
        },

        deleteUser() {

            axios
                .delete(`http://localhost:3000/api/users/${this.userId}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": 'Bearer ' + this.token
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
</script>

<style>

#imgProfile {
    border-radius: 50%;
    border: solid #FFD7D8;
    height: 100px;
    width: 100px;
}

#imageLabel {
    cursor: pointer;
}

#image {
   opacity: 0;
   position: absolute;
   z-index: -1;
}
.bg-groupomania {
    background-color: #FFD7D8;
}
.delete {
    border: 1px solid #FFD7D8;
    color: black;
}
</style>
