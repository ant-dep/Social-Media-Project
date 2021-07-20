<template>
<div class="post">
<NavbarPost />
<Jumbo />
<Post
    v-for="post in posts"
    :pseudo ="post.User.pseudo"
    :content ="post.content"
    :imageUrl ="post.imageUrl"
    :key="post.id" >
  <template v-slot:Comments v-if="post.Comments !== null">
    <div class="last-comments">
                <div class="comment-bloc"
                  v-for="comment in post.comments"
                  v-bind:key="comment.id">
                  <div class="comment-area">
                  <p class="user-name">{{ comment.User.pseudo }}</p>
                  <p>{{ comment.content }}</p>
                </div>
              </div>
     </div>
  </template>
  <template v-slot:EditCom>
    <div>
      <form>
        <div>
          <textarea id="contentComment" class="form-control" v-model="contentComment.content" aria-label="Zone d'un commentaire" placeholder="Commenter"
          ></textarea>
        </div>
      <div>
        <button class="btn btn-light rounded p-2 mt-2 mr-2" @click.prevent="sendCom(post.id)" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
        <button class="btn btn-light rounded py-2 px-3 mt-2" type="submit" @click.prevent="deletePost(post.id)" id="delpost" v-if="userId == post.userId || isAdmin == 1"><i class="fa fa-trash"></i></button>
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
import Post from '@/components/Post.vue'
import Footer from '@/components/Footer.vue'
import axios from "axios";

export default {
  name: 'allpost',
  components: {
    NavbarPost, Jumbo, Post, Footer
  },
  data() {
    return {
      posts: "",
      userId: localStorage.getItem("userId"),
      isAdmin: 1,
      post: {
        userId: localStorage.getItem("userId"),
        id:"",
        content: "",
        imageUrl: "",
        comments: [],
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
        content: ''
      },
    }
  },

  created() {
    axios
    .get('http://localhost:3000/api/post', {
      headers: {
        "Authorization": 'bearer ' + localStorage.getItem('token')
      }})
    .then((response) => {
      this.posts = response.data;
      console.log(response);
    })
  },

  methods: {

    postImage() {
      console.log(this.post.imageUrl);
      return `images/${this.imageUrl}`
    },

    sendCom(id) {
      const comment = {
        content: this.comment.content,
        userId: parseInt(localStorage.getItem('userId')),
        postId: id
      };
      console.log(id);

      axios
        .post('http://localhost:3000/api/' + id + '/comment', comment, {
          headers: {
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

#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>

