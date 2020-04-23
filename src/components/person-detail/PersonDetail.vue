<template lang="pug">
  v-card(width=250 height=250).mx-md-4.my-md-3
    v-img.white--text.align-end(:src='img'
      gradient='to bottom, rgba(0,0,0,.0), rgba(0,0,0,.1)' height='200')
    v-chip-group
      v-chip.mx-md-auto.white--text(label color="light-blue lighten-3")
        v-icon(left) mdi-label
        | {{name}}
      v-chip.white--text.mx-md-auto( label color="orange lighten-3")
        v-icon(left) mdi-timer-outline
        | {{time}}
    slot



</template>
<script>
  export default {
    name: "person-detail",
    props: {
      name: String,
      img: String,
      time: String
    }
  }
</script>