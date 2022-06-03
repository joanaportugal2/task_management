<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;700&display=swap");

#app,
#app > div {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #f6f7eb;
}

#app * {
  margin: 0;
  padding: 0;
  font-family: "Mukta", sans-serif;
}

#app h1 {
  font-family: "Bebas Neue", cursive;
  letter-spacing: 0.05rem;
}
</style>
