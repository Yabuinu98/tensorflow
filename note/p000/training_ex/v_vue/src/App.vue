<template>
  <nav>
    <router-link to="/">KOGPT(KaKao)</router-link> |
    <router-link to="/chat">CHATGPT(ver.3.5)</router-link> |
    <router-link to="/chat2">CHATGPT2</router-link>
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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
