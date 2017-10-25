<template>
  <div id="app">
    
      <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
          <div class="container">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }">
            <a class="navbar-item">
              <span class="has-text-weight-bold is-size-5">Password Manager</span>
            </a>
          </router-link>
        </div> <!-- Navbar Brand -->
 
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link :to="{ name: 'setting' }">
                  <a class="button is-dark is-outlined">
                    <span class="icon">
                      <i class="fa fa-cog"></i>
                    </span>
                    <span>Settings</span>
                  </a>
                </router-link>
                
              </p>
            </div>
          </div>
        </div>
        </div>
      </nav> <!-- End Navbar -->
    <router-view></router-view>
    
    <footer class="footer footer-default can-not-select">
        <div class="container">Copyright MIT.</div>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  body {
    -webkit-app-region: drag;
  }
  .can-not-select {
      -webkit-user-select: none;
  }
</style>
