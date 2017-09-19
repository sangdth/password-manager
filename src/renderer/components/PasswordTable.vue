<template>
  <div id="wrapper">

    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#home">
            <span class="has-text-weight-bold is-size-5">Password Manager</span>
          </a>

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
                <a class="button is-dark is-outlined" href="#" @click="openSetting">
                  <span class="icon">
                    <i class="fa fa-cog"></i>
                  </span>
                  <span>Settings</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav> <!-- End Navbar -->
    </div>
  
      <section class="section">
        <div class="container">
          <div class="columns">
          
            <div class="column">
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="text" :placeholder="msg">
                </div>
              </div>
            </div>  <!-- End search form -->
          
            <div class="column is-narrow">
              <a href="#button" class="button is-large is-pulled-right" :class="onAtoZ ? 'is-dark' : 'is-light'" @click="toggleAtoZ">
                <span class="icon"><i class="fa" :class="tmpAtoZ ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc'"></i></span>
              </a>
            </div> <!-- Sort button alpha -->
          
            <div class="column is-narrow">
              <a href="#button" class="button is-large is-pulled-right" :class="onNumber ? 'is-dark' : 'is-light'" @click="toggleNumber">
                <span class="icon"><i class="fa" :class="tmpNumber ? 'fa-sort-amount-asc' : 'fa-sort-amount-desc'"></i></span>
              </a>
            </div>  <!-- Sort button amount -->
 
          </div> <!-- End columns -->
        </div>  <!-- End container -->
        
        <br>
      
        <div class="container">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Account</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Account</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </tfoot>
            <tr is="password-row" v-for="(record, index) in database" v-bind:key="index" @remove="delRow(index)"
              v-bind:account="record.account"
              v-bind:username="record.username"
              v-bind:email="record.email"
              v-bind:password="record.password"
              v-bind:used="record.used"
              v-bind:note="record.note" 
              ></tr>
          </table>
        </div>  <!-- End container of table -->
      
      <div class="container">
        <div class="columns">
          
          <div class="column"> <!-- Inputs -->
            <div class="columns">
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow" 
                    v-validate="'required'" v-model="inAccount" name="account" 
                    type="text" placeholder="Account">
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow" 
                    v-validate="'required'" v-model="inUsername" name="username" 
                    type="text" placeholder="Username">
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow"
                    v-validate="'required|email'" v-model="inEmail" name="email" 
                    type="email" placeholder="Email">
                    
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow"
                    v-validate="'required'" v-model="inPassword" name="password" 
                    type="text" placeholder="Password">
                  </div>
                </div>
              </div>
              
            </div>
          </div> <!-- END INPUT -->
          
          <div class="column is-narrow">
            <a href="#add" @click="addRow" class="button is-large is-pulled-right" :class="addBtnClassObject">
              <span class="icon"><i class="fa fa-plus"></i></span>
              <span>Add Account</span>
            </a>
            <span v-show="fields.dirty">I'm Dirty</span>
          </div> <!-- ADD BUTTON -->
          
        </div>
      </div>
    </section>
    
    <div class="modal" :class="{'is-active' : onSetting}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Setting</p>
          <button class="delete" aria-label="close" @click="closeSetting"></button>
        </header>
        <section class="modal-card-body">
          <p>This is where we place the settings :D</p>
          <a class="is-hidden-desktop-only" href="#" target="_blank">
            <span class="icon">
              <i class="fa fa-2x fa-github"></i>
            </span>
          </a>
          <a class="is-hidden-desktop-only" href="#" target="_blank">
            <span class="icon is-medium">
              <i class="fa fa-2x fa-twitter"></i>
            </span>
          </a>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeSetting">Cancel</button>
        </footer>
      </div>
    </div>
  
    <footer class="footer footer-default">
        <div class="container">Copyright MIT.</div>
    </footer>
  </div>
</template>

<script>
  import app from 'electron';
  import PasswordRow from './PasswordTable/PasswordRow';

  export default {
    name: 'password-table',
    components: { PasswordRow },
    
    data () {
      return {
        currentIndex: 0,
        msg: 'Hi, search your passwords here',
        inAccount: '',
        inUsername: '',
        inEmail:'',
        inPassword: '',
        onSetting: false,
        tmpAtoZ: false,
        tmpNumber: false,
        onAtoZ: true,
        onNumber: false,
        database: [
          {
            id: 1,
            account: 'Google',
            username: 'sangdth',
            email: 'sangdth@gmail.com',
            password: '****',
            used: 3214,
            note: ''
          },
          {
            id: 2,
            account: 'Facebook',
            username: 'sangdth',
            email: 'sangdth@me.com',
            password: '****',
            used: 762,
            note: 'facebook ipsum'
          },
          {
            id: 3,
            account: 'Twitter',
            username: 'sangdth',
            email: 'sangdth@me.com',
            password: '****',
            used: 14,
            note: 'twitter ipsum'
          }
        ],
      }
    },

    mounted: function() {
      
    },
    
    computed: {
      
      isFormHasValue: function() {
        return Boolean(this.inAccount) && Boolean(this.inUsername)
              && Boolean(this.inEmail) && Boolean(this.inPassword);
      },
      
      isAnyError: function() {
        if ( !this.isFormHasValue ) {
          return true;
         } else {
          return this.errors.any();
        }
      },
      
      addBtnClassObject: function() {
        return {
          'is-success': !this.isAnyError,
          'is-static': this.isAnyError
        }
      }
    },
    
    methods: {
      addRow: function() {
        this.database.push({
          //id: this.currentIndex += 1,
          account: this.inAccount,
          username: this.inUsername,
          email: this.inEmail,
          password: this.inPassword,
          used: 0
        });
        this.inAccount = '';
        this.inUsername = '';
        this.inEmail = '';
        this.inPassword = '';
      },
      
      delRow: function(index) {
        this.database.splice(index, 1);
      },
      
      openSetting: function() {
        this.onSetting = true;
      },
      
      closeSetting: function() {
        this.onSetting = false;
      },
      
      toggleAtoZ: function() {
        this.tmpAtoZ = !this.tmpAtoZ;
        this.onAtoZ = true;
        this.onNumber = false;
      },
      
      toggleNumber: function() {
        this.tmpNumber = !this.tmpNumber;
        this.onAtoZ = false;
        this.onNumber = true;
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body { font-family: 'Source Sans Pro', sans-serif; }

</style>
