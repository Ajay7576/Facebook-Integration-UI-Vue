<template>
  <div class="container mt-5 py-4">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <button
          class="btn btn-outline-primary btn-block my-2"
          @click="authenticate('Facebook')"
        >
          Facebook
        </button>
      </div>
      <div class="col-md-3">
        <button
          class="btn btn-outline-danger btn-block my-2"
          @click="authenticate('Instagram')"
        >
          Instagram
        </button>
      </div>
      <div class="col-md-3">
        <button
          class="btn btn-outline-info btn-block my-2"
          @click="authenticate('Twitter')"
        >
          Twitter
        </button>
      </div>
      <div class="col-md-3">
        <button
          class="btn btn-outline-success btn-block my-2"
          @click="authenticate('LinkedIn')"
        >
          LinkedIn
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facebookAppId: "1089304505816463",
      facebookRedirectUrl: "https://localhost:8080/callback",

      InstagramGraphApiBaseUrl: "https://graph.instagram.com/v18.0",
      InstagramAppId: "1089304505816463",
      InstagramAppSecret: "854bdfc07183a4f1af82588fc2c7b9a5",
      instagramRedirectUri: "https://localhost:8080/callback", // Update with your redirect URI
      Scope: "instagram_basic pages_show_list pages_manage_posts",
    };
  },
  methods: {
    async authenticate(provider) {
      try {
        // Step 1: Redirect the user to the respective Authorization Dialog
        let authorizationUrl = "";

        switch (provider) {
          case "Facebook":
            authorizationUrl =
              `https://www.facebook.com/v18.0/dialog/oauth` +
              `?response_type=code%20granted_scopes` +
              `&client_id=${this.facebookAppId}` +
              `&redirect_uri=${encodeURIComponent(this.facebookRedirectUrl)}` +
              `&scope=public_profile pages_manage_posts pages_show_list pages_read_user_content pages_read_engagement read_insights` +
              `&state=${this.generateRandomState()}`;
            console.log("url", encodeURIComponent(this.facebookRedirectUrl));
            break;

          // Add other providers if needed
          case "Instagram":
            // Add Instagram authentication logic here

            authorizationUrl =
              `https://www.facebook.com/v18.0/dialog/oauth` +
              `?response_type=code%20granted_scopes` +
              `&client_id=${this.facebookAppId}` +
              `&redirect_uri=${encodeURIComponent(this.facebookRedirectUrl)}` +
              `&scope=${this.Scope}` +
              `&state=${this.generateRandomState()}`;

            //authorizationUrl = `${this.InstagramGraphApiBaseUrl}/oauth/authorize?client_id=${this.InstagramAppId}&redirect_uri=${this.instagramRedirectUri}&scope=${this.Scope}&response_type=code`;

            break;

          case "Twitter":
            // Add Twitter authentication logic here
            break;

          case "LinkedIn":
            // Add LinkedIn authentication logic here
            break;

          default:
            throw new Error("Invalid provider");
        }

        window.location.href = authorizationUrl;
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

<style scoped>
/* Add your component-specific styles here */
/* Add any additional styles for responsiveness if needed */
</style>
