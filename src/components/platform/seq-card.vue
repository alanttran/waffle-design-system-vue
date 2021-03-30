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

<script>
import Card from "../design-system/card/card";
import Badge from "../design-system/badge/badge";

export default {
  name: "SeqCard",
  components: { Card, Badge },
  props: {
    title: { type: String, default: "SeqCardTitle" },
    id: { type: String, default: "SeqCard ID" },
    status: { type: String, default: "SeqCard Status" },
    user: { type: String, default: "SeqCard User" },
    workflow: { type: String, default: "SeqCard Workflow" },
    instrumentName: { type: String, default: "SeqCard instrumentName" },
    instrumentType: { type: String, default: "SeqCard instrumentType" },
    flowcellBarcode: { type: String, default: "None" },
  },
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
