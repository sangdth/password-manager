<template>
  <el-form
    :model="data"
    :label-position="'right'"
    label-width="80px"
    @keyup.enter.native="submit"
  >
    <el-form-item label="Service">
      <el-input
        v-model="data.service"
        placeholder="Service"
      />
    </el-form-item>
    <el-form-item label="Email">
      <el-input
        v-model="data.email"
        placeholder="Email"
      />
    </el-form-item>
    <el-form-item label="Password">
      <el-input
        v-model="data.password"
        type="password"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        @click="onSubmit"
      >
        {{ isNew ? 'Add New Record' : 'Edit Record' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import storage from 'electron-json-storage';
import { mapGetters } from 'vuex';

export default {
  name: 'RecordEditor',

  props: {
    isNew: Boolean,
    visible: Boolean,
    data: Object,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters('database', ['localPasswords']),
    ...mapGetters('auth', ['userData']),
  },

  methods: {
    uuid() {
      return `-${Math.random().toString(36).substr(2, 9)}`;
    },

    onSubmit() {
      if (this.isNew) {
        this.handleAddNew();
      } else {
        this.handleUpdate();
      }
    },

    handleUpdate() {

    },

    handleAddNew() {
      const uuid = this.data.service.toLowerCase() + this.uuid();
      const encodedItem = {
        id: uuid,
        service: this.data.service,
        email: this.data.email,
        password: this.$encode(this.data.password, this.userData.passphrase),
      };

      const tempObj = Object.assign({}, this.localPasswords);
      tempObj.uuid = encodedItem;

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
  },
};
</script>

<style>
</style>
