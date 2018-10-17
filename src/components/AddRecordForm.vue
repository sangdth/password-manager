<template>
  <el-dialog :visible.sync="visible">
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
  </el-dialog>
</template>

<script>
export default {
  name: 'AddNewRecordForm',

  props: {
    form: {
      type: Object,
      default() {
        return {
          service: '',
          email: '',
          password: '',
        };
      },
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
</style>
