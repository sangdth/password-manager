<template>
  <el-form
    :model="form"
    :label-position="'right'"
    label-width="80px"
    @keyup.enter.native="submit"
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
        type="text"
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
import { mapGetters } from 'vuex';

export default {
  name: 'RecordEditor',

  props: {
    isNew: Boolean,
    visible: Boolean,
    recordId: '',
  },

  data() {
    return {
      loading: false,
      form: {
        id: '',
        service: '',
        email: '',
        password: '',
      },
    };
  },

  computed: {
    ...mapGetters('database', ['localPasswords']),
    ...mapGetters('auth', ['userData']),
  },

  watch: {
    visible() {
      if (!this.isNew) {
        this.form = Object.assign({}, this.localPasswords[this.recordId]);
      } else {
        this.form = {};
      }
    },
  },

  created() {
    // created hook can not be used because this component was not 
    // created at the moment, it is lazy loaded, means only create
    // on demand. (research more about this.
    if (!this.isNew) {
      this.form = Object.assign({}, this.localPasswords[this.recordId]);
    } else {
      this.form = {};
    }
  },

  mounted() {
    console.log('asdfafasdfsafasdf');
  },

  methods: {
    onSubmit() {
      this.$emit('submit', this.form);
    },
  },
};
</script>

<style>
</style>
