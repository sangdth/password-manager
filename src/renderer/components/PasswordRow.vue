<template>
  <tr>
    <td>{{ account }}</td>
    <td>{{ username }}</td>
    <td>{{ email }}</td>
    <td>{{ password }}
      <span class="is-pulled-right">
        <a v-clipboard:copy="password" v-clipboard:success="handleCopyStatus(true)" v-clipboard:error="handleCopyStatus(false)" class="button is-small is-outline tooltip" data-tooltip="Copy" data-placement="top"><i class="fa fa-clipboard"></i></a>
        <a @click="editRow(id)" class="button is-small is-outline tooltip" data-tooltip="Edit" data-placement="top"><i class="fa fa-pencil fa-lg"></i></a>
        <a @click="delRow(id)" class="button is-small is-outline tooltip" data-tooltip="Delete" data-placement="top"><i class="fa fa-trash-o fa-lg"></i></a>
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
      }
    },
    
    methods: {
      handleCopyStatus: function(status) {
        this.copySucceeded = status;
      },
      delRow: function() {
        this.$emit('remove');
      },
      
      editRow: function() {
        
      },
    }
  }
</script>
