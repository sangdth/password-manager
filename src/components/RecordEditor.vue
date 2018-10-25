<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
  >
    <el-form
      :model="form"
      :label-position="'right'"
      label-width="80px"
      @keyup.enter.native="handleAddRecord"
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
</template>

<script>
import { isEmpty } from 'lodash';

export default {
  name: 'RecordEditor',

  props: {
    visible: Boolean,
    formData: Object,
  },

  data() {
    return {
      form: {
        id: '',
        service: '',
        email: '',
        password: '',
      },
      loading: false,
    };
  },

  computed: {
    isNew() {
      return isEmpty(this.formData);
    },

    dialogTitle() {
      return (this.isNew ? 'Add New Record' : 'Edit Record');
    },
  },

  methods: {
    handleAddRecord() {
      console.log('Added!');
    },
  },
};
</script>

<style>
</style>
