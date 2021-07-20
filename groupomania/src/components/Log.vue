<template>
    <div class="login col-sm-6 mx-auto bg-white my-4">
        <h3 class="text-secondary">Me connecter</h3>
        <form id="form"
            @submit.prevent="login()"
            method="post"
            novalidate="true">
            <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.email.$error }">
                <div class="col-sm-8 mx-auto">
                    <label for="email">Email</label>
                    <div class="input-group">
                        <span class="col-2 input-group-addon py-0 px-1 my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="" class="bi bi-person-fill" viewBox="2 1 10 13">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg></span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            class="col-8 form-control form-control-sm"
                            v-model.trim="$v.email.$model"
                        >
                    </div>
                    <span class="error" v-if="!$v.email.required">Champ email manquant</span>
                </div>
            </div>
            <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.password.$error }">
                <div class="col-sm-8 mx-auto">
                    <label for="password">Mot de passe</label>
                    <div class="input-group">
                        <span class="col-2 input-group-addon py-0 px-1 my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                            <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                            </svg>
                        </span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            class="col-8 form-control form-control-sm"
                            v-model.trim="$v.password.$model">
                    </div>
                    <span class="error" v-if="!$v.password.required">Champ mot de passe manquant</span> <br>
                    <span class="error" v-if="!$v.password.minLength">{{$v.password.$params.minLength.min}} caractères min !.</span>
                </div>
            </div>
            <button class="btn btn-dark btn-sm" type="submit" @click.prevent="login">Connexion</button>
        </form>
        <p> Pas encore inscrit ? Créez votre compte dès aujourd'hui !</p>
        <button class="btn btn-dark btn-sm" @click.prevent="goSignin" >Inscription</button>
    </div>
</template>


<script>
import {required,minLength} from "vuelidate/lib/validators";
import axios from "axios";


export default {
name: 'login',
data() {
    return {
    email: "",
    password: "",
    submited: false,
        }
    },

validations: {
    email: {
        required,
    },
    password: {
        required,
        minLength: minLength(6)
    }
},
methods:{

    login() {
    axios.post( 'http://localhost:3000/api/users/login', {
        email: this.email,
        password: this.password,
        })
        .then((res) => {
                localStorage.setItem("token",   res.data.token)
                localStorage.setItem("userId",  res.data.userId)
                console.log(res);
                alert("Bienvenue ! Vous êtes connecté ! ");
                this.$router.push('/me');
            })
        .catch(error => {
        console.log("Identifiants invalides !" + (error));
        })
    },
    goSignin(){
        this.$router.push('Signup');
    }
}
}
</script>

<style scoped>
.signin {
    margin-top: 20px;
}
.btn {
    margin-bottom: 20px;
    font-weight: bold;
}
.error {
    color: red;
    font-weight: bold;
}
.bg-groupomania{
    background-color: #ffd7d8;
}
</style>



