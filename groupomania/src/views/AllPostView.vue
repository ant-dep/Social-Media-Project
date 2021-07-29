<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between">
    <NavbarPost />
    <Jumbo />

      <!-- ALERTS MESSAGES DEPENGING ON AXIOS REQUESTS -->
        <b-alert v-if="errorDeletePost" show dismissible variant="danger">Impossible de supprimé votre post. Veuillez contacter un administrateur"</b-alert>
        <b-alert v-if="confirmDeletePost" show dismissible variant="success">Post supprimé</b-alert>
        <b-alert v-if="errorComPost" show dismissible variant="danger">Impossible de commenter</b-alert>
        <b-alert v-if="confirmComPost" show dismissible variant="success">Commentaire ajouté</b-alert>
        <b-alert v-if="errorDeleteCom" show dismissible variant="danger">Impossible de supprimer votre commentaire. Veuillez contacter un administrateur"</b-alert>
        <b-alert v-if="confirmDeleteCom" show dismissible variant="success">Commentaire supprimé</b-alert>
      <!-- ALERTS MESSAGES DEPENGING ON AXIOS REQUESTS -->

    <CreatePostBtn />
    <Post v-for="post in posts" :key="post.id" >

      <!-- POST -->
      <template v-slot:Posts v-if="posts !== null">
        <div>
          <div class="col d-flex justify-content-between align-items-center p-0">
            <div>
              <img id="imgProfile" :src="post.User.imageUrl" class="rounded-circle">
              <span class="text-white font-weight-bold px-3 ml-2">{{ post.User.pseudo }}</span>
            </div>
            <span class="badge text-white align-self-start p-0">{{ post.createdAt.substr(0, 10).split("-").reverse().join("-") }}</span>
          </div>
          <div class="row mx-auto">
            <div class="col-11 card my-3 py-2 mx-auto">
              {{ post.content }}
              <b-img-lazy v-if="post.imageUrl" :src="post.imageUrl" fluid-grow class="rounded mx-auto pt-1" alt="responsive image"></b-img-lazy>
            </div>
            <hr class="line w-100 mb-1">
          </div>
        </div>
      </template>

      <!-- ITS COMMENTS -->
      <template v-slot:Comments v-if="comments !== null">
          <div v-for="(comment) in comments.filter((comment) => {return comment.postId == post.id })"
              :key="comment.id"
              class="container-fluid"
          >
            <div v-if="comments.postId == posts.id" class="row d-flex justify-content-between align-items-center comment-area py-1">
                <img :src="comment.User.imageUrl" class="imgComment align-self-start">
                <span id="userNameComment" class="align-self-start text-white px-2">{{ comment.User.pseudo }}</span>
                <p class="col-8 text-left mb-0 pt-1 text-white font-weight-bold">{{ comment.content }}</p>
                <button v-if="userId == comment.userId || currentUser.isAdmin == 1" class="col-1 p-0 btn" @click.prevent="deleteCom(comment.id)" id="delcom" type="submit"><i class="text-dark fa fa-times"></i></button>
            </div>
                <hr class="line w-100 mt-1 mb-0 p-0">
          </div>
      </template>

      <!-- SLOT FOR A NEW COMMENT -->
      <template v-slot:EditCom>
          <form v-on:submit.prevent="sendCom(post.id)" class="container-fluid mt-2">
            <div class="form-group row">
              <label class="sr-only" for="comment"></label>
              <b-form-textarea id="newComment" class="col-11 form-control-sm mx-auto" name="comment" type="text" v-model.trim="$v.newComment.$model" aria-label="Zone d'un commentaire" placeholder="Commenter" required></b-form-textarea>
              <div class="error" v-if="!$v.newComment.maxLength">Max. {{ $v.newComment.$params.maxLength.max }} letters</div>
            </div>
            <div>
              <button class="btn btn-light rounded py-1 px-2 mt-2 mr-3" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
              <button v-if="userId == post.userId || currentUser.isAdmin == 1" class="btn btn-primary text-white border-white rounded py-1 px-3 mt-2" @click.prevent="deletePost(post.id)" id="delpost" type="submit" aria-label="Supprimer le post"><i class="fa fa-trash"></i></button>
            </div>
          </form>
      </template>

    </Post>
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import Jumbo from '@/components/Jumbo.vue'
import CreatePostBtn from '@/components/CreatePostBtn.vue'
import Post from '@/components/Post.vue'
import Footer from '@/components/Footer.vue'

import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: 'Allpost',
  components: {
    NavbarPost, Jumbo, CreatePostBtn, Post, Footer
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      userId: parseInt(localStorage.getItem("userId")),
      pseudo: localStorage.getItem('pseudo'),
      isAdmin: localStorage.getItem('isAdmin'),

      posts: [],
      comments: [],
      currentUser: [],
      user: {
        pseudo: "",
        imageUrl: "",
        id: "",
        isAdmin: "",
      },
      newComment: "",

      // ALERTS MESSAGES
      errorDeletePost: false,
      confirmDeletePost: false,
      errorDeleteCom: false,
      confirmDeleteCom: false,
      errorComPost: false,
      confirmComPost: false,
    }
  },

  validations: {
    newComment: { required, maxLength: maxLength(140) },
  },
  async created() {

    // GET CURRENT USER
    await axios
    .get('http://localhost:3000/api/users/profile', {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + this.token,
    },
    })
    .then((response) => {
        this.currentUser = response.data
        console.log(response);
    })
    .catch(e => {
        console.log(e + "User inconnu");
    })

    // GET ALL POSTS
    await axios
            .get('http://localhost:3000/api/post', {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + this.token
              }
            })
            .then((response) => {
              this.posts = response.data;
              console.log(response);
            })
            .catch(e => {
              console.log(e + "User inconnu ou Posts indisponibles");
              this.$router.push('/login');
              window.alert('Veuillez vous connecter pour accéder au site')
            })

    // GET ALL COMMENTS
    await axios
            .get('http://localhost:3000/api/post/comment', {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": 'Bearer ' + this.token
              }
            })
            .then((response) => {
              this.comments = response.data;
              console.log(response);
            })
            .catch(err => {
              console.log(err + "User inconnu ou comments indisponibles");
            })
  },

  methods: {

        // NEW COMMENT
    sendCom(id) {

      this.$v.$touch()
      const data = JSON.stringify({content: this.newComment})

      axios
        .post('http://localhost:3000/api/post/' + id + '/comment', data, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + this.token
          },
        })
        .then(() => {
          this.$router.go()
          this.confirmComPost = true
        })
        .catch(() => {
          this.errorComPost = true
        })
    },

    // DELETE COMMENT by id
    deleteCom(id) {
      axios
        .delete('http://localhost:3000/api/post/' + id + '/comment', {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + this.token
          }
        })
        .then(() => {
          this.$router.go()
          this.confirmDeleteCom = true
        })
        .catch(() => {
          this.errorDeleteCom = true
        })
    },

    // DELETE POST by id
    deletePost(id) {
      axios
        .delete('http://localhost:3000/api/post/' + id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + this.token
          }
        })
        .then(() => {
          this.$router.go()
          this.confirmDeletePost = true
        })
        .catch(() => {
          this.errorDeletePost = true
        })
    }
  }
}
</script>

<style scoped>

.imgComment {
 border-radius: 50%;
 width: 30px;
 height: 30px;
}
.post {
  position: absolute;
	overflow: visible;
	width: 100%;
}

#imgProfile {
    height: 50px;
    width: 50px;
}

#userNameComment {
  font-size: 0.8rem;
}
</style>

