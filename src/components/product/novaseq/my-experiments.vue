<template>
  <div>
    <h1>Runs</h1>
    <div style="overflow: auto; max-width: calc(100vw - 4rem); white-space: nowrap">
      <table v-if="experimentsList.length > 0">
        <thead>
          <tr >
            <th></th>
            <th v-for="(value, key) in experimentsList[5]" :key="key.id">
              {{objectKeyToTableHeader(key)}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(experiment, name) in experimentsList" :key="name.id" >
            <td style="border-bottom: none">&#x25a2;</td>
            <td v-for="(value, name) in experiment" :key="value.Id">
              <div v-html="tableCellFormatter(value, name)"></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="placeholder-table" v-else>
        <thead>
          <tr>
            <th v-for="item in 5" :key="item"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 10" :key="item">
            <td v-for="item in 5" :key="item"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts"> 
import { Component, Vue } from "vue-property-decorator";
//import illuminaData from "../../../assets/illumina-runs-api.json";
import { Experiment } from "./experiment.interface";
import axios from 'axios';

type UserOwnedBy = {
  Id: string;
  Name: string;
}

type Instrument = {
  InstrumentId: number;
  Name: string
}

// Default values to each experiment to be merged later
// This is created to make sure that each property has a default value
// Even if the .json object has it missing
// Known missing keys: ReagentBarcode, FlowcellBarcode
// 
const defaultExperiment:Experiment = { 
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
}

@Component
export default class MyExperiments extends Vue{
  private experimentsList: Array<Experiment> = [];

  mounted(){
    axios.get('https://run.mocky.io/v3/8c3c1b98-5111-4c6f-8622-3e604a2e91f8')
    .then(response => {
      // JSON responses are automatically parsed.
      //this.experiments = response.data.Response.Items;
      for(let experiment of response.data.Response.Items){
        let formattedExperiment:Experiment = {...defaultExperiment, ...experiment};
        console.log(formattedExperiment)
        this.experimentsList.push(formattedExperiment);
      }
      console.log(this.experimentsList)
    })
    .catch(e => {
      // console logs error
      console.log(e)
    })
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
  public objectKeyToTableHeader(word:string){
    word = word.replace(/([a-z])([A-Z])/g, '$1 $2');
    let tableHeaderString = word.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return tableHeaderString;
  }

  //
  // Function that formats table cell value based on the object key
  //
  // @param {String} value - value of json object key
  // @param {String} key - json object key
  // @return {any} - e.g. if object key has "Date" then it will return a local date string
  //
  public tableCellFormatter(value: number | string | UserOwnedBy | Instrument, key: string){
    if(key.includes("Date")){
      // Conditional that formats the date and returns a string

      let date = new Date(value.toString());
      return date.toLocaleDateString();
    }
    else if(key === 'ExperimentName'){
      // Conditional that formats the ExpirementName by applying the gradient CSS class
      return '<span class="experiment-name-gradient">'+ value + '</span>';
    }
    else if(typeof value === 'object' && key === 'UserOwnedBy'){
      // Conditional that formats the object for UserOwnedBy
      // There is probably a better way to directly match type instead of what I made
      if ('Id' in value){
        let userId: string = value.Id;
        let userName: string = value.Name;
        return '<div>' + userId + '</div><div>' + userName + '</div>';
      }
    }
    else if(typeof value === 'object' && key === 'Instrument'){
      // Conditional that formats the object for Instrument
      // There is probably a better way to directly match type instead of what I made
      if ('InstrumentId' in value){
        let instrumentId: number = value.InstrumentId;
        let instrumentName: string = value.Name;
        return '<div>' + instrumentId + '</div><div>' + instrumentName + '</div>';
      }
    }
    else{
      return value;
    }
  }
}
</script>