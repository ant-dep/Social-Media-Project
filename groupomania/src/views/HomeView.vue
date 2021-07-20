<template>
  <div class="home position-relative">
    <Navbar />
    <HomePage />
    <Log />
    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import HomePage from '@/components/HomePage.vue'
  import Log from '@/components/Log.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'Home',
    components: {
      Navbar, HomePage, Log, Footer
    }
  }
</script>