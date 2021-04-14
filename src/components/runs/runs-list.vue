<template>
  <div class="runs-card">
    <div class="runs-card-header">
      <h1>Runs</h1>
      <!-- This is the sort menu control - only shows when there is content
      Ideally it would be a separate component or subcomponent 
      More time - separate component that throws events instead -->
      <div
        v-if="experimentsList.length > 0"
        :class="{ isActive: activeSortMenu }"
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
                v-if="!activeSortMenu && currentSortDir === 'desc'"
                title="Descending"
                class="ri-arrow-down-s-line"
              ></i>
              <i
                v-if="!activeSortMenu && currentSortDir === 'asc'"
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
    <!-- Sort Menu End -->
    <div class="runs-table-container">
      <!-- Primary experiment list table when there is content -->
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
          <tr :key="name.id" v-for="(experiment, name) in paginatedView">
            <td>&#x25a2;</td>
            <td
              v-html="tableCellFormatter(value, name)"
              v-for="(value, name) in experiment"
              :key="value.Id"
            ></td>
          </tr>
        </tbody>
      </table>
      <!-- Primary table end -->
      <!-- Placeholder table you should be able to see it briefly - it prevents UI movement once API resolves -->
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
    <div>
      <!-- This commented area was just to troubleshoot pagination -->
      <!-- <ul>
        <li>
          <p>Current Page: {{ currentPage }}</p>
        </li>
        <li>
          <p>Total: {{ totalExperiments }}</p>
        </li>
        <li>
          <p>pageEnd: {{ pageEnd }}</p>
        </li>
      </ul> -->
      <p>
        <!-- Buttons for pagination. If I had more time, I would 
        have preferred to create individual buttons for each page -->
        <Button
          @click="prevPage"
          :disabled="currentPage === 1"
          className="w-button-secondary"
          >Previous</Button
        >
        <Button @click="nextPage" :disabled="currentPage === pageEnd"
          >Next</Button
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
// import vue-property-decorator is for typescript to work w/ VueJS
// import ./experiment - used for interfaces and types
// import axios for json call
// import Button for pagination buttons
import { Component, Vue } from "vue-property-decorator";
import { Experiment, UserOwnedBy, Instrument } from "./experiment";
import axios from "axios";
import Button from "../design-system/button/button.vue";

