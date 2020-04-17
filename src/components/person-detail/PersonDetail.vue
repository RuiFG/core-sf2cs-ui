<template lang="pug">
  v-card(width=300 height=300).ma-8
    v-img.white--text.align-end(:src='img'
      gradient='to bottom, rgba(0,0,0,.0), rgba(0,0,0,.1)' height='250')
      v-card-title {{name}}
    v-chip-group.ml-2
      v-chip(label color="success")
        v-icon(left) mdi-label
        span {{classes}}
      v-chip.white--text( label color="red") {{time}}


</template>
<script>
  export default {
    name: "person-detail",
    props: {
      name: String,
      img: String,
      classes: String,
      time: String
    }
  }
</script>