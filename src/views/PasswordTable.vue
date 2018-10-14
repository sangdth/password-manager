<template>
  <div class="password-table">
    testx
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('gist', ['rawData']),

    encoded() {
      return simpleCrypto.encode(this.test, 'mypassword');
    },
  },

  beforeCreate() {
    this.$store.dispatch('gist/GET_DATA')
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
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
