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
      //facebookRedirectUrl: "https://missing-someone.onrender.com/callback",
      facebookRedirectUrl: "https://localhost:8080/callback",
      InstagramAppId: "1089304505816463",
      instagramRedirectUri: "https://localhost:8080/callback",
      // instagramRedirectUri: "https://missing-someone.onrender.com/callback", // Update with your redirect URI
      Scope:
        "email read_insights pages_show_list business_management instagram_basic instagram_manage_comments instagram_manage_insights instagram_content_publish instagram_manage_messages page_events pages_read_engagement pages_read_user_content pages_manage_posts",
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
              `&client_id=${this.InstagramAppId}` +
              `&redirect_uri=${encodeURIComponent(this.instagramRedirectUri)}` +
              `&scope=${this.Scope}` +
              `&state=${this.generateInstagramState()}`;

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

    generateInstagramState() {
      var key = "MyInstaKey";
      return key;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
/* Add any additional styles for responsiveness if needed */
</style>
