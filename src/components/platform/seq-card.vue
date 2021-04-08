<template>
  <Card>
    <h2>{{ title }}</h2>
    <dl>
      <div>
        <dt>ID</dt>
        <dd>{{ id }}</dd>
      </div>
      <div>
        <dt>Status</dt>
        <dd>
          <Badge type="success" :text="status"> </Badge>
        </dd>
      </div>
      <div>
        <dt>Flowcell Barcode</dt>
        <dd>{{ flowcellBarcode }}</dd>
      </div>
      <div>
        <dt>User</dt>
        <dd>{{ user }}</dd>
      </div>
      <div>
        <dt>Workflow</dt>
        <dd>{{ workflow }}</dd>
      </div>
      <div>
        <dt>Instrument Name</dt>
        <dd>{{ instrumentName }}</dd>
      </div>
      <div>
        <dt>Instrument Type</dt>
        <dd>{{ instrumentType }}</dd>
      </div>
    </dl>
  </Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Card from "../design-system/card/card.vue";
import Badge from "../design-system/badge/badge.vue";

@Component({
    components: {Card, Badge}
})
export default class SeqCard extends Vue {    

  @Prop({default: 'SeqCardTitle'}) readonly title!: string
  @Prop({default: 'SeqCard ID'}) readonly id!: string
  @Prop({default: 'SeqCard Status'}) readonly status!: string
  @Prop({default: 'SeqCard Status'}) readonly user!: string
  @Prop({default: 'SeqCard Workflow'}) readonly workflow!: string
  @Prop({default: 'SeqCard instrumentName'}) readonly instrumentName!: string
  @Prop({default: 'SeqCard instrumentType'}) readonly instrumentType!: string
  @Prop({default: 'None'}) readonly flowcellBarcode!: string
  
};
</script>

<style scoped>
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  word-break: break-word;
}
dl {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
}
dl > div {
  flex: 0 0 50%;
  padding: 6px;
  box-sizing: border-box;
}
</style>
