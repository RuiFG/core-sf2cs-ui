<template lang="pug">
  #admin-dashboard
    v-row.my-md-6
      v-col
        v-card.mt-4.mx-auto(max-width='600')
          v-card-title
            .title.grey--text 本周缺勤率
          v-card-text
            v-sheet.v-sheet--offset.mx-auto(color='cyan', elevation='12', max-width='calc(100% - 32px)')
              v-sparkline(:labels='labels', :value='absenceRate', color='white', line-width='2', padding='16')
      v-col
        v-card.mx-md-auto(color='grey lighten-4', max-width='600')
          v-card-title
            .title.grey--text 本周系统负载峰值
          v-card-text
            v-sheet.v-sheet--offset.mx-auto(color='red', elevation='12', max-width='calc(100% - 32px)')
              v-sparkline(:labels='labels', :value='burden', color='white', line-width='2', padding='16')

    v-row
      v-col
        v-card.mx-md-auto(color='grey lighten-4', max-width='1600')
          v-card-title
            .ttitle.grey--text
              | 历史缺勤率
          v-sheet(color='transparent')
            v-sparkline(:key='String(avg)', :smooth='16', :gradient="['#80DEEA', '#4DD0E1', '#26C6DA']",
              :line-width='3', :value='heartbeats', auto-draw='', stroke-linecap='round')


</template>
<script>
  export default {
    name: "admin-dashboard",
    data: () => ({
      heartbeats: [],
      labels: [
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日',
      ],
      absenceRate: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
      ],
      burden: [
        400,
        505,
        310,
        690,
        410,
        560,
        450,
      ],
    }),
    computed: {
      avg() {
        const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
        const length = this.heartbeats.length

        if (!sum && !length) return 0

        return Math.ceil(sum / length)
      },
    },
    created() {
      this.heartbeats = Array.from({length: 20}, this.heartbeat)
    },
    methods: {
      heartbeat() {
        return Math.ceil(Math.random() * (120 - 80) + 80)
      },
    }
  }
</script>