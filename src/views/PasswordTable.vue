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
            <span class="left password">
              {{ coverPassword(scope.row) }}
            </span>
            <span class="right">
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-document"
                @click="handleCopy(scope.row)"
                plain
              />
              <el-button
                size="mini"
                type="success"
                icon="el-icon-view"
                @click="handleShow(scope.row)"
                plain
              >
              </el-button>
              <el-button
                size="mini"
                type="info"
                icon="el-icon-edit"
                @click="editButtonClick(scope.row)"
                plain
              />
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
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
        @click="handleAdd"
        circle
      />
    </div>

    <!-- Dialog for add new/edit record -->
    <el-dialog
      title="Record Editor"
      :visible.sync="recordEditorVisible"
    >
      <record-editor
        :visible.sync="recordEditorVisible"
        :is-new="isNew"
        :record-id="selectedRow.id"
        @submit="handleSubmitRecord"
      />
    </el-dialog>

    <!-- Dialog for sign in -->
    <el-dialog
      title="Enter Your Passphrase"
      top="25vh"
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
import { isEmpty, omit } from 'lodash';
import { mapGetters } from 'vuex';
// import api from '@/common/api.services';
// import errorHandler from '@/common/error.handler';
import SignInForm from '@/components/SignInForm';
import RecordEditor from '@/components/RecordEditor';

export default {
  name: 'PasswordTable',

  components: { SignInForm, RecordEditor },

  data() {
    return {
      loading: false,
      form: {
        id: '',
        service: '',
        email: '',
        password: '',
      },
      gistName: 'v9fhSnk@Y*xUK6udP16tmD*V9fKF',
      passphrase: '',
      gistId: '',
      isNew: false,
      addRecordFormVisible: false, // #
      recordEditorVisible: false,
      signInFormVisible: true,
      selectedRow: {},
      flag: false,
      timeLeft: 0,
    };
  },

  computed: {
    ...mapGetters('auth', ['userData']),
    ...mapGetters('database', ['localPasswords']),

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
    this.$store.dispatch('database/GET_PASSWORDS');
    this.$store.dispatch('auth/GET_USER_DATA');
  },

  methods: {
    uuid() {
      return `-${Math.random().toString(36).substr(2, 9)}`;
    },

    selectedClass({ row }) {
      if (row === this.selectedRow) {
        return 'success-row';
      }
      return '';
    },

    coverPassword(row) {
      const decodedPassword = this.$decode(row.password, this.userData.passphrase);
      if (this.flag && this.selectedRow.service === row.service) {
        return decodedPassword;
      }
      return '*'.repeat(decodedPassword.length);
    },

    handleShow(row) {
      let timeLeft = 0;

      this.$Progress.start();
      this.selectedRow = row;
      this.flag = !this.flag;

      setTimeout(() => { this.flag = false; }, 3000);

      const x = setInterval(() => {
        timeLeft += 1;
        this.$Progress.set(timeLeft);

        if (timeLeft >= 90) {
          clearInterval(x);
          this.$Progress.finish();
        }
      }, 30);
    },

    handleCopy(row) {
      this.selectedRow = row;
      this.$copyText(this.$decode(row.password, this.userData.passphrase))
        .then(() => {
          this.$message({
            type: 'success',
            message: 'Password copied!',
            showClose: true,
          });
        });
    },

    handleRowClick(row) {
      this.selectedRow = row;
    },

    openSetting() {
      this.onSetting = true;
    },

    closeSetting() {
      this.onSetting = false;
    },

    handleAdd() {
      this.recordEditorVisible = !this.recordEditorVisible;
      this.isNew = true;
      this.form = {};
    },

    editButtonClick(record) {
      this.recordEditorVisible = !this.recordEditorVisible;
      this.selectedRow = record;
      this.isNew = false;
      this.form = record;
    },

    handleSubmitRecord() {},
    onAddNewSubmit() {
      const uuid = this.data.service.toLowerCase() + this.uuid();
      const encodedItem = {
        id: uuid,
        service: this.data.service,
        email: this.data.email,
        password: this.$encode(this.data.password, this.userData.passphrase),
      };

      const tempObj = Object.assign({}, this.localPasswords);
      tempObj[uuid] = encodedItem;

      this.loading = true;
      storage.set(
        'local-passwords',
        tempObj,
        (error) => {
          if (error) throw error;
          this.loading = false;
          this.$emit('update:visible', false);
          this.$store.dispatch('database/GET_PASSWORDS');
        },
      );
    },

    handleDelete(row) {
      this.$prompt('Please input your passphrase', 'Are you sure?', {
        confirmButtonText: 'OK, Delete',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel',
        inputType: 'password',
      }).then(({ value }) => {
        if (value === this.userData.passphrase) {
          this.loading = true;
          storage.set(
            'local-passwords',
            omit(this.localPasswords, [row.id]),
            (error) => {
              if (error) throw error;

              this.$store.dispatch('database/GET_PASSWORDS');
              this.loading = false;
              this.$message({
                type: 'success',
                message: 'Record deleted!',
                showClose: true,
              });
            },
          );
        } else {
          this.$message({
            type: 'danger',
            message: 'Wrong passphrase, please try again.',
            showClose: true,
          });
        }
      });
    },
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
.password {
  font-family: 'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;
}
</style>
