/*html*/
<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between bg-primary">
    <Navbar />
    <Sign />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sign from '@/components/Sign.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'Signup',
  components: {
    Navbar, Sign, Footer
  }
}
</script>