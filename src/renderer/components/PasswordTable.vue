<template>
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
          <a class="button is-large is-pulled-right" :class="onAtoZ ? 'is-dark' : 'is-light'" @click="toggleAtoZ">
            <span class="icon"><i class="fa" :class="tmpAtoZ ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc'"></i></span>
          </a>
        </div> <!-- Sort button alpha -->
      
        <div class="column is-narrow">
          <a class="button is-large is-pulled-right" :class="onNumber ? 'is-dark' : 'is-light'" @click="toggleNumber">
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
          <a @click="addRow" class="button is-large is-pulled-right" :class="addBtnClassObject">
            <span class="icon"><i class="fa fa-plus"></i></span>
            <span>Add Account</span>
          </a>
          
        </div> <!-- ADD BUTTON -->

      </div>
    </div>
  </section>
</template>

<script>
  // import app from 'electron';
  import PasswordRow from './PasswordRow';

  export default {
    name: 'password-table',
    components: { PasswordRow },
    
    data () {
      return {
        msg: 'Search your passwords here',
        currentIndex: 0,
        inAccount: '',
        inUsername: '',
        inEmail:'',
        inPassword: '',
        onSetting: false,
        tmpAtoZ: false,
        tmpNumber: false,
        onAtoZ: true,
        onNumber: false,
        database: [],
        writeTrigger: false,
      }
    },

    mounted: function() {
      this.updateDatabase();
    },
    
    computed: {

      isFormHasValue() {
        return Boolean(this.inAccount) && Boolean(this.inUsername)
              && Boolean(this.inEmail) && Boolean(this.inPassword);
      },
      
      isAnyError() {
        if ( !this.isFormHasValue ) {
          return true;
         } else {
          return this.errors.any();
        }
      },
      
      addBtnClassObject() {
        return {
          'is-success': !this.isAnyError,
          'is-static': this.isAnyError
        }
      },
    },
    
    methods: {
      addRow: function() {
        this.$db.insert({
          account: this.inAccount,
          username: this.inUsername,
          email: this.inEmail,
          password: this.inPassword,
          used: 0
        });
        
        this.updateDatabase();
        
        this.inAccount = '';
        this.inUsername = '';
        this.inEmail = '';
        this.inPassword = '';
        this.writeTrigger = true;
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
      },
      
      updateDatabase() {
        this.$db.find({}, (err, docs) => { 
          this.database = docs.slice();
        });
      }

    }
  }
</script>

<style>

</style>
