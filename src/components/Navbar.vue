<template>
  <div class='navbar clear fix-top'>
    <div class='logo'>Logo</div>
    <ul class='menu'>
      <li v-for="item in items">
        <router-link :to="{path: item.path, exact: true}">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            title: 'Home',
            path: '/home',
          },
          {
            title: 'Browser',
            path: '/browser',
          },
          {
            title: 'About',
            path: '/about',
          },
        ],
      };
    },
  };
</script>

<style>
  .navbar { height: 50px; padding: 0 20px; width: 100%; box-sizing: border-box; color: white; }
  .navbar .logo { float: left; line-height: 50px; font-size: 1.2em; }
  .navbar .menu { float: right; line-height: 50px; margin: 0; padding: 0; }
  .navbar .menu > li { display: inline-block; }
  .navbar .menu a { display: block; height: 100%; padding: 0 10px; color: #888888; text-decoration: none; }
  .navbar .menu a.router-link-active { /*background: #555555;*/ font-weight: bold; color: #EEEEEE; }
</style>