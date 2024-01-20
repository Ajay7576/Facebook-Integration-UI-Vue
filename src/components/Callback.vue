<template>
  <div class="container">
    <form @submit.once.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="file"
          @change="uploadFile"
          multiple
          class="form-control"
          required
        />
      </div>

      <div class="form-group col-5">
        <label for="message">Message</label>
        <input
          id="message"
          v-model="message"
          name="message"
          type="text"
          class="form-control"
        />
      </div>

      <div class="form-group col-5">
        <label for="caption">Caption</label>
        <input
          id="caption"
          v-model="caption"
          name="caption"
          type="text"
          class="form-control"
        />
      </div>

      <br />
      <div class="form-group">
        <button class="btn btn-info btn-block btn-lg form-control text-white">
          UploadMultipleFiles
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UploadMutipleFile",

  data() {
    return {
      files: [],
      message: "",
      caption: "",
      grantedScopes: "",
      deniedScopes: "",
      state: "",
      code: "",
    };
  },
  created() {
    this.grantedScopes = this.$route.query.granted_scopes;
    this.deniedScopes = this.$route.query.denied_scopes;
    this.state = this.$route.query.state;
    this.code = this.$route.query.code;
  },

  methods: {
    uploadFile(event) {
      this.files = event.target.files;
      console.log("files", this.files);
    },

    async handleSubmit() {
      debugger; // eslint-disable-line

      const formData = new FormData();

      for (const i of Object.keys(this.files)) {
        formData.append("files", this.files[i]);
      }

      // Add other values to the formData
      formData.append("message", this.message);
      formData.append("caption", this.caption);
      formData.append("code", this.code);
      formData.append("state", this.state);

      await axios
        .post("https://localhost:7143/Facebook/CreatePost", formData)
        .then((res) => {
          debugger; // eslint-disable-line
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });

      this.$router.push({ name: "/home" });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
