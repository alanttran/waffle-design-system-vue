import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withDesign } from 'storybook-addon-designs'

import MyButton from '../components/button/button.vue'

export default {
  title: 'Components/Button',
  decorators: [withDesign]
}

export const primary = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') },
})

primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=0%3A1104'
  }
}

export const withJSX = () => ({
  render() {
    return <MyButton onClick={linkTo('Button', 'With Some Emoji')}>With JSX</MyButton>;
  }
})

export const withSomeEmoji = () => ({
  components: { MyButton },
  template: '<my-button>😀 😎 👍 💯</my-button>'
})
