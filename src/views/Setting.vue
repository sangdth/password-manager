<template>
  <div class="setting-wrapper">
    <h3>Setting</h3>
    <el-form
      ref="settingForm"
      :model="form"
      label-width="150px"
      label-position="left"
    >
      <el-row
        :gutter="40"
        type="flex"
        justify="center"
      >
        <!-- el-col :span="12">
          <h5>Sync with Gist</h5>
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
          <transition name="el-zoom-in-top">
          <el-form-item v-show="form.newGist" label="Gist Name">
            <el-input
              v-model="form.gistName"
              name="gistName"
              type="text"
              :disabled="!form.newGist"
              autofocus
            ></el-input>
          </el-form-item>
          </transition>
          <el-form-item>
            <el-button
              :disabled="!form.token.length"
              type="primary"
              @click="onSubmit"
            >
              Start Sync
            </el-button>
          </el-form-item>
        </el-col -->
        <el-col :span="12">
          <h5>Reset</h5>
          <el-button
            type="danger"
            @click="handleReset"
            plain
          >
            Clear All Data and Reset
          </el-button>
          <p class="warning">
            Note: There is no way to get your data back, do with caution!
          </p>
          <hr class="ruler">
          <p class="version"><small>v3.0-beta.1</small></p>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';
import errorHandler from '@/common/error.handler';
import { GET_USER_DATA, CLEAR_ALL_DATA } from '@/store/types';

export default {
  name: 'SettingView',

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
    ...mapGetters('auth', ['userData']),
    ...mapGetters('gist', ['rawData']),
  },

  created() {
    this.$store.dispatch(`auth/${GET_USER_DATA}`)
      .then((res) => {
        console.log('res', res);
      })
      .catch((e) => {
        errorHandler(e);
      });
  },

  methods: {
    toggleVisible() {
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

    handleReset() {
      this.$prompt('Please input your passphrase', 'Are you sure?', {
        confirmButtonText: 'OK, Reset',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel',
        inputType: 'password',
      }).then(({ value }) => {
        if (value === this.userData.passphrase) {
          this.$store.dispatch(`auth/${CLEAR_ALL_DATA}`).then(() => {
            this.$message({
              type: 'success',
              message: 'Reset finish!',
            });

            this.$router.push({ name: 'password-table' });
          });
        } else {
          this.$message({
            type: 'danger',
            message: 'Wrong passphrase, please try again.',
          });
        }
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

.warning {
  font-size: 12px;
  color: #EE0000;
}
.ruler {
  margin: 20px auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.version {
  font-size: 12px;
  color: #CCC;
  font-weight: bold;
}
.toggle-icon {
  cursor: pointer;
}
</style>
