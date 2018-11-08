<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">User Login System</a>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link">
              <router-link to="/">Home</router-link><span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link">
              <router-link to="/signup">Signup</router-link><span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
</style>
