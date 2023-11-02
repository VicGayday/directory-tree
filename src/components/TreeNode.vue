<template>
  <div>
    <div class="inner">
      <TheIcon :folder="node.children.length > 0" />
      <span v-if="!isEditing">{{ node.name }}</span>
      <input v-else v-model="newName" @blur="confirmEditing" @keydown.enter="confirmEditing" />
      <button class="btn margin" @click="startEditing">
        <AppIcon name="editIcon" />
      </button>
      <button class="btn" @click="store.removeNode(node.id)">
        <AppIcon name="trashIcon" />
      </button>
    </div>
    <ul v-if="node.children && node.children.length > 0">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" />
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import { useTreeStore } from "@/stores/treeStore"
import TheIcon from "./TheIcon.vue"
import AppIcon from "./AppIcon.vue"

export default defineComponent({
  name: "TreeNode",
  props: {
    node: Object,
  },
  components: { TheIcon, AppIcon },
  setup(props) {
    const store = useTreeStore()
    const isEditing = ref(false)
    const newName = ref("")

    function startEditing() {
      isEditing.value = true
      newName.value = props.node.name
    }

    function confirmEditing() {
      store.editNode(props.node.id, newName.value)
      isEditing.value = false
    }

    return {
      store,
      isEditing,
      newName,
      startEditing,
      confirmEditing,
    }
  },
})
</script>

<style scoped>
.inner {
  display: flex;
  align-items: center;
  gap: 5px;
}
.btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.margin {
  margin-left: auto;
}
</style>
