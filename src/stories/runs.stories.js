import RunsList from "../components/runs/runs-list.vue";

export default {
  title: "FollowUp/Runs",
};

export const runsList = () => ({
  render() {
    return <RunsList></RunsList>;
  },
});
