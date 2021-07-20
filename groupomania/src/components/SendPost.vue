<template>
    <div>
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
                                        </div>
                                        <div class="form-group">
                                            <label for="image">
                                                <input type="file" name="image" id="image" ref="image" v-on:change="handleFileUpload()"/>
                                            </label>
                                            <div class="col">
                                                <button class="btn fluid btn-fposts btn-sm bg-info text-dark font-weight-bold">Envoyer</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {required, maxLength,} from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: "sendPost",
    data() {
        return {
            user_id: parseInt(localStorage.getItem('userId')),
            content: "",
            image: "",
            post_id:"",
            pseudo: localStorage.getItem("pseudo")
        }
    },

    validations: {
        content: {
            required,
            maxLength: maxLength(255)
        }
    },

    methods:{

            handleFileUpload(){
                this.image = this.$refs.image.files[0];
            },
            createPost() {
            const formData = new FormData();
                if (this.image !== null) {
                formData.append("image", this.image);
                formData.append("content", this.content);
                formData.append("user_id",parseInt(localStorage.getItem('userId')));
            } else {
                formData.append("content", this.content);
                formData.append("user_id",parseInt(localStorage.getItem('userId')));
            }

            axios.post('http://localhost:3000/api/post/new', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                console.log(formData);
                this.$router.push('/allpost');
                console.log(res);
                alert("Bravo! Votre post est bien créé");
            })
            .catch(e => {
                    console.log(e + "Impossible d'éditer le post, une erreur est survenue");
                    console.log(formData);
            });
        },
    }
}
</script>

<style scoped>

</style>