<template>
  <div class="post">
    <NavbarPost />
    <Jumbo />
    <CreatePostBtn />
    <Post
        v-for="post in posts"
        :pseudo ="post.User.pseudo"
        :imageUrlUser ="post.User.imageUrl"
        :content ="post.content"
        :imageUrl ="post.imageUrl"
        :createdAt ="post.createdAt"
        :key="post.id" >

      <template v-slot:Comments v-if="comments !== null">
        <div class="last-comments">
          <div class="comment-bloc container"
              v-for="(comment) in comments.filter((comment) => {
                return comment.postId == post.id })"
              :key="comment.id">
            <div v-if="comments.postId == posts.id" class="row comment-area py-1">
              <img v-if="users.map((user) => {if (user.id === comment.userId) return user.imageUrl;}).join('') !== (null || '')" 
                :src="users.map((user) => {if (user.id === comment.userId) return user.imageUrl;}).join('')" 
                class="imgComment"
              >
              <p class="col-9 mx-auto text-white font-weight-bold">{{ comment.content }}</p>
              <button v-if="userId == comment.userId || userId == 4" class="col-1 px-3 btn" @click.prevent="deleteCom(comment.id)" id="delcom" type="submit"><i class="text-dark fa fa-times"></i></button>
              <hr class="line w-100 my-1">
            </div>
          </div>
        </div>
      </template>

      <template v-slot:EditCom>
        <div>
          <form>
            <div class="row">
              <textarea id="newComment" class="col-11 form-control-sm mx-auto" v-model.trim="$v.newComment.$model" aria-label="Zone d'un commentaire" placeholder="Commenter"></textarea>
              <div class="error" v-if="!$v.newComment.maxLength">Max. {{ $v.newComment.$params.maxLength.max }} letters</div>
            </div>
            <div>
              <button class="btn btn-light rounded p-2 mt-2 mr-2" @click.prevent="sendCom(post.id)" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
              <button v-if="userId == post.userId || userId == 4" class="btn btn-light rounded py-2 px-3 mt-2" @click.prevent="deletePost(post.id)" id="delpost" type="submit"><i class="fa fa-trash"></i></button>
            </div>
          </form>
        </div>
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

    // USERS
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


    // POSTS
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

    // COMMENTS
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
#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>

