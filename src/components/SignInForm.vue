<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <div class="header">
        <img
          class="logo"
          src="@/assets/bat-logo.png"
        >
      </div>
      <el-form
        ref="signinForm"
        :inline="true"
        :model="form"
        class="sign-in-form"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input
            v-model="form.passphrase"
            name="passphrase"
            prop="passphrase"
            type="password"
            placeholder="Passphrase"
            @keyup.enter.native="handleSignIn"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :type="form.passphrase.length ? 'primary' : 'info'"
            :disabled="!form.passphrase.length"
            icon="el-icon-arrow-right"
            class="signin-btn"
            @click="handleSignIn"
            circle
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';
import errorHandler from '@/common/error.handler';

export default {
  name: 'SigninForm',

  props: ['visible'],

  data() {
    return {
      isWrong: true,
      form: {
        gistId: '',
        token: '',
        passphrase: '',
        newGist: false,
      },

      userData: {},
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

      if (data.passphrase) {
        localStorage.setItem('first-time', 'false');
        this.userData = data;
      } else {
        localStorage.setItem('first-time', 'true');
      }

      this.userData = data;
    });
  },

  methods: {
    handleSignIn() {
      // we need to encode the passphrase in future
      if (this.form.passphrase === this.userData.passphrase) {
        this.$message({
          type: 'success',
          message: 'Welcome back!',
          showClose: true,
        });
        this.$emit('update:visible', false);
      } else {
        this.$message({
          type: 'error',
          message: 'Wrong passphrase',
          showClose: true,
        });
      }
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
  height: 120px;

  .logo {
    display: block;
    width: 80px;
    margin: 10px auto 30px;
  }
}
.toggle-icon {
  cursor: pointer;
}
.sign-in-form {
  display: flex;
  justify-content: center;
}
.signin-btn {
  animation: fadein 0.5s;
}

// These css used to animate the sign in button
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes fadein {
  from { opacity:0; }
  to { opacity:1; }
}

</style>
