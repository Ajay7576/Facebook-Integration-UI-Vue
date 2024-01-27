<template>
  <div class="container">
    <form @submit.once.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="message">Message:</label>
        <input
          type="text"
          class="form-control"
          id="message"
          v-model="message"
          placeholder="Enter your message"
        />
      </div>

      <div class="form-group">
        <label for="image">Image:</label>
        <div class="image-container">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Preview"
            class="img-fluid"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="file">File Upload:</label>
        <input
          type="file"
          id="file"
          @change="previewImage"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-info btn-lg btn-block text-white">
          Post On Facebook
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostView",

  data() {
    return {
      files: [],
      message: "",
      grantedScopes: "",
      deniedScopes: "",
      state: "",
      code: "",
      imageUrl: null,
    };
  },
  created() {
    this.grantedScopes = this.$route.query.granted_scopes;
    this.deniedScopes = this.$route.query.denied_scopes;
    this.state = this.$route.query.state;
    this.code = this.$route.query.code;
    console.log("this.state", this.state);
  },

  methods: {
    previewImage(event) {
      debugger; // eslint-disable-line no-debugger

      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrl = e.target.result;
          console.log("this.imageUrl", this.imageUrl);
        };

        reader.readAsDataURL(input.files[0]);
        this.files = input.files;
        console.log("this.files", this.files);
      } else {
        this.imageUrl = "";
        this.files = null;
      }
    },

    async handleSubmit() {
      debugger; // eslint-disable-line no-debugger

      const formData = new FormData();

      console.log("formdata", formData);

      if (this.state == "MyInstaKey") {
        // upload picture cloudanry

        for (const i of Object.keys(this.files)) {
          formData.append("files", this.files[i]);
        }

        formData.append("caption", this.message);
        formData.append("code", this.code);
        formData.append("state", this.state);
        try {
          const res = await axios.post(
            "https://localhost:7143/api/Instagram/createPostInstagram",
            formData
          );
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      } else if (this.state == "MyFbKey") {
        debugger; // eslint-disable-line no-debugger

        for (const i of Object.keys(this.files)) {
          formData.append("files", this.files[i]);
        }

        formData.append("message", this.message);
        formData.append("code", this.code);
        formData.append("state", this.state);

        try {
          const res = await axios.post(
            "https://localhost:7143/Facebook/CreatePost",
            formData
          );

          console.log(res);
        } catch (err) {
          console.error(err);
        }
      }
      //this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 100px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.image-container {
  width: 100%;
  max-width: 250px; /* Adjust the maximum width as needed */
  margin-right: 20px; /* Add spacing to the right of the image */
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
</style>
