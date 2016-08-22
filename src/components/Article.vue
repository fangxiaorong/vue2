<template>
  <div>
    <template v-if="article">
      <div class="head">
        {{ article.title }}
        <ul class="tags">
          <li v-for="tag in article.tags">{{ tag }}</li>
        </ul>
      </div>
      <div class="content">
        <markdown :markdown="article.content"></markdown>
        <hr />
        <!-- <comments :comments="comments"></comments> -->
      </div>
    </template>
    <template v-else>
      <div class="head">Loading...</div>
    </template>
  </div>
</template>

<script>
  import { avInstance } from '../libs/Request';
  import Markdown from './Markdown.vue';

  export default {
    data() {
      return {
        article: undefined,
        comments: undefined,
      };
    },
    created() {
      this.fetchData();
    },
    components: {
      Markdown,
      // Comments,
    },
    methods: {
      fetchData() {
        avInstance.getPost(this.$route.params.uid, (error, data) => {
          if (!error) {
            this.article = data;
          }
        });
      },
    },
  };
</script>

<style scoped=true>
.tags > li { font-size: 0.6em; line-height: 1.6em; display: inline-block; padding: 0 5px; margin: 0 5px; border: solid 1px #EEE; }
</style>