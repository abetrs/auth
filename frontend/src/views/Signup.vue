<template>
  <div class="signup">
    <h2>Sign Up page</h2>
    <form class="signup" @submit.prevent="sendUser">
      <div class="form-group">
        <label class="col-form-label" for="inputDefault">Username</label>
        <input type="text" v-model="username" class="form-control" placeholder="Username" id="inputDefault">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="email" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
          else... Just spam a lot.</small>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" v-model="password" id="exampleInputPassword1"
            placeholder="Password">
          <div style="color: red;">{{invalid}}</div>
        </div>
        <button type="submit" class="btn btn-primary signup-submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'signup',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      invalid: '',
    };
  },
  methods: {
    sendUser: function () {
      const API_URL = "http://localhost:3000/auth/signup";
      const sendData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(sendData)
        }).then(resp => resp.json())
        .then((body) => {
          this.username = '';
          this.email = '';
          this.password = '';
          if (body.error.name === 'MongoError') {
            this.invalid = 'Username or email you entered is taken :(';
          }
          if (body.error.name === 'ValidationError') {
            this.invalid = 'Either you forgot something or you entered an invalid entry for some field';
          }
        });
    },
  },
};

</script>
