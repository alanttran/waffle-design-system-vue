import Badge from "../components/design-system/badge/badge.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "DesignSystem/Badge",
  decorators: [withDesign],
};

const Template = (args, { argTypes }) => ({
  components: { Badge },
  props: Object.keys(argTypes),
  template: '<Badge v-bind="$props" ></Badge>',
});

export const Info = Template.bind({});
Info.args = {
  type: "info",
  text: "Info",
};
export const Success = Template.bind({});
Success.args = {
  type: "success",
  text: "Success",
};
export const Danger = Template.bind({});
Danger.args = {
  type: "danger",
  text: "Danger",
};

Info.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=236%3A0",
  },
};
Success.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=236%3A0",
  },
};
Danger.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/25bkkW4ZKiJNAd6aUkfEpU/Core-Design-System?node-id=236%3A0",
  },
};
