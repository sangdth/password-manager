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
                <a class="button is-dark is-outlined" href="#">
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
              <a href="#button" class="button is-large is-dark is-pulled-right">
                <span class="icon"><i class="fa fa-sort-alpha-asc"></i></span>
              </a>
            </div> <!-- Sort button alpha -->
          
            <div class="column is-narrow">
              <a href="#button" class="button is-large is-light is-pulled-right">
                <span class="icon"><i class="fa fa-sort-amount-desc"></i></span>
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
                    <input class="input is-large is-narrow" v-model="inAccount" type="text" placeholder="Account">
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow" v-model="inUsername" type="text" placeholder="Username">
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow" :class="{'is-danger': errors.has('email') }" v-model="inEmail" v-validate="'required|email'" type="email" name="email" placeholder="Email">
                    <p class="has-text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
                  </div>
                </div>
              </div>
              
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input class="input is-large is-narrow" :class="{'is-danger': errors.has('password') }" v-model="inPassword" v-validate="'required'" name="password" type="text" placeholder="Password">
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
          </div> <!-- ADD BUTTON -->
          
        </div>
      </div>
    </section>
    
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">About Password Manager</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Simple HTML/CSS application to control passwords in easy way.</p>
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
          <button class="button">Cancel</button>
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
          },
          {
            id: 4,
            account: 'Github',
            username: 'sangdth',
            email: 'sangdth@gmail.com',
            password: '****',
            used: 456,
            note: 'github ipsum'
          }
        ],
      }
    },

    mounted: function() {
      //this.isReadyToAdd = false
    },
    computed: {
      // currentIndex: function() {
      //    return this.database.length;
      //  }
      isReadyToAdd: function () {
        // isReadyToAdd must true when all form are validated.
      },
      
      addBtnClassObject: function () {
        return {
          'is-success': this.isReadyToAdd,
          'is-static': !this.isReadyToAdd
        }
      }
    },
    
    methods: {
      addRow: function() {
        this.database.push({
          id: this.currentIndex += 1,
          account: this.inAccount,
          username: this.inUsername,
          email: this.inEmail,
          password: this.inPassword,
          used: 0
        })
      },
      
      delRow: function(index) {
        this.database.splice(index, 1);
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body { font-family: 'Source Sans Pro', sans-serif; }

</style>
