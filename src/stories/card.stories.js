import Card from '../components/design-system/card/card.vue'
import { withDesign } from "storybook-addon-designs";

export default {
    title: 'DesignSystem/Card',
    decorators: [withDesign]
}

// const Template = (args, { argTypes }) => ({
//     components: { Button },
//     props: Object.keys(argTypes),
//     methods: { action: action('clicked') },
//     template: '<Card v-bind="$props" @click="action"></Card>'
// });

export const Default = () => ({
    render() {
        return <Card>This is a blank card</Card>;
    }
})

Default.parameters = {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=0%3A441'
    }
  }



