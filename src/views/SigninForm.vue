<template>
  <el-row type="flex" justify="center">
    <el-col :span="15">
      <div class="header">
        <img
          class="logo"
          src="@/assets/bat-logo.png"
        >
      </div>
      <el-form
        ref="signinForm"
        :model="form"
        label-width="200px"
      >
        <el-form-item label="Access token">
          <el-input
            v-model="form.token"
            name="token"
            type="password"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-view toggle-icon"
              @click="toggleVisible($event)"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="Passphrase">
          <el-input
            v-model="form.passphrase"
            name="passphrase"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="Gist ID">
          <el-input
            v-model="form.gistId"
            name="gistId"
            type="password"
            :disabled="form.newGist"
          ></el-input>
        </el-form-item>
        <el-form-item label="Generate new gist">
          <el-switch v-model="form.newGist"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Sign In</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';
// import simpleCrypto from '../common/simple.crypto';
import errorHandler from '@/common/error.handler';

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

  watch: {
    form: {
      handler() {
        /*
        if (this.form.newGist) {
          this.form.gistId = '';
        }
        */
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters('auth', ['isAuthed']),
    ...mapGetters('gist', ['rawData']),
  },

  created() {
    storage.get('user-data', (error, data) => {
      if (error) throw error;
      // console.log('storage', data);
      if (data.token) {
        this.form.token = data.token;
      }
      if (data.passphrase) {
        this.form.passphrase = data.passphrase;
      }
      if (data.gistId) {
        this.form.gistId = data.gistId;
      }
    });
  },

  methods: {
    toggleVisible(e) {
      // console.log('I can click on icon', e);
    },

    onSubmit() {
      // console.log('run onSubmit');
      this.$store.dispatch('auth/SIGN_IN', this.form)
        .then(() => {
          // console.log('after sign in');
          if (this.isAuthed) {
            this.$router.push({ name: 'password-table' });
          }
        })
        .catch((e) => {
          errorHandler(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 200px;
  padding-top: 10px;

  .logo {
    display: block;
    width: 100px;
    margin: 20px auto;
  }
}
.toggle-icon {
  cursor: pointer;
}
</style>
