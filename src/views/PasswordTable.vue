<template>
  <div class="password-table">
    <el-form
      :inline="true"
      :model="form"
    >
      <el-form-item>
        <el-input
          v-model="form.service"
          placeholder="Service"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.email"
          placeholder="Email"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleAddRecord"
        >
          Add New Record
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';
import api from '@/common/api.services';
import simpleCrypto from '@/common/simple.crypto';

export default {
  name: 'PasswordTable',

  data() {
    return {
      passwords: [],
      form: {
        service: '',
        email: '',
        password: '',
      },
      gistName: 'v9fhSnk@Y*xUK6udP16tmD*V9fKF',
      passphrase: '',
      gistId: '',
    };
  },

  computed: {
    ...mapGetters('auth', ['isAuthed']),
    ...mapGetters('gist', ['rawData']),
  },

  created() {
    storage.get('user-data', (error, data) => {
      if (error) throw error;
      // console.log('storage', data);
      if (data.token && data.passphrase && data.gistId) {
        api.setHeaders(data.token);
        this.passphrase = data.passphrase;
        this.gistId = data.gistId;

        this.$store.commit('auth/SET_AUTH', true);
        this.$store.dispatch('gist/GET_GIST', data.gistId)
          .then(() => {
            // We need somehow get the file name dynamically
            const encodedData = this.rawData.files[this.gistName].content;
            this.passwords = this.decode(encodedData, data.passphrase);
          });
      } else {
        this.$router.push({ name: 'signin' });
      }
    });
  },

  methods: {
    // encode(s, p) {
    // return JSON.stringify(simpleCrypto.encode(s, p));
    // },

    decode(s, p) {
      // console.log(simpleCrypto.decode(s, p));
      return JSON.parse(simpleCrypto.decode(s, p));
    },

    handleAddRecord() {
      this.passwords.push(this.form);
      const encodedData = simpleCrypto.encode(JSON.stringify(this.passwords), this.passphrase);
      console.log(encodedData);
      // console.log(this.decode(encodedData, this.passphrase));
      const id = this.gistId;
      const gist = {
        description: 'Test from my app',
        files: {
          [this.gistName]: { content: encodedData },
          // newName: { content: '炼' },
        },
      };
      console.log(gist);
      // why edit gist got 404?
      this.$store.dispatch('gist/EDIT_GIST', { id, gist })
        .then((res) => {
          console.log('add record', res);
        });
    },

    openSetting() {
      this.onSetting = true;
    },

    closeSetting() {
      this.onSetting = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
