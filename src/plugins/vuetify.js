import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.indigo.lighten1,
        third: colors.green.base,
        fourth: colors.green.base,
        accent: colors.pink.lighten1,
        error: colors.red.lighten1,
        warning: colors.orange.lighten1,
        info: colors.lightBlue.lighten1,
        success: colors.lightGreen.lighten1
      },
      dark: {
        primary: colors.red.darken1,
        secondary: colors.blue.darken2,
        third: colors.blue.darken1,
        fourth: colors.grey.darken3,
        accent: colors.orange.darken3,
        error: colors.red.accent3,
        warning: colors.orange.darken3,
        info: colors.blue.accent1,
        success: colors.lightGreen.darken1
      }
    }
  }
})