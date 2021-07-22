<template>
  <div class="post">
    <NavbarPost />
    <Jumbo />
    <CreatePostBtn />
    <Post
        v-for="post in posts"
        :pseudo ="post.User.pseudo"
        :content ="post.content"
        :imageUrl ="post.imageUrl"
        :createdAt ="post.createdAt"
        :key="post.id" >

      <template v-slot:Comments v-if="comments !== null">
        <div class="last-comments">
          <div class="comment-bloc"
              v-for="comment in comments"
              :key="comment.id">
            <div v-if="comments.postId == posts.postId" class="comment-area">
              <p v-if="comments.userId == user.id" class="user-name">{{ user.pseudo }}</p>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:EditCom>
        <div>
          <form>
            <div>
              <textarea id="contentComment" class="form-control-sm w-100" v-model="comment.content" aria-label="Zone d'un commentaire" placeholder="Commenter"></textarea>
            </div>
            <div>
              <button class="btn btn-light rounded p-2 mt-2 mr-2" @click.prevent="sendCom(post.id)" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
              <button v-if="userId == post.userId || isAdmin == 1" class="btn btn-light rounded py-2 px-3 mt-2" @click.prevent="deletePost(post.id)" id="delpost" type="submit"><i class="fa fa-trash"></i></button>
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

import axios from "axios";

export default {
  name: 'Allpost',
  components: {
    NavbarPost, Jumbo, CreatePostBtn, Post, Footer
  },
  data() {
    return {
      posts: "",
      comments: "",
      userId: localStorage.getItem("userId"),
      isAdmin: 1,
      post: {
        userId: localStorage.getItem("userId"),
        id:"",
        content: "",
        imageUrl: "",
      },
      id:"",
      user: {
        pseudo:"",
        id:""
      },
      comment: {
          content: "",
          userId: "",
          id:""
        },
      contentComment: {
        content: ""
      },
    }
  },

  created() {
    // POSTS
    axios
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
    axios
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

    sendCom(id) {
      const newComment = {
        "content": this.comment.content,
        "userId": parseInt(localStorage.getItem('userId')),
        "postId": id
      };
      console.log(newComment)

      axios
        .post('http://localhost:3000/api/post/' + id + '/comment', newComment, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          console.log(res);
          console.log(res);
          alert("Commentaire posté");
        })
        .catch(e => {
              console.log(e + "Impossible d'éditer le post, une erreur est survenue");
        })
    },

    setComment(event){
      this.commentContent = event.target.value
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

