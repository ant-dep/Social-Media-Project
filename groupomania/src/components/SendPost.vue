<template>
        <div class="col-lg-7 offset-lg-3 mx-auto">
            <div class="row mx-auto">
                <div class="col-lg-8 mx-auto">
                    <div class="card my-3 bg-primary mx-auto">
                        <div class="card-header">
                            <h1 class="text-white"> Post </h1>
                        </div>
                        <div>
                            <p class="text-white font-weight-bold"> {{ pseudo }}</p>
                        </div>
                        <div class="card-body py-2">
                            <div class="d-flex">
                                <div class="col">
                                    <form v-on:submit.prevent="createPost" enctype="multipart/form-data">
                                        <div class="form-group mb-0">
                                            <label class="sr-only" for="content">Créer un post</label>
                                            <b-form-textarea name="content" type="text" v-model="content" class="form-control border-0" id="content" rows="2" placeholder="Quoi de neuf aujourd'hui ?" required></b-form-textarea>
                                            <div class="error" v-if="!$v.content.maxLength">Max. {{ $v.content.$params.maxLength.max }} letters</div>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label id="imageLabel" for="image" class="btn btn-primary border-white text-white font-weight-bold mt-2">Ajouter une image</label>
                                            <input type="file" name="image" id="image" ref="image" v-on:change="handleFileUpload()"/>
                                            <button class="btn btn-light font-weight-bold ml-3">Envoyer</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-alert v-if="errorAlert" show dismissible variant="danger">Une erreur est survenue</b-alert>
        </div>
</template>

<script>
import {required, maxLength,} from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: "sendPost",
    data() {
        return {
            userId: parseInt(localStorage.getItem('userId')),
            pseudo: localStorage.getItem("pseudo"),
            content: "",
            image: "",
            postId:"",
            erroAlert: false
        }
    },
    validations: {
        content: {
            required, maxLength: maxLength(140)
        }
    },

    methods:{

            handleFileUpload(){
                this.image = this.$refs.image.files[0];
            },
            createPost() {
                this.$v.$touch();
                const formData = new FormData();
                if (this.image !== null) {
                    formData.append("image", this.image);
                    formData.append("content", this.content);
                    formData.append("userId", parseInt(localStorage.getItem('userId')));
                } else if(this.content !== null){
                    formData.append("content", this.content);
                    formData.append("userId", parseInt(localStorage.getItem('userId')));
                }

            axios.post('http://localhost:3000/api/post/new', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                this.$router.push('/allpost');
            })
            .catch(() => {
                this.erroAlert = true
                console.log(formData);
            });
        },
    }
}
</script>

<style scoped>

#imageLabel {
    cursor: pointer;
}

#image {
   opacity: 0;
   position: absolute;
   z-index: -1;
}

</style>