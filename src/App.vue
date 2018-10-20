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
      </el-menu>
    </el-aside>

    <el-container>
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
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
  font-weight: 400;
  -webkit-app-region: drag;
  -webkit-font-smoothing: antialiased;
  ::-webkit-scrollbar {
    width: 15px;
    height: 15px;
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    height: 0;
    width: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: #0000004d;
    border: 5px solid #0000;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    min-height: 20px;
    min-width: 20px;
    height: 5px;
    width: 5px;
  }

  .side-menu {
    padding-top: 50px;
    overflow: hidden;
  }

}
.can-not-select {
    -webkit-user-select: none;
}

.right {
  float: right;
}

.el-table {
  .el-table__row {
    cursor: pointer;

    &.success-row {
      background: #f0f9eb !important;
    }
  }
}
</style>
