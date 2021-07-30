<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between">
    <NavbarPost />
    <SendPost />
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import SendPost from '@/components/SendPost.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AddPost',
  components: {
    NavbarPost, SendPost, Footer
  }
}
</script>