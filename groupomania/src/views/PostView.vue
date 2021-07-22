<template>
  <div class="post">
    <NavbarPost />
    <Jumbo />
    <Post />
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import Jumbo from '@/components/Jumbo.vue'
import Post from '@/components/SendPost.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AddPost',
  components: {
    NavbarPost, Jumbo, Post, Footer
  }
}
</script>