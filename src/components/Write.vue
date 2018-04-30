<template>
  <div>
   
    
    <vue-editor v-model="content"></vue-editor>
    <button @click="saveContent">保存</button>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h3>Initial Content</h3>"
    };
  },

  methods: {
    saveContent: function() {
      // You have the content to save
      console.log(this.content);
    }
  }
};
</script>
