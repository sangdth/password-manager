<template>
  <tr>
    <td>{{ account }}</td>
    <td>{{ username }}</td>
    <td>{{ email }}</td>
    <td><span type="password">{{ password }}</span>
      <span class="is-pulled-right">
        <a  v-clipboard:copy="password" v-clipboard:success="onSuccess" v-clipboard:error="onError"
            @click="count"
            class="button is-small is-outline tooltip" type="button" 
            data-tooltip="Copy" data-placement="top">
            <i class="fa fa-clipboard"></i>
        </a>  
        <a  @click="editRow(id)" 
            class="button is-small is-outline tooltip" 
            data-tooltip="Edit" data-placement="top">
            <i class="fa fa-pencil fa-lg"></i>
        </a>
        
        <a 
            v-show="!confirm" @click.prevent="confirm=!confirm"
            class="button is-small is-outline tooltip" 
            data-tooltip="Delete" data-placement="top">
            <i class="fa fa-trash-o fa-lg"></i>
        </a>
        <span 
            v-show="confirm" class="is-size-7">Sure?</span>
        <button 
            v-show="confirm" 
    				class="button is-small is-danger"
            @click="delRow(id)">
    			Yes
    		</button>
        <button 
    				v-show="confirm" 
    				class="button is-small is-dark"
    				@click.prevent="confirm=!confirm">
    			No
    		</button>
      </span>
      
    </td>
    <td>{{ note }} <span class="tag is-light is-pulled-right">{{ used }}</span></td>
    </tr>
</template>

<script>
  export default {
    props: ['id', 'account', 'username', 'email', 'password', 'used', 'note'],
    
    data () {
      return {
        isEditMode: false,
        copySucceeded: null,
        confirm: false,
      }
    },
    
    methods: {
      onSuccess: function() {
        this.copySucceeded = true;
      },
      
      onError: function() {
        this.copySucceeded = false;
      },
      
      delRow: function() {
        this.$emit('remove');
      },
      
      confirmDelete: function() {
        
      },
      
      editRow: function() {
        
      },
      
      count: function() {
        // still not save into database, try later
        // this.used += 1;
      }
    }
  }
</script>
