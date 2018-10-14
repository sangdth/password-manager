<template>
  <div class="password-table">
    <el-table>

    </el-table>
  </div>
</template>

<script>
import { mapGeters } from 'vuex';
import simpleCrypto from '../common/simple.crypto';

export default {
  name: 'PasswordTable',

  data() {
    return {
      msg: 'Search your passwords here',
      test: 'test',
      filterText: '',
      currentIndex: 0,
      inAccount: '',
      inUsername: 'sangdth',
      inEmail: 'sangdth@gmail.com',
      inPassword: '',
      onSetting: false,
      tmpAtoZ: false,
      tmpNumber: false,
      onAtoZ: true,
      onNumber: false,
      database: [],
      writeTrigger: false,
      sortKey: 'name',
      reverse: false,
    };
  },

  computed: {
    ...mapGeters('gist', ['passwords']),

    encoded() {
      return simpleCrypto.encode(this.test, 'mypassword');
    },
  },

  methods: {
    decode(i) {
      return simpleCrypto.decode(i, 'mypassword');
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
