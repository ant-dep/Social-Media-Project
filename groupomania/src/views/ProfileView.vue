<template>
  <div class="post">
    <NavbarPost />
    <MyProfile />
    <Footer />
  </div>
</template>

<script>
import NavbarPost from '@/components/NavbarPost.vue'
import MyProfile from '@/components/MyProfile.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Profile',
  components: {
    NavbarPost, MyProfile, Footer
  }
}
</script>