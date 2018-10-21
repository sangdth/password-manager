<template>
  <div class="home-wrapper">
    <div v-if="!signInFormVisible" class="password-table">
      <h3>Password List</h3>
      <el-table
        :data="passwords"
        :row-class-name="selectedClass"
        height="577"
        v-loading="loading"
        class="password-list"
        @row-click="handleRowClick"
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
              {{ scope.row.password | coverPassword(flag) }}
            </span>
            <span class="right">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-view"
                @click="flag = !flag"
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

      <el-button
        type="primary"
        icon="el-icon-plus"
        class="big-float"
        @click="addRecordFormVisible = !addRecordFormVisible"
        circle
      />
    </div>

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

    <!-- Dialog for sign in -->
    <el-dialog
      title="Enter Your Passphrase"
      top="20vh"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="signInFormVisible"
      center
    >
      <sign-in-form :visible.sync="signInFormVisible"/>
    </el-dialog>
  </div>
</template>

<script>
import storage from 'electron-json-storage';
import { isEmpty } from 'lodash';
import { mapGetters } from 'vuex';
import coverPassword from '@/filters/cover-password';
// import api from '@/common/api.services';
// import errorHandler from '@/common/error.handler';
import SignInForm from '@/components/SignInForm';

export default {
  name: 'PasswordTable',

  components: { SignInForm },

  filters: { coverPassword },

  data() {
    return {
      loading: false,
      userData: null,
      localPasswords: {},
      form: {
        service: '',
        email: '',
        password: '',
      },
      gistName: 'v9fhSnk@Y*xUK6udP16tmD*V9fKF',
      passphrase: '',
      gistId: '',
      addRecordFormVisible: false,
      signInFormVisible: true,
      selectedRow: {},
      flag: true,
    };
  },

  computed: {
    ...mapGetters('auth', ['isAuthed']),
    ...mapGetters('gist', ['rawData']),

    passwords() {
      // convert object data to array so table can display
      if (!isEmpty(this.localPasswords)) {
        const tempArray = [];
        const entries = Object.entries(this.localPasswords);
        for (let i = 0; i < entries.length; i++) {
          tempArray.push(entries[i][1]);
        }
        return tempArray;
      }
      return [];
    },
  },

  created() {
    this.getAllData();
  },

  updated() {
    this.getAllData();
  },

  methods: {
    getAllData() {
      storage.getMany(['user-data', 'local-passwords'], (error, data) => {
        if (error) throw error;
        // get data
        this.userData = data['user-data'];

        this.localPasswords = data['local-passwords'];
      });
    },

    async handleAddRecord() {
      const encodedItem = {
        service: this.form.service,
        email: this.form.email,
        password: this.$encode(this.form.password, this.userData.passphrase),
      };

      // this.localPasswords[this.form.service] = encodedItem;
      this.$set(this.localPasswords, this.form.service, encodedItem);

      this.loading = true;
      storage.set(
        'local-passwords',
        this.localPasswords,
        (error) => {
          if (error) throw error;
          this.loading = false;
          this.addRecordFormVisible = false;
        },
      );
    },

    selectedClass({ row }) {
      if (row === this.selectedRow) {
        return 'success-row';
      }
      return '';
    },

    handleRowClick(row) {
      this.selectedRow = row;
      // console.log(row);
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

/* Save for future use
api.setHeaders(data.token);
this.passphrase = data.passphrase;
this.gistId = data.gistId;

this.$store.commit('auth/SET_AUTH', true);
this.$store.dispatch('gist/GET_GIST', data.gistId)
  .then(() => {
    // We need somehow get the file name dynamically
    const encodedData = this.rawData.files[this.gistName].content;
    this.passwords = this.$decode(encodedData, data.passphrase);
  });

const encodedData = this.$encode(this.passwords, this.passphrase);
const id = this.gistId;
const gist = {
  description: 'Test from my app',
  files: {
    [this.gistName]: { content: encodedData },
  },
};

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
*/
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
