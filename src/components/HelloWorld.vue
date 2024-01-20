<template>
  <div class="d-flex content-center">
    <br />
    <button class="btn btn-outline-primary" @click="authenticate">
      Facebook
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facebookAppId: "1089304505816463",
      facebookRedirectUrl: "http://localhost:8080/callback",
    };
  },
  methods: {
    async authenticate() {
      try {
        // Step 1: Redirect the user to Facebook's Authorization Dialog
        const authorizationUrl =
          `https://www.facebook.com/v18.0/dialog/oauth` +
          `?response_type=code%20granted_scopes` +
          `&client_id=${this.facebookAppId}` +
          `&redirect_uri=${encodeURIComponent(this.facebookRedirectUrl)}` +
          `&scope=public_profile pages_manage_posts pages_show_list pages_read_user_content pages_read_engagement read_insights` +
          `&state=${this.generateRandomState()}`;

        window.location.href = authorizationUrl;

        // For example:
        //this.$router.push(authorizationUrl);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately
      }
    },
    generateRandomState() {
      var key = "MyFbKey";
      return key;
    },
  },
};
</script>
