<template>
  <div class="middle">
    <input placeholder="Nick Name" v-model="name" autofocus />
    <button v-on:click.prevent="login">Enter</button>
  </div>
</template>

<style lang="scss">
body {
  background: rgb(3, 9, 44);
}
input {
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0;
  padding-left: 10px;
  margin: 0;
  margin-right: 5px;
  font-weight: bold;
  outline: 0;
  color: rgb(82, 82, 82);
}
button {
  cursor: pointer;
  background: #2d41f8;
  outline: none;
  border-radius: 5px;
  border: 0;
  height: 35px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  border-bottom: 3px solid darken(#2d41f8, 15%);
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  data: () => ({
    name: ''
  }),
  methods: {
    login(e) {
      console.log('Login!', this.$data.name);
    },
  },
})
export default class Login extends Vue {}
</script>
