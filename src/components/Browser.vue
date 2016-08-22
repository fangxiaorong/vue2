<template>
  <div>
    <div class="head">...</div>
    <explorer v-if="isexplorer" :pages="pages" :path="path"></explorer>
    <editer v-else></editer>
  </div>
</template>

<script>
  import Explorer from './Explorer.vue';
  import Editer from './Editer.vue';
  import { avInstance } from '../libs/Request';

  export default {
    created() {
      if (!this.$route.params.category) {
        this.type = 1;
        this.path = [{ name: '分类' }];
        this.getCategories();
      } else if (!this.$route.params.book) {
        this.type = 2;
        this.path = [
            { uid: this.$route.path, name: '分类' },
            { name: this.$route.params.category },
        ];
        this.getBooks(this.$route.params.category);
      } else if (!this.$route.params.page) {
        this.type = 3;
        this.path = [
            { uid: this.$route.path, name: '分类' },
            { uid: this.$route.params.category, name: this.$route.params.category },
            { name: this.$route.params.book },
        ];
        this.getPages(this.$route.params.book);
      } else {
        this.type = 4;
        this.path = [
            { uid: this.$route.path, name: '分类' },
            { uid: this.$route.params.category, name: this.$route.params.category },
            { uid: this.$route.params.book, name: this.$route.params.book },
            { name: this.$route.params.page },
        ];
        this.queryPage(this.$route.params.page);
      }
    },
    data() {
      return {
        type: 1,
        isexplorer: true,
        path: [],
        pages: [],
      };
    },
    components: {
      Explorer,
      Editer,
    },
    methods: {
      getCategories() {
        avInstance.getCategories((error, data) => {
          if (!error) {
            this.pages = data.results;
            this.pages.forEach(page => {
              page.type = 'book';
              page.name = page.vname;
            });
          }
        });
      },
      getBooks(category) {
        avInstance.getBooks(this.$route.params.category, (error, data) => {
          if (!error) {
            this.pages = data.results;
            this.pages.forEach(page => {
              page.type = 'book';
              page.name = page.title;
            });
          }
        });
      },
      getPages(book) {
      },
      queryPage(page) {
      },
    }
  };
</script>
