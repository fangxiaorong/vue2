<template>
  <div>
    <ul class="nav">
      <li v-for="node in path">
        <router-link v-if="node.uid" :to="{path: node.uid, exact: true}">{{ node.name }}</router-link>
        <div v-else>{{ node.name }}</div>
      </li>
    </ul>
    <ul class="explorer">
      <li v-for="page in pages" class="book" v-if="page.type === 'book'">
        <div>
            <router-link :to="$route.path + '/' + page.name"><h3>{{ page.name }}</h3></a>
        </div>
      </li>
      <li class="page" v-on:click="open" v-else>
        <div>
          <router-link :to="'article/' + page.uid">{{ page.name }}</router-link>
          <div>{{ page.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['path', 'pages'],
    data() {
      return {
      };
    },
    methods: {
    }
  };
</script>

<style scoped="true">
  .nav { margin: 0; padding: 0; border-bottom: 1px solid #EEEEEE; padding: 5px; }
  .nav > li { list-style-type: none; float: left; }
  .nav > li:not(:last-child):after { content: '/'; display: inline-block; font-size: 0.9em; padding-right: 5px; }
  .nav:after { content: ''; display: block; clear: both; }

  .explorer { margin: 0; padding: 0; list-style-type: none; }
  .explorer .book { float: left; width: 10%; }
  .explorer .book > div { border: 1px solid #EEEEEE; border-top-right-radius: 10px; border-bottom-right-radius: 10px; margin: 10px; padding: 10px; height: 6em; }
  .explorer h3 { padding: 0; margin: 0; }
  .explorer .page > div { padding: 10px; }
  @media (max-width: 1024px) {
    .explorer .book { width: 16.66666%; }
  }
  @media (max-width: 480px) {
    .explorer .book { width: 33.3%; }
  }
</style>