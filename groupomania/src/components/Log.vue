<template>
    <div class="bg-primary pt-3 pb-5">
        <div class="card col-8 col-lg-4 mx-auto bg-white py-4">
                <h3 class="text-secondary mt-3">Me connecter</h3>
                <form id="form" class="mt-5" @submit.prevent="login()" method="post" novalidate="true">
                    <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.email.$error }">
                        <div class="col mx-auto position-relative">
                            <label for="email"></label>
                            <div class="d-flex justify-content-center input-group">
                                <span class="icon position-absolute input-group-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                    </svg>
                                </span>
                                <input id="email" class="col-7 col-lg-6 form-control form-control-sm" name="email" type="email" placeholder="Email" v-model.trim="$v.email.$model" @change="activatedBtn()">                            </div>
                        </div>
                        <span class="badge badge-danger" v-if="!$v.email.email">Un email est demandé</span>

                    </div>
                    <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.password.$error }">
                        <div class="col mx-auto position-relative">
                            <label for="password"></label>
                            <div class="d-flex justify-content-center input-group">
                                <span class="icon position-absolute input-group-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                                        <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                                    </svg>
                                </span>
                                <input id="password" class="col-7 col-lg-6 form-control form-control-sm" name="password" type="password" placeholder="Mot de passe" v-model.trim="$v.password.$model" @change="activatedBtn()">
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-dark btn-sm mt-3" :disabled="isActive" type="submit" @click.prevent="login">Connexion</button>
                </form>
                <b-alert v-if="errorAlert" show dismissible variant="danger" class="col-10 mx-auto mt-5">Identifiants incorrects</b-alert>
                <div class="mt-5 pt-5">
                    <p> Pas encore inscrit ? Créez votre compte dès aujourd'hui !</p>
                    <button class="btn btn-dark btn-sm" @click.prevent="goSignin" >Inscription</button>
                </div>
            </div>
    </div>
</template>


<script>
import {email,required,minLength} from "vuelidate/lib/validators";
import axios from "axios";


export default {
name: 'login',
data() {
    return {
        email: "",
        password: "",
        submited: false,
        isActive: true,
        errorAlert: false
    }
    },

validations: {
    email: {
        email,
        required
    },
    password: {
        required,
        minLength: minLength(6)
    }
},
methods:{

    activatedBtn() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        if (email !== null && password !== null){
            this.isActive = false
        }
    },

    login() {
    axios.post( 'http://localhost:3000/api/users/login', {
        email: this.email,
        password: this.password,
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userId", res.data.userId)
            localStorage.setItem("isAdmin", res.data.isAdmin)
            alert("Bienvenue ! Vous êtes connecté ! ");
            this.$router.push('/allpost');
        })
        .catch(() => {
            this.errorAlert = true
        })
    },
    goSignin(){
        this.$router.push('Signup');
    }
}
}
</script>

<style scoped>

.btn {
    margin-bottom: 20px;
    font-weight: bold;
}
.icon {
    left: 10%;
}
</style>



