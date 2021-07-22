<template>
  <div class="post">
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