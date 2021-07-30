<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between bg-primary">
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