<template>
  <div class="home">
    <h2>This is the home page. There's pretty much nothing here</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  mounted() {
    if (!localStorage.token) {
      this.$router.push('/signup');
    }
  }
};
</script>
