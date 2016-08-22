<template>
  <div>
    <div class='head'>One day I have a dream <br />One day I try to finish this. <br />This is my life.</div>
    <div class="content" v-for='article in articles'>
      <div class="article-head">
        <h2><router-link :to="'article/' + article.objectId">{{ article.title }}</router-link></h2>
        <hr />
      </div>
      <markdown :markdown="article.content" class="article-content"></markdown>
    </div>
  </div>
</template>

<script>
  import { avInstance } from '../libs/Request';
  import Markdown from './Markdown.vue';

  export default {
    created() {
      if (this.articlesinfo.page === 0) {
        this.fetchData();
      }
    },
    data() {
      return {
        articlesinfo: {
          page: 0,
        },
        articles: [],
      };
    },
    components: {
      Markdown,
    },
    methods: {
      decodeData(data) {
        this.articles = data.results;
        this.articlesinfo.count = data.count;
      },
      fetchData() {
        avInstance.getPosts(this.articlesinfo.page, (error, data) => {
          if (!error) {
            this.decodeData(data);
          }
        });
      },
    },
  };
</script>

<style>
  .content { max-width: 1024px; margin: auto; padding: 10px; width: 100%; box-sizing: border-box; word-wrap: break-word; }
  .article-head > hr { margin: 0 0 5px 0; }
</style>