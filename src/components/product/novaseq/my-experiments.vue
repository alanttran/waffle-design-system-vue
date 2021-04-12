<template>
  <div class="runs-card">
    <div class="runs-card-header">
      <h1>Runs</h1>
      <div
        v-if="experimentsList.length > 0"
        :class="{ isActive: activeSort }"
        class="runs-sort-control"
      >
        <div class="runs-sort-control-container">
          <div class="runs-sort-control-menu">
            <div class="runs-sort-control-menu-text">Sort by</div>
            <div
              @click="toggleSortControl()"
              class="runs-sort-control-menu-selected-value"
            >
              {{ currentSortChoice.name }}
            </div>
            <div
              @click="toggleSortOrder()"
              class="runs-sort-control-icon-container"
            >
              <i
                v-if="!activeSort && currentSortOrder === 'desc'"
                title="Descending"
                class="ri-arrow-down-s-line"
              ></i>
              <i
                v-if="!activeSort && currentSortOrder === 'asc'"
                title="Ascending"
                class="ri-arrow-up-s-line"
              ></i>
            </div>
          </div>
          <div class="runs-sort-control-menu-list">
            <div
              @click="
                updateSortChoice(item);
                toggleSortControl();
              "
              v-for="item in sortList"
              :key="item.category"
              class="runs-sort-control-menu-item"
            >
              <span class="runs-sort-control-menu-item-text">{{
                item.name
              }}</span>
              <span class="runs-sort-control-menu-item-icon"
                ><i
                  v-if="item.name === currentSortChoice.name"
                  class="ri-check-fill"
                ></i
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="runs-table-container">
      <table v-if="experimentsList.length > 0">
        <thead>
          <tr>
            <th></th>
            <th v-for="(value, key) in experimentsList[5]" :key="key.id">
              {{ objectKeyToTableHeader(key) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(experiment, name) in experimentsList" :key="name.id">
            <td style="border-bottom: none">&#x25a2;</td>
            <td
              v-html="tableCellFormatter(value, name)"
              v-for="(value, name) in experiment"
              :key="value.Id"
            ></td>
          </tr>
        </tbody>
      </table>
      <table class="placeholder-table" v-else>
        <thead>
          <tr>
            <th v-for="item in 5" :key="item">
              <div class="placeholder-table-content"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 10" :key="item">
            <td v-for="item in 5" :key="item">
              <div class="placeholder-table-content"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Experiment, UserOwnedBy, Instrument } from "./experiment";
import axios from "axios";

// Default values to each experiment to be merged later
// This is created to make sure that each property has a default value
// Even if the .json object has it missing
// Known missing keys: ReagentBarcode, FlowcellBarcode
//
const defaultExperiment: Experiment = {
  Id: "",
  Href: "",
  Number: 0,
  ExperimentName: "",
  Status: "",
  ReagentBarcode: "",
  FlowcellBarcode: "",
  DateCreated: "",
  DateModified: "",
  UserOwnedBy: {
    Id: "",
    Name: "",
  },
  TotalSize: 0,
  PlatformName: "",
  Workflow: "",
  Instrument: {
    InstrumentId: 0,
    Name: "",
  },
  InstrumentName: "",
  InstrumentType: "",
  NumCyclesRead1: 0,
  HrefBaseSpaceUI: "",
  LaneAndQcStatus: "",
  DateInstrumentStarted: "",
  DateInstrumentCompleted: "",
};

type sortItem = { name: string; category: string };

@Component
export default class MyExperiments extends Vue {
  private experimentsList: Array<Experiment> = [];
  private activeSort = false;
  private sortList: Array<sortItem> = [
    { name: "Created", category: "DateCreated" },
    { name: "Experiment", category: "ExperimentName" },
    { name: "ID", category: "Id" },
    { name: "Instrument", category: "InstrumentName" },
    { name: "Size", category: "TotalSize" },
  ];
  private currentSortChoice = this.sortList[0];
  private currentSortOrder = "desc";

  mounted() {
    axios
      .get("https://run.mocky.io/v3/8c3c1b98-5111-4c6f-8622-3e604a2e91f8")
      .then((response) => {
        // JSON responses are automatically parsed.
        //this.experiments = response.data.Response.Items;
        for (let experiment of response.data.Response.Items) {
          let formattedExperiment: Experiment = {
            ...defaultExperiment,
            ...experiment,
          };
          //console.log(formattedExperiment);
          this.experimentsList.push(formattedExperiment);
        }
        //console.log(this.experimentsList);
      })
      .catch((e) => {
        // console logs error
        console.log(e);
      });
  }

  public updateSortChoice(sortChoice: sortItem): void {
    this.currentSortChoice = sortChoice;
    let type = typeof defaultExperiment[this.currentSortChoice.category];
    console.log(type);
    if(type === 'string' || type === 'number'){
      this.sortExperiments(type);
    }
  }

  public toggleSortOrder() {
    this.currentSortOrder = this.currentSortOrder === "asc" ? "desc" : "asc";
    let type = typeof defaultExperiment[this.currentSortChoice.category];
    if(type === 'string' || type === 'number'){
      this.sortExperiments(type);
    }
  }

  public sortExperiments(type: 'string' | 'number' = 'string'): void {
    console.log('sortExperiments' + type);
    if (this.currentSortOrder === "asc" && type === 'number'){
      console.log('number worked! sort!')
      console.log(this.experimentsList[0][this.currentSortChoice.category]);
      this.experimentsList = this.experimentsList.sort((a, b) =>
        a[this.currentSortChoice.category] > b[this.currentSortChoice.category]
        ? 1 : -1
      );
    }
    else if (this.currentSortOrder === "desc" && type === 'number'){
      console.log('number worked! sort!')
      this.experimentsList = this.experimentsList.sort((a, b) =>
        a[this.currentSortChoice.category] > b[this.currentSortChoice.category]
        ? -1 : 1
      );
    } else if (this.currentSortOrder === "asc") {
      this.experimentsList = this.experimentsList.sort((a, b) =>
        a[this.currentSortChoice.category].toString().toUpperCase() >
        b[this.currentSortChoice.category].toString().toUpperCase()
          ? 1
          : -1
      );
    } else if (this.currentSortOrder === "desc") {
      this.experimentsList = this.experimentsList.sort((a, b) =>
        a[this.currentSortChoice.category].toString().toUpperCase() >
        b[this.currentSortChoice.category].toString().toUpperCase()
          ? -1
          : 1
      );
    }
  }

  public toggleSortControl(): void {
    this.activeSort = !this.activeSort;
  }

  //
  // Function that takes object keys and makes them appropriate for table headers
  // Expectation 'ExperimentName' -> 'Experiment Name'
  //
  // @param {String} word - json object key
  // @return {String} word - table header string
  //
  // reference resource
  // https://stackoverflow.com/a/34323600
  //
  public objectKeyToTableHeader(word: string) {
    word = word.replace(/([a-z])([A-Z])/g, "$1 $2");
    let tableHeaderString = word.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
    return tableHeaderString;
  }

  //
  // Function that takes converts bytes to a more readable format
  // Expectation 47324715018 (Bytes) -> 44.07 GB
  //
  // @param {number} bytes - number of bytes
  // @param {number} decimal(2) - number of decimal places for resulting string
  // @return {String}  - reformated string of KB, MB, GB etc.
  //
  // reference resource
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  public formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  //
  // Function that formats table cell value based on the object key
  //
  // @param {String} value - value of json object key
  // @param {String} key - json object key
  // @return {any} - e.g. if object key has "Date" then it will return a local date string
  //
  public tableCellFormatter(
    value: number | string | UserOwnedBy | Instrument,
    key: string
  ) {
    if (key.includes("Date")) {
      // Conditional that formats the date and returns a string

      let date = new Date(value.toString());
      return date.toLocaleDateString();
    } else if (key === "ExperimentName") {
      // Conditional that formats the ExpirementName by applying the gradient CSS class
      return '<div class="experiment-name-gradient">' + value + "</div>";
    } else if (key === "TotalSize") {
      // Conditional that formats the ExpirementName by applying the gradient CSS class
      return (
        '<div style="text-align: right">' + this.formatBytes(+value) + "</div>"
      );
    } else if (typeof value === "object" && key === "UserOwnedBy") {
      // Conditional that formats the object for UserOwnedBy
      // There is probably a better way to directly match type instead of what I made
      if ("Id" in value) {
        let userId: string = value.Id;
        let userName: string = value.Name;
        return "<div>" + userId + "</div><div>" + userName + "</div>";
      }
    } else if (typeof value === "object" && key === "Instrument") {
      // Conditional that formats the object for Instrument
      // There is probably a better way to directly match type instead of what I made
      if ("InstrumentId" in value) {
        let instrumentId: number = value.InstrumentId;
        let instrumentName: string = value.Name;
        return (
          "<div>" + instrumentId + "</div><div>" + instrumentName + "</div>"
        );
      }
    } else {
      return value;
    }
  }
}
</script>