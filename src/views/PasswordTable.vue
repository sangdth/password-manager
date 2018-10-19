<template>
  <div class="password-table">
    <h3>Password List</h3>
    <el-table
      :data="passwords"
      height="577"
      v-loading="loading"
      class="password-list"
    >
      <el-table-column
        prop="service"
        label="Services"
        width="180"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="password"
        label="Password"
      >
        <template slot-scope="scope">
          <span class="left">
            {{ scope.row.password }}
          </span>
          <span class="right">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-view"
              @click="handleEdit(scope.$index, scope.row)"
              plain
            />
            <el-button
              size="mini"
              type="info"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              plain
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              plain
            />
          </span>
      </template>
      </el-table-column>
    </el-table>

    <!-- Dialog for add new record -->
    <el-dialog
      title="Add New Record"
      :visible.sync="addRecordFormVisible"
    >
      <el-form
        :model="form"
        :label-position="'right'"
        label-width="80px"
      >
        <el-form-item label="Service">
          <el-input
            v-model="form.service"
            placeholder="Service"
          />
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            v-model="form.email"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="handleAddRecord"
          >
            Add New Record
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="big-float"
      @click="addRecordFormVisible = !addRecordFormVisible"
      circle
    />
  </div>
</template>

<script>
import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';
import api from '@/common/api.services';
import simpleCrypto from '@/common/simple.crypto';
import errorHandler from '@/common/error.handler';

export default {
  name: 'PasswordTable',

  data() {
    return {
      loading: false,
      passwords: [],
      form: {
        service: '',
        email: '',
        password: '',
      },
      gistName: 'v9fhSnk@Y*xUK6udP16tmD*V9fKF',
      passphrase: '',
      gistId: '',
      addRecordFormVisible: false,
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

    async handleAddRecord() {
      this.loading = true;
      this.passwords.push(this.form);
      const encodedData = simpleCrypto.encode(JSON.stringify(this.passwords), this.passphrase);
      // console.log(encodedData);
      // console.log(this.decode(encodedData, this.passphrase));
      const id = this.gistId;
      const gist = {
        description: 'Test from my app',
        files: {
          [this.gistName]: { content: encodedData },
          // newName: { content: '炼' },
        },
      };
      // console.log(gist);
      // why edit gist got 404?
      await this.$store.dispatch('gist/EDIT_GIST', { id, gist })
        .then((res) => {
          this.addRecordFormVisible = false;
          this.$message({
            type: 'success',
            message: 'Updated data successfully!',
            showClose: true,
          });
          console.log('add record', res);
        })
        .catch((e) => {
          errorHandler(e);
        });
      this.loading = false;
    },

    openSetting() {
      this.onSetting = true;
    },

    closeSetting() {
      this.onSetting = false;
    },

    handleEdit() {},
    handleDelete() {},
  },
};
</script>

<style lang="scss" scoped>
.password-list {
  width: 100%;
}
.big-float {
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  padding: 30px;
}
</style>