// Default values to each experiment to be merged later
// This is created to make sure that each property has a default value
// Even if the .json object has it missing
// Known missing keys: ReagentBarcode, FlowcellBarcode
//
const blankExperiment: Experiment = {
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

// sort item type sorts functions later
type sortItem = { name: string; category: string };

let modifier: 1 | -1 = 1;

@Component({
  components: { Button },
})
export default class RunsList extends Vue {
  private experimentsList: Array<Experiment> = [];
  private activeSortMenu = false;
  private currentSortDir = "desc";
  private pageSize = 10;
  private currentPage = 1;
  private totalExperiments = 0;
  private pageEnd = 0;
  private sortList: Array<sortItem> = [
    { name: "Created", category: "DateCreated" },
    { name: "Experiment", category: "ExperimentName" },
    { name: "ID", category: "Id" },
    { name: "Instrument", category: "InstrumentName" },
    { name: "Number", category: "Number" },
    { name: "Size", category: "TotalSize" },
    { name: "Status", category: "Status" },
  ];
  private currentSortChoice = this.sortList[0];

  // Once component sucessfully mounted - axios call the API
  // Axios is also nice to provide an error if API fails
  mounted() {
    axios
      .get("https://run.mocky.io/v3/e6650d4a-69a3-4fb2-bad8-43bea7546248")
      .then((response) => {
        // get mocky JSON object from API
        // merge mocky JSON object properties with our empty blankExperiment
        // push empty array experimentListAxios with 'items'
        let experimentListAxios: Array<Experiment> = [];
        for (let experiment of response.data.Response.Items) {
          let formattedExperiment: Experiment = {
            ...blankExperiment,
            ...experiment,
          };
          experimentListAxios.push(formattedExperiment);
        }

        // store values in variables after experimentListAxios is made
        this.experimentsList = experimentListAxios;
        this.pageSize = response.data.Response.DisplayedCount;
        this.totalExperiments = response.data.Response.TotalCount;
        this.currentSortDir = response.data.Response.SortDir.toLowerCase();
        this.pageEnd = Math.ceil(this.totalExperiments / this.pageSize);
      })
      .catch((e) => {
        // console logs error
        console.log(e);
      });
  }

  //
  // paginatedView() returns a filtered view of the experimentsList
  // Runs each time experimentList is updated
  //
  // @return {Array<Object>} - experimentList subset based on currentPage and pageSize
  //
  // https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs//
  //
  get paginatedView() {
    return this.experimentsList.filter((row, index) => {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  //
  // nextPage() executes on click from button
  // Increments the current page number to re-render the paginated view
  // prevPage() executes on click from button
  // Reduces the current page number to re-render the paginated view
  //
  public nextPage() {
    if (this.currentPage * this.pageSize < this.experimentsList.length)
      this.currentPage++;
  }
  public prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  //
  // updateSortChoice() updates the current sort
  // Then executes sortExperiments as long as the type matches
  //
  public updateSortChoice(sortChoice: sortItem): void {
    this.currentSortChoice = sortChoice;
    let type = typeof blankExperiment[this.currentSortChoice.category];
    if (type === "string" || type === "number") {
      this.sortExperiments(type);
    }
  }

  //
  // toggleSortOrder() updates the current sort direction
  // Then executes sortExperiments as long as the type matches
  //
  public toggleSortOrder() {
    this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
    let type = typeof blankExperiment[this.currentSortChoice.category];
    if (type === "string" || type === "number") {
      this.sortExperiments(type);
    }
  }

  //
  // sortExperiments() takes a type and chooses the appropriate sort for experimentList
  //
  // @param {String} type - type of the Object[key], string is default
  //
  public sortExperiments(type: "string" | "number" = "string"): void {
    let category = this.currentSortChoice.category;
    if (this.currentSortDir === "asc") modifier = -1;
    if (type === "number") {
      this.experimentsList.sort((a, b) =>
        a[category] > b[category] ? -1 * modifier : 1 * modifier
      );
    } else {
      this.experimentsList.sort((a, b) =>
      a[category].toString().toUpperCase() >
      b[category].toString().toUpperCase()
        ? -1 * modifier
        : 1 * modifier
      );
    }
  }

  // toggles the sort menu control
  public toggleSortControl(): void {
    this.activeSortMenu = !this.activeSortMenu;
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
  // I'm kinda on the fence about the way I created this function
  //
  // Con - This function is rerun everytime the view is re-rendered
  //       considering that things mostly stay the same - it feels 
  //       like a waste. Perhaps is better to run format once and store 
  //       in another array with extra properties.
  
  public tableCellFormatter(
    value: number | string | UserOwnedBy | Instrument,
    key: string
  ) {

    // Conditional that formats the date and returns a string
    if (key.includes("Date")) {
      let date = new Date(value.toString());
      return date.toLocaleDateString();
    } 

    // Conditional that formats the ExpirementName by applying the gradient CSS class
    else if (key === "ExperimentName") {
      return '<div class="experiment-name-gradient">' + value + "</div>";
    } 

    // Conditional right aligns and converts the size to Bytes
    else if (key === "TotalSize") {
      return (
        '<div style="text-align: right">' + this.formatBytes(+value) + "</div>"
      );
    } 
    
    // Conditional that formats the object for UserOwnedBy
    // There is probably a better way to directly match type instead of what I made
    else if (typeof value === "object" && key === "UserOwnedBy") {
      if ("Id" in value) {
        let userId: string = value.Id;
        let userName: string = value.Name;
        return "<div>" + userId + "</div><div>" + userName + "</div>";
      }
    } 
    
    // Conditional that formats the object for Instrument
    // There is probably a better way to directly match type instead of what I made
    else if (typeof value === "object" && key === "Instrument") { 
      if ("InstrumentId" in value) {
        let instrumentId: number = value.InstrumentId;
        let instrumentName: string = value.Name;
        return (
          "<div>" + instrumentId + "</div><div>" + instrumentName + "</div>"
        );
      }
    } 
    
    // Otherwise - just return the value as is
    else {
      return value;
    }

    // NOTE: I wanted to try and bold the whole row when Status = Fail
    // But traversing or mutating the parent <tr> from value of child <td> 
    // did not work properly and probably bad practice. Perhaps that is where Vuex
    // for better state management would help. 
    //
    // However I did notice that the mockup had Status being the first column
    // In that instance, it is possible to instead bold every <td> henceforth in that row
    // after running a simple if statement. 
  }
}
</script>