<template>
  <div v-html="markhtml"></div>
</template>

<script>
import { utility } from '../libs/Common';
import LoadPluginScript from '../libs/LoadPluginScript';
import XRemarkable from '../libs/XRemarkable';

import Prism from 'prismjs';

export default {
  props: ['markdown'],
  computed: {
    markhtml() {
      let result = '';
      if (this.markdown) {
        result = this.rendMarkdown();
        window.setTimeout(this.highlightCode, 100);
      }
      return result;
    },
  },
  methods: {
    highlightCode() {
      if (!this.$el) {
        return;
      }

      const codeBlocks = this.$el.querySelectorAll('code[class*="language-"]');
      const that = this;
      for (let idx = 0; idx < codeBlocks.length; idx ++) {
        const codeBlock = codeBlocks[idx];
        const lang = codeBlock.className.split('-').pop();
        const nodes = codeBlock.childNodes;
        const isOrig = (nodes.length > 0) && (nodes[0].nodeType === 3);
        if (isOrig) {
          if (Prism.languages[lang]) {
            const code = Prism.highlight(utility.getInnerText(codeBlock), Prism.languages[lang]);
            codeBlock.innerHTML = code;
          } else {
            LoadPluginScript(`prism/components/prism-${lang}.js`, (() => {
              that.highlightCode();
            }));
          }
        }
      }
    },
    rendMarkdown() {
      return XRemarkable.render(this.markdown);
    },
  },
};

</script>

