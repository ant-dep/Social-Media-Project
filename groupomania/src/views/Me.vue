<template>
  <div class="post">
    <NavbarPost />
    <Profile />
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import Profile from '@/components/Profile.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AddPost',
  components: {
    NavbarPost, Profile, Footer
  }
}
</script>