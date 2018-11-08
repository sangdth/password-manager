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
            autofocus
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
// import errorHandler from '@/common/error.handler';

export default {
  name: 'SigninForm',

  props: ['visible'],

  data() {
    return {
      isWrong: true,
      firstTime: true,
      form: {
        passphrase: '',
      },
    };
  },

  computed: {
    ...mapGetters('auth', ['userData']),
  },

  created() {
    this.$store.dispatch('auth/GET_USER_DATA')
      .then((data) => {
        if (data.passphrase) this.firstTime = false;
      });
  },

  methods: {
    handleSignIn() {
      if (this.firstTime) {
        storage.set(
          'user-data',
          { passphrase: this.form.passphrase },
          (error) => {
            if (error) throw error;

            this.$store.dispatch('auth/GET_USER_DATA');

            this.$message({
              type: 'success',
              message: 'Passphrase was set! New database was initiated!',
              showClose: true,
            });
            this.$emit('update:visible', false);
          },
        );
      } else if (this.form.passphrase === this.userData.passphrase) {
        // we need to encode the passphrase in future
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
