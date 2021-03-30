<template>
  <div>
    <h1>Experiments Dashboard</h1>
    <div class="status-bar">
      <div class="status-counter">
        <Badge type="info" text="In progress"></Badge>0
      </div>
      <div class="status-counter">
        <Badge type="danger" text="Stopped"></Badge>0
      </div>
      <div class="status-counter">
        <Badge type="success" text="Completed"></Badge>10
      </div>
      <div>
        <label for="sort">Sort by</label>
        <select class="w-input" name="Sort" id="sort">
          <option value="dateCreated" @click="sort('dateCreated')">Date created</option>
          <option value="a-z" @click="sort('a-z')">A to Z</option>
          <option value="z-a" @click="sort('z-a')">Z to A</option>
        </select>
      </div>
    </div>
    <div class="dashboard-list">
      <div
        v-for="experiment in experiments"
        :key="experiment.id"
        class="card-container"
      >
        <SeqCard
          style="height: 100%"
          :title="experiment.ExperimentName"
          :id="experiment.Id"
          :status="experiment.Status"
          :user="experiment.UserOwnedBy.Name"
          :workflow="experiment.Workflow"
          :instrumentName="experiment.InstrumentName"
          :instrumentType="experiment.InstrumentType"
          :flowcellBarcode="experiment.FlowcellBarcode"
        >
        </SeqCard>
      </div>
    </div>
  </div>
</template>

<script>
import SeqCard from "../../platform/seq-card";
import Badge from "../../design-system/badge/badge";
import illuminaData from "../../../assets/illumina-runs-api.json";

const experimentList = illuminaData.Response.Items;

export default {
  name: "NovaseqDashboard",
  components: { SeqCard, Badge },
  data() {
    return {
      experiments: experimentList
    };
  },
  methods: {
    sort: function (order) {
    // sort depending on the choice click event above    
      switch (order) {
        case "a-z":
          this.experiments = this.experiments.sort((a, b) =>
            a.ExperimentName.toUpperCase() > b.ExperimentName.toUpperCase()
              ? 1
              : -1
          );
          break;
        case "z-a":
          this.experiments = this.experiments.sort((a, b) =>
            a.ExperimentName.toUpperCase() > b.ExperimentName.toUpperCase()
              ? -1
              : 1
          );
          break;
        case "dateCreated":
            this.experiments = illuminaData.Response.Items;
            console.log(experimentList);
            break;
      }
    },
  },
};
</script>

<style scoped>
.dashboard-list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}
.card-container {
  flex: 0 0 50%;
  padding: 8px;
  box-sizing: border-box;
}
.status-bar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}
.status-counter {
  text-align: center;
}
.w-card {
  transition: opacity 1.5s;
}
.w-input{
    display: inline-block;
    height: 40px;
    padding-left: .5rem;
    margin-left: .5rem;
    border: 2px solid #8f90a6;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 100%;
}
</style>
