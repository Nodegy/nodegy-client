<template>
  <i
    type="button"
    class="material-icons md-hover text-info"
    @click.prevent="$emit('toggleEdit')"
    >edit</i
  >
</template>

<script>
export default {
  name: "ProfileEditButton",
};
</script>
