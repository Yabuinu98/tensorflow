<template>
  <nav>
    <router-link to="/">Father height</router-link>
    <router-link to="/pose">Posenet</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: beige;
  margin-bottom: -70px;
}
nav a:first-child {
  margin-right: 100px;
}
nav a {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
