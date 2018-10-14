<template>
  <div class="test">
   x  test§
  </div>
</template>

<script>
export default {
  name: 'PasswordTable',

  data() {
    return {
      msg: 'Search your passwords here',
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
    isAnyError() {
      if (!this.isFormHasValue) {
        return true;
      }
      return this.errors.any();
    },

    filterPasswords() {
      const self = this;
      return this.database.filter(element =>
        element.account.toLowerCase().indexOf(self.filterText.toLowerCase()) >= 0);
    },
  },

  methods: {
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
