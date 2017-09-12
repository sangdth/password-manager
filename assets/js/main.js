Vue.component('password-list', {
  template: `
  <table class="table is-bordered is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
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
        <th>#</th>
        <th>Account</th>
        <th>Username</th>
        <th>Email</th>
        <th>Password</th>
        <th>Note</th>
        <th>Action</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="record in db">
        <th>{{ record.id }}</th>
        <td>{{ record.account }}</td>
        <td>{{ record.username }}</td>
        <td>{{ record.email }}</td>
        <td>{{ record.password }}</td>
        <td>{{ record.note }}</td>
        <td>
            <a class="button is-small is-outline" rel="tooltip " title="Edit " data-placement="top " href="# "><i class="fa fa-pencil fa-lg "></i></a>
            <a class="button is-small is-outline " rel="tooltip " title="Delete " data-placement="top " href="# "><i class="fa fa-trash-o fa-lg "></i></a>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  data() {
    return { 
      db: [
        {
          "id": 1,
          "account": "Google",
          "username": "sangdth",
          "email": "sangdth@gmail.com",
          "password": "12345678",
          "note": "lorem ipsum"
        },
        {
          "id": 2,
          "account": "Facebook",
          "username": "sangdth",
          "email": "sangdth@me.com",
          "password": "12345678",
          "note": "facebook ipsum"
        },
        {
          "id": 3,
          "account": "Twitter",
          "username": "sangdth",
          "email": "sangdth@me.com",
          "password": "12345678",
          "note": "twitter ipsum"
        }
    ]}
  }
});

Vue.component('password-item', {
  props: {
    id: {
      type: Number,
      required: true
    },
    account: String,
    username: String,
    email: String,
    password: String,
    note: String
  },
  template: `
    <tr>
      <th>{{ id }}</th>
      <td>{{ account }}</td>
      <td>{{ username }}</td>
      <td>{{ email }}</td>
      <td>{{ password }}</td>
      <td>{{ note }}</td>
    </tr>
  `
});

new Vue({
  el: '#root',

  data: {
    msg: 'Hello this is Vue!',
  }

});