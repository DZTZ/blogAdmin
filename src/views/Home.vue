<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a-button type="primary">
      Primary
    </a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-checkbox>
      Checkbox
    </a-checkbox>
    <a-icon type="star"></a-icon>
    <a-icon type="home" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      a: 123
    };
  }
};
</script>
