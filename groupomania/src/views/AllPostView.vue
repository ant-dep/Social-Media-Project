<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between ">
    <NavbarPost />
    <Jumbo />
    <CreatePostBtn />
    <Post v-for="post in posts" :key="post.id" >

      <!-- POST -->
      <template v-slot:Posts v-if="posts !== null">
        <div>
          <div class="col d-flex justify-content-between align-items-center p-0">
            <div>
              <img id="imgProfile"
                v-if="users.map((user) => {if (user.id === post.userId) return user.imageUrl;}).join('') !== (null || '')"
                :src="users.map((user) => {if (user.id === post.userId) return user.imageUrl;}).join('')"
                class="rounded-circle"
              >
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
            <div v-if="comments.postId == posts.id" class="row comment-area py-1">
              <div>
                <img v-if="users.map((user) => {if (user.id === comment.userId) return user.imageUrl;}).join('') !== (null || '')"
                    :src="users.map((user) => {if (user.id === comment.userId) return user.imageUrl;}).join('')"
                    class="imgComment"
                >
                <span id="userNameComment" class="text-white px-2">{{ users.map((user) => {if (user.id === comment.userId) return user.pseudo;}).join("") }}</span>
              </div>
              <p class="col-11 d-flex justify-content-start mb-0 pt-1 pl-5 text-white font-weight-bold">{{ comment.content }}</p>
              <button v-if="userId == comment.userId || userId == 4" class="col-1 p-0 btn" @click.prevent="deleteCom(comment.id)" id="delcom" type="submit"><i class="text-dark fa fa-times"></i></button>
              <hr class="line w-100 mt-1 mb-0 p-0">
            </div>
          </div>
      </template>

      <!-- SLOT FOR A NEW COMMENT -->
      <template v-slot:EditCom>
          <form class="container-fluid mt-2">
            <div class="row">
              <textarea id="newComment" class="col-11 form-control-sm mx-auto" v-model.trim="$v.newComment.$model" aria-label="Zone d'un commentaire" placeholder="Commenter"></textarea>
              <div class="error" v-if="!$v.newComment.maxLength">Max. {{ $v.newComment.$params.maxLength.max }} letters</div>
            </div>
            <div>
              <button @click.prevent="sendLike(post.id)"
                      id="sendlike" type="submit" class="btn btn-light rounded p-2 mt-2 mr-2" aria-label="Publication d'un like">
                      <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
              </button>
              <span v-if="post.likes.length > 0">{{likes.filter((like) => {return like.postId == post.id;}).length}}</span>
              <button class="btn btn-light rounded p-2 mt-2 mr-2" @click.prevent="sendCom(post.id)" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
              <button v-if="userId == post.userId || userId == 4" class="btn btn-light rounded py-2 px-3 mt-2" @click.prevent="deletePost(post.id)" id="delpost" type="submit"><i class="fa fa-trash"></i></button>
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
      pseudo: localStorage.getItem('pseudo'),
      users: [],
      posts: [],
      comments: [],
      userId: localStorage.getItem("userId"),
      isAdmin: 1,
      user: {
        pseudo: "",
        imageUrl: "",
        id: ""
      },
      newComment: "",
    }
  },

  validations: {
    newComment: { required, maxLength: maxLength(140) },
  },
  async created() {

    // GET ALL USERS
    await axios
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
            }),


    // GET ALL POSTS
    await axios
            .get('http://localhost:3000/api/post', {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
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
                "Authorization": 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.comments = response.data;
              console.log(response);
            })
            .catch(e => {
              console.log(e + "User inconnu ou comments indisponibles");
            })
  },

  methods: {

    postImage() {
      console.log(this.post.imageUrl);
      return `images/${this.imageUrl}`
    },

    // NEW LIKE
    async sendLike(id) {
        await axios
          .post('http://localhost:3000/api/post/' + id + '/vote/like', {
            userId: this.userId
          })
          .then((res) => {
            console.log(res);
            this.$router.go()
          })
          .catch(() => {
                console.log("Impossible d'éditer le post, une erreur est survenue");
          })
    },

    // NEW COMMENT
    async sendCom(id) {
      this.$v.$touch();
      if(this.newComment !== null){

        await axios
          .post('http://localhost:3000/api/post/' + id + '/comment', {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            content: this.newComment,
            userId: parseInt(localStorage.getItem('userId')),
            postId: id
          })
          .then((res) => {
            console.log(res);
            alert("Commentaire posté");
            this.$router.go()
          })
          .catch(() => {
                console.log("Impossible d'éditer le post, une erreur est survenue");
          })
      }
    },

    // DELETE COMMENT by id
    deleteCom(id) {
      axios
        .delete('http://localhost:3000/api/post/' + id + '/comment', {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          alert("Le commentaire a été supprimé !")
          console.log(response);
          this.$router.go()
        })
        .catch(error => {
          window.alert(error);
        })
    },

    // DELETE POST by id
    deletePost(id) {
      axios
        .delete('http://localhost:3000/api/post/' + id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          alert("Votre post a été supprimé !")
          console.log(response);
          this.$router.go()
        })
        .catch(error => {
          window.alert(error);
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

