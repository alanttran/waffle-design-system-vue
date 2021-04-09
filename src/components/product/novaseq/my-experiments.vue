<template>
  <div>
    <h1>Runs</h1>
    <div style="overflow: auto; max-width: 100%; white-space: nowrap">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(value, key) in experiments[5]" :key="key.id">
              {{insertSpaces(key)}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(experiment, name) in experiments" :key="name.id" >
            <td style="border-bottom: none">&#x25a2;</td>
            <td v-for="(value, name) in experiment" :key="value.Id">
              {{formatter(value, name)}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import illuminaData from "../../../assets/illumina-runs-api.json";

const experimentList: Array<Object> = illuminaData.Response.Items as Array<Object>;

@Component
export default class MyExperiments extends Vue {
  private experiments: Array<object> = experimentList;

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
  public insertSpaces(word:string){
    word = word.replace(/([a-z])([A-Z])/g, '$1 $2');
    let tableHeaderString = word.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return tableHeaderString;
  }

  //
  // Function that formats the value based on the object key
  //
  // @param {String} value - value of json object key
  // @param {String} key - json object key
  // @return {String} - e.g. if object key has "Date" then it will return a local date string
  //
  public formatter(value: string, key: string){
    if(key.includes("Date")){
      let date = new Date(value);
      return date.toLocaleDateString();
    }
    else{
      return value;
    }
  }
}
</script>