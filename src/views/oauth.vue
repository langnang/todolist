<template>
  <div class="oauth-container"></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("token/signIn", this.$route.query).then(() => {
      this.$router.push("/");
    });
  },
};
</script>
<style lang="scss"></style>
