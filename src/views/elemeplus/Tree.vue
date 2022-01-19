<template>
  <div>
    <el-card class="h-full" :body-style="{ padding: 10, height: '100%' }">
      <el-table :data="tableData" height="100%">
        <el-table-column prop="date" label="Date" width="140"></el-table-column>
        <el-table-column prop="name" label="Name" width="120"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button type="text" size="small" @click="dialogVisible = true">Detail</el-button>
            <el-button type="text" size="small" @click="openDialog('edit')">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="info">
      <el-form ref="formTest" :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="Pick a time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="Online activities" name="type"></el-checkbox>
            <el-checkbox label="Promotion activities" name="type"></el-checkbox>
            <el-checkbox label="Offline activities" name="type"></el-checkbox>
            <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
          <el-radio-group v-model="form.resource">
            <el-radio label="Sponsor"></el-radio>
            <el-radio label="Venue"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }
    let dialogVisible = ref(false)
    const data = reactive({
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    })
    const tableData = ref(Array(20).fill(item))
    const openDialog = (type: string) => {
      dialogVisible.value = true
      switch (type) {
        case 'read':
          console.log('read')
          break
        case 'edit':
          console.log('edit')
          break
        default:
          console.log('1212')
      }
    }
    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      ...toRefs(data),
      dialogVisible,
      tableData,
      openDialog,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  :deep(.el-menu) {
    border: none;
  }
}
</style>
