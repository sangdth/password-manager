<template>
  <el-container>
    <el-aside width="64px" class="side-menu">
      <el-menu
        router
        collapse
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">Passwords</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title"> Settings</span>
        </el-menu-item>
        <el-menu-item index="/signin">
          <i class="el-icon-star-off"></i>
          <span slot="title"> Signin</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Tom</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  name: 'PasswordManager',

  data() {
    return {
      activeIndex: '',
    };
  },

  watch: {
    $route() {
      this.handleSelect();
    },
  },

  methods: {
    handleSelect() {
      this.activeIndex = this.$route.path;
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-app-region: drag;

  .side-menu {
    padding-top: 50px;
  }

}
.can-not-select {
    -webkit-user-select: none;
}
</style>
