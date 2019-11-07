import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  // form
  Input,
  Textarea,
  Validator,
  Form,
  // popup
  Toast,
  // scroll
  Scroll,
  ScrollNav,
  ScrollNavBar
} from 'cube-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Validator)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Scroll)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
