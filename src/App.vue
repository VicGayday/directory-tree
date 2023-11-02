<template>
  <div class="container">
    <div v-if="tree.length === 0">Нет записей</div>
    <div v-else>
      <TreeNode v-for="node in tree" :key="node.id" :node="node" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue"
import { useTreeStore } from "@/stores/treeStore"
import TreeNode from "./components/TreeNode"

export default defineComponent({
  name: "App",
  components: { TreeNode },
  setup() {
    const store = useTreeStore()
    const tree = computed(() => store.tree)

    return {
      tree,
      store,
    }
  },
})
</script>

<style>
body {
  background-color: #efefef;
}
.container {
  max-width: 760px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
}
</style>
