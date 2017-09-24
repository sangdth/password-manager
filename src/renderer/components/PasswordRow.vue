<template>
  <tr>
    <td>{{ account }}</td>
    <td>{{ username }}</td>
    <td>{{ email }}</td>
    <td>{{ password }} <span class="tag is-light is-pulled-right">{{ used }}</span></td>
    <td>{{ note }}</td>
    <td>
      <a class="button is-small is-outline tooltip" data-tooltip="Edit" data-placement="top" href="#"><i class="fa fa-pencil fa-lg"></i></a>
      <a class="button is-small is-outline tooltip" @click="delRow(id)" data-tooltip="Delete" data-placement="top" href="#delete"><i class="fa fa-trash-o fa-lg"></i></a>
    </td>
    </tr>
</template>

<script>
  export default {
    props: ['id', 'account', 'username', 'email', 'password', 'used', 'note'],
    
    data () {
      return {
        
      }
    },
    
    methods: {
      delRow: function() {
        this.$emit('remove');
      }
    }
  }
</script>
