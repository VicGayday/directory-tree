<template>
  <div>
    <div v-if="folder"><AppIcon name="folderIcon" /></div>
    <div v-else><AppIcon name="fileIcon" /></div>
  </div>
</template>

<script>
import AppIcon from "./AppIcon.vue"

export default {
  props: {
    folder: Boolean,
  },
  components: { AppIcon },
}
</script>