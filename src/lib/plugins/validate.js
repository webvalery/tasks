import validationRules from '@/lib/utils/validationRules.js'

export default {
  install(app) {
    app.config.globalProperties.$validate = validationRules

    app.provide('$validate', validationRules)
  },
}
