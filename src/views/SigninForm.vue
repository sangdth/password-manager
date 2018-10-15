<template>
  <el-form
  >
    <el-form-item label="Gist ID">
      <el-input v-model="form.gistId"></el-input>
    </el-form-item>
    <el-form-item label="Personal access token">
      <el-input v-model="form.token"></el-input>
    </el-form-item>
    <el-form-item label="Passphrase">
      <el-input v-model="form.passphrase"></el-input>
    </el-form-item>
    <el-form-item label="Generate new gist">
      <el-switch v-model="form.newGist"></el-switch>
      <p class="small">
        Fill gist ID into the form to retrie your old data,
        generate new gist will make new empty file.
      </p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Sign In</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
    <p>
      Decoded data: {{ handleDecode(this.rawData['Password Manager'].content, form.passphrase) }}
    </p>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';
// import simpleCrypto from '../common/simple.crypto';

export default {
  name: 'SigninForm',

  data() {
    return {
      form: {
        gistId: '',
        token: '',
        passphrase: '',
        newGist: false,
      },
    };
  },

  computed: {
    ...mapGetters('gist', ['rawData']),
  },

  created() {
    console.log('sign in form created');
  },

  methods: {
    onSubmit() {
      console.log('run onSubmit');
      this.$store.dispatch('auth/SIGN_IN', this.form);
    },

    handleDecode(s, p) {
      //     return simpleCrypto.decode(s, p);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
