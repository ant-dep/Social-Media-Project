<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between bg-primary">
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
  name: 'Post',
  components: {
    NavbarPost, Jumbo, Post, Footer
  }
}
</script>