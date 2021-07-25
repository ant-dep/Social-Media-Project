<template>
    <div class="bg-primary pt-3 pb-5">
        <div class="card login col-6 col-lg-4 mx-auto bg-white py-4">
            <h1 class="h3 text-secondary mt-3">Créer un compte</h1>
            <form id="form" class="mt-3" @submit.prevent="signup()" method="post" novalidate="true">
                <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.pseudo.$error }">
                    <div class="col mx-auto position-relative">
                        <label for="pseudo">Pseudo</label>
                        <div class="d-flex justify-content-center input-group">
                            <span class="icon position-absolute input-group-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </span>
                            <input id="pseudo" name="pseudo" type="text" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.pseudo.$model" @change="activatedBtn()">
                        </div>
                        <span class="badge badge-danger" v-if="!$v.pseudo.minLength">{{$v.pseudo.$params.minLength.min}} caractères min !</span>
                    </div>
                </div>
                <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.email.$error }">
                    <div class="col mx-auto position-relative">
                        <label for="email">Email</label>
                        <div class="d-flex justify-content-center input-group">
                            <span class="icon position-absolute input-group-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                            </span>
                            <input id="email" name="email" type="email" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.email.$model" @change="activatedBtn()">
                        </div>
                    </div>
                </div>
                <div class="form-group form-group-sm" :class="{ 'form-group--error': $v.password.$error }">
                    <div class="col mx-auto position-relative">
                        <label for="password">Mot de passe</label>
                        <div class="d-flex justify-content-center input-group">
                            <span class="icon position-absolute input-group-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                                    <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                                </svg>
                            </span>
                            <input id="password" name="password" type="password" class="col-7 col-lg-6 form-control form-control-sm" v-model.trim="$v.password.$model" @change="activatedBtn()">
                        </div>
                        <span class="badge badge-danger" v-if="!$v.password.minLength">{{$v.password.$params.minLength.min}} caractères min !.</span>
                    </div>
                </div>
                <button class="btn btn-dark btn-sm mt-3" type="submit" @click.prevent="signup" :disabled="isActive">S'inscrire</button>
            </form>
        </div>
    </div>
</template>


<script>
import {required, minLength, email} from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: 'signup',
    data() {
        return {
            pseudo: "",
            email: "",
            password: "",
            submited: false,
            isActive: true
        }
    },
    // is the references for xxx.$model in html part
    validations: {
        pseudo: {
            required,
            minLength: minLength(5)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },

    methods:{

        activatedBtn() {
            const pseudo = document.getElementById('pseudo').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (email !== null && password !== null && pseudo !== null){
                this.isActive = false
            }
        },

        signup() {
            this.$v.$touch() // checks for errors
            this.submited = true
            if (this.pseudo && this.email && this.password) {
                axios
                    .post( 'http://localhost:3000/api/users/signup', {
                        pseudo: this.pseudo,
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        localStorage.setItem('pseudo', this.pseudo)
                        console.log(this.pseudo)
                        alert("Merci ! Votre compte est bien créé")
                        this.$router.push('Login')
                    })
                    .catch(error => {
                        console.log("quelque chose s'est mal passé :(" + (error))
                    })
            }
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



