<template>
  <el-card class="h-full">
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <el-row>
      <el-col :sm="12" :lg="6">
        <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary" size="medium">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary" size="medium">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary" size="medium">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-result icon="info" title="Info Tip" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary" size="medium">Back</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
    return {
      format
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
