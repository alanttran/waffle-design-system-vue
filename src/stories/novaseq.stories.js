import illuminaData from "../assets/illumina-runs-api.json";
import NovaSeqDashboard from "../components/product/novaseq/dashboard";


export default {
  title: "Products/NovaSeq",
};

const experimentList = illuminaData.Response.Items;

export const TestJson = () => ({
  render() {
    return (
      <ol>
        {experimentList.map((item, index) => (
          <li key={index} style="margin-bottom: 1rem;">
            <dl>
              <dt>ID:</dt>
              <dd>{item.Id}</dd>
              <dt>Experiment Name:</dt>
              <dd>{item.ExperimentName}</dd>
              <dt>Status:</dt>
              <dd>{item.Status}</dd>
              <dt>Platform:</dt>
              <dd>{item.PlatformName}</dd>
            </dl>
          </li>
        ))}
      </ol>
    );
  },
});

export const dashboard = () => ({
  render() {
    return <NovaSeqDashboard></NovaSeqDashboard>;
  },
});

