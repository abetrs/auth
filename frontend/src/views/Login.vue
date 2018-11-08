<template>
  <div class="signup">
    <h2>Login page</h2>
    <form class="signup" @submit.prevent="logIn">
      <div class="form-group">
        <label class="col-form-label" for="inputDefault">Username</label>
        <input type="text" v-model="username" class="form-control" placeholder="Username" id="inputDefault">
      </div>
      <div class="form-group">
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" v-model="password" id="exampleInputPassword1"
            placeholder="Password">
          <div style="color: red;">{{invalid}}</div>
        </div>
        <button type="submit" class="btn btn-primary signup-submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        invalid: '',
      }
    },
    methods: {
      logIn: function() {
        const API_URL = "http://localhost:3000/auth/login";
        const sendData = {
          username: this.username,
          password: this.password
        };
        fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(resp => {
          resp.json().then(docs => {
            console.log(docs);
          });
        });
      }
    },
  }

</script>
