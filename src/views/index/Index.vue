<template lang="pug">
  #index
    section#hero
      v-row(no-gutters='')
        v-img(:min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'", src='https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80')
          v-theme-provider(dark='')
            v-container(fill-height='')
              v-row.white--text.mx-auto(align='center', justify='center')
                v-col.white--text.text-center(cols='12', tag='h1')
                  span.font-weight-light(:class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']")
                    | WELCOME TO
                  br
                  span.font-weight-black(:class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']")
                    | VUETIFY
                v-btn.align-self-end(fab='', outlined='', @click="$vuetify.goTo('#about-me')")
                  v-icon mdi-chevron-double-down
    section#about-me
      .py-12
      v-container.text-center
        h2.display-2.font-weight-bold.mb-3 ABOUT ME
        v-responsive.mx-auto.mb-8(width='56')
          v-divider.mb-1
          v-divider
        v-responsive.mx-auto.title.font-weight-light.mb-8(max-width='720')
          | Vuetify is the #1 component library for Vue.js and has been in active development since 2016. The goal of the project is to provide users with everything that is needed to build rich and engaging web applications using the Material Design specification. It accomplishes that with a consistent update cycle, Long-term Support (LTS) for previous versions, responsive community engagement, a vast ecosystem of resources and a dedication to quality components.
        v-avatar.elevation-12.mb-12(size='128')
          v-img(src='https://cdn.vuetifyjs.com/images/john.png')
        div
        v-btn(color='grey', href='https://vuetifyjs.com', outlined='', large='')
          span.grey--text.text--darken-1.font-weight-bold
            | Vuetify Documentation
      .py-12
      .py-12

</template>


<script>
  export default {
    name: 'index',
    data() {
      return {
        articles: [
          {
            src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Mobile first & Responsive',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Think outside the box',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
            title: 'Small changes, big difference',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
        features: [
          {
            icon: 'mdi-account-group-outline',
            title: 'Vibrant Community',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
          {
            icon: 'mdi-update',
            title: 'Frequent Updates',
            text: 'Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.',
          },
          {
            icon: 'mdi-shield-outline',
            title: 'Long-term Support',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
        ],
        stats: [
          ['24k', 'Github Stars'],
          ['330+', 'Releases'],
          ['1m', 'Downloads/mo'],
          ['5m', 'Total Downloads'],
        ],
      }
    }
  }
</script>
