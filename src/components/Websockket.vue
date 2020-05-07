<template>
  
</template>

<script>
export default {
  data: function () {
    return {
      messages: []
    }
  },
  created: function () {
    this.$io.on('message', (message) => {
      this.messages.push(message)
    })
  }
}
</script>
