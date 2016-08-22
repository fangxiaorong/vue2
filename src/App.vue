<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view class="view" transition="test" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue';

export default {
  components: {
    NavBar,
  },
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    }
  },
}
</script>

<style>
  html, body { margin: 0; padding: 0; min-height: 100%; background:#fefefe; }
  ul { list-style: none; }
  .clear:after { display: block; content: ''; clear: both; }

  .fix-top { position: fixed; top: 0; left: 0; }

  .head { background: url('/static/images/background.jpg'); padding-top: 50px; padding-bottom: 10px; color: white; text-align: center; line-height: 1.5em; }

  body { font: 1.3em "Vollkorn", Palatino, Times; color: #333; line-height: 1.4; text-align: justify; }
  header, nav, article, footer { width: 700px; margin:0 auto; }
  article { margin-top: 4em; margin-bottom: 4em; min-height: 400px; }
  footer { margin-bottom:50px; }
  video { margin: 2em 0; border:1px solid #ddd; }
  nav { font-size: .9em; font-style: italic; border-bottom: 1px solid #ddd; padding: 1em 0; }
  nav p { margin: 0; }
  /* Typography
  -------------------------------------------------------- */
  h1 { margin-top: 0; font-weight: normal; }
  h2 { font-weight: normal; }
  h3 { font-weight: normal; font-style: italic; margin-top:3em; }
  p { margin-top:0; -webkit-hypens:auto; -moz-hypens:auto; hyphens:auto; }
  ul { list-style: square; padding-left:1.2em; }
  ol { padding-left:1.2em; }
  blockquote { margin-left: 1em; padding-left: 1em; border-left: 1px solid #ddd; }
  pre { font-family: "Consolas", "Menlo", "Monaco", monospace, serif; font-size: .9em;  background: black; width: 100%; padding: 10px; border-radius: 4px; box-sizing: border-box; }
  a { color: #2484c1; text-decoration: none; }
  a:hover { text-decoration: underline; }
  a img { border:none; }
  h1 a, h1 a:hover { color: #333; text-decoration: none; }
  hr { color : #ddd; height : 1px; margin: 2em 0; border-top : solid 1px #ddd; border-bottom : none; border-left: 0; border-right: 0; }
  p#heart{ font-size: 2em; line-height: 1; text-align: center; color: #ccc; }
  .red { color:#B50000; }
  .todo { list-style: none; margin: 0; padding: 0; }
  .todo li { padding-left: 1.6em; background-repeat: no-repeat; background-size: 1.3em 1.3em; background-position: 0 center; }
  .todo li.unchecked { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#e0e0e0" stroke-width="3"/></svg>'); }
  .todo li.checked { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>'); color: #d9d9d9; text-decoration: line-through; }
  /* Home Page
  --------------------------- */
  body#index li {  margin-bottom: 1em;  }
  /* iPad
  -------------------------------------------------------- */
  @media only screen and (max-device-width: 1024px) {
    body { font-size: 120%; line-height: 1.4; }
  } /* @iPad */
  /* iPhone
  -------------------------------------------------------- */
  @media only screen and (max-device-width: 480px) {
    body { text-align: left; }
    article, footer { width: auto; }
    article { padding: 0 10px; }
  } /* @iPhone */
</style>
