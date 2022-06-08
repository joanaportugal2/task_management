<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

body {
  background: #fff;
  font-family: "Source Sans Pro", sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  padding: 0;
  margin: 0;
}

html,
body,
#app,
.page {
  height: 100%;
}

#app * {
  padding: 0;
  margin: 0;
  outline: 0;
  box-sizing: border-box;
}

#app h1 {
  font-family: "Bebas Neue", cursive;
  letter-spacing: 0.05rem;
}

input,
button {
  font-family: "Source Sans Pro", sans-serif;
}

button {
  cursor: pointer;
}
</style>
