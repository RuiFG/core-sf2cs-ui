<template lang="pug">
  #index
    section#hero
      v-row(no-gutters='')
        v-img(:min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'", height="80vh" src='../../assets/bg1.png')
          v-theme-provider(dark)
            v-container(fill-height)
              v-row.white--text.mx-auto(align='center', justify='center')
                v-col.white--text.text-center(cols='12', tag='h1')
                  span.font-italic(:class="[$vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4']")
                    | 机器“看”世界
                v-btn.align-self-end(fab='', outlined='', @click="$vuetify.goTo('#features')")
                  v-icon mdi-chevron-double-down
    .py-4
    section#features
      .py-12
      v-container.text-center
        h2.display-2.font-weight-bold.mb-3 My “人脸识别”
        v-responsive.mx-auto.mb-12(width='56')
          v-btn.align-self-end(fab, outlined, @click="$vuetify.goTo('#hero')")
            v-icon mdi-chevron-double-up
        v-row
          v-col(v-for='({ icon, title, text }, i) in features', :key='i', cols='12', md='4')
            v-card.py-12.px-4(color='grey lighten-5', flat hover)
              v-theme-provider(dark='')
                div
                  v-avatar(color='primary', size='88')
                    v-icon(large='', v-text='icon')
              v-card-title.justify-center.font-weight-black.text-uppercase(v-text='title')
              v-card-text.subtitle-1(v-text='text')
      v-footer( padless color="cyan")
        v-card.indigo.lighten-1.white--text.text-center(flat, tile)
          v-card-text
            v-btn.mx-4.white--text(v-for='icon in icons', :key='icon', icon)
              v-icon(size='24px') {{ icon }}
          v-card-text.white--text.pt-0
            | Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          v-divider
          v-card-text.white--text
            | 2020 —
            strong BugR

</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        features: [
          {
            icon: 'mdi-account-group-outline',
            title: '用户',
            text: '受众广泛，学生、教师、公司员工等等；上班打卡，上学签到，一扫得知，方便，实用，免去一切人工操作。',
          },
          {
            icon: 'mdi-bike-fast',
            title: '速度',
            text: '超高速识别人脸，C++实现底层算法封装动态链接库，识别速度非比寻常；更快，更精准，更智能。',
          },
          {
            icon: 'mdi-shield-key-outline',
            title: '安全',
            text: '基于 OAuth2 授权码方式进行角色授权认证；实行更安全，更便捷，更可靠，更高效的用户管理策略。',
          },
        ],
        icons: [
          'mdi-qqchat',
          'mdi-wechat',
          'mdi-github',
        ],
      }
    }
  }
</script>
