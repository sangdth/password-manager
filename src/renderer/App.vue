<template>
  <div id="app">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }">
            <a class="navbar-item">
              <span class="has-text-weight-bold is-size-5">Password Manager</span>
            </a>
          </router-link>

          <button class="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
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
      </nav> <!-- End Navbar -->
    </div>
    <router-view></router-view>
    
    <footer class="footer footer-default">
        <div class="container">Copyright MIT.</div>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  /* CSS */
</style>
