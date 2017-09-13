Vue.component('password-row', {
  props: ['id', 'account', 'username', 'email', 'password', 'used', 'note'],
  template: `
      <tr>
        <th>{{ id }}</th>
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
  `
});

new Vue({
  el: '#root',

  data: {
    msg: 'Hi, search your passwords here',
    id: '',
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
  },
  
  computed: {
    currentIndex: function() {
       return this.database.length;
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
    delRow: function(id) {
      
    }
  }

});