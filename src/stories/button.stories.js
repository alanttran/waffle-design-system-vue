import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withDesign } from 'storybook-addon-designs'

import Button from '../components/design-system/button/button.vue'

export default {
  title: 'DesignSystem/Button',
  decorators: [withDesign]
}

const Template = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  methods: { action: action('clicked') },
  template: '<Button v-bind="$props" @click="action"></Button>'
});

export const Primary = Template.bind({});
Primary.args = {
  className: 'w-button-primary',
  text: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  className: 'w-button-secondary',
  text: 'Secondary'
};

export const Progressive = Template.bind({});
Progressive.args = {
  className: 'w-button-progressive',
  text: 'Progressive'
};

export const Destructive = Template.bind({});
Destructive.args = {
  className: 'w-button-destructive',
  text: 'Destructive'
};

export const Submit = Template.bind({});
Submit.args = {
  className: 'w-button-primary',
  text: 'Submit',
  isSubmit: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  className: 'w-button-primary',
  text: 'Disabled',
  isDisabled: true
};

// export const primary = () => ({
//   components: { Button },
//   template: '<Button @click="action">Hello Button</Button>',
//   methods: { action: action('clicked') },
// })

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=0%3A1104'
  }
}


// export const withJSX = () => ({
//   render() {
//     return <Button onClick={linkTo('Button', 'With Some Emoji')}>With JSX</Button>;
//   }
// })

// export const withSomeEmoji = () => ({
//   components: { Button },
//   template: '<Button>😀 😎 👍 💯</Button>'
// })
