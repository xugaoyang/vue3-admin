<template>
  <div>
    <el-card class="h-full" :body-style="{ padding: 10, height: '100%', overflowY: 'auto' }">
      <div class="flex pb-10">
        <span>级联选择器：</span>
        <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
      </div>
      <div class="flex pb-10">
        <span>多选框组：</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="Option A" />
          <el-checkbox label="Option B" />
          <el-checkbox label="Option C" />
          <el-checkbox label="disabled" disabled />
          <el-checkbox label="selected and disabled" disabled />
        </el-checkbox-group>
      </div>
      <div class="flex pb-10">
        <span>日期选择：</span>
        <el-date-picker v-model="date" type="date" placeholder="Pick a day"></el-date-picker>
      </div>
      <div class="flex pb-10">
        <span>select选择:</span>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="flex pb-10">
        <span>穿梭框：</span>
        <el-transfer
          v-model="leftValue"
          style="text-align: left; display: inline-block"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :render-content="renderFunc"
          :titles="['Source', 'Target']"
          :button-texts="['To left', 'To right']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          :data="transferData"
          @change="transferHandleChange"
        >
          <template #left-footer>
            <el-button class="transfer-footer" size="small">Operation</el-button>
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small">Operation</el-button>
          </template>
        </el-transfer>
      </div>
      <div class="flex pb-10">
        <span>徽章：</span>
        <div>
          <el-badge :value="12">
            <el-button size="small">comments</el-button>
          </el-badge>
          <el-badge :value="3">
            <el-button size="small">replies</el-button>
          </el-badge>
          <el-badge :value="1" type="primary">
            <el-button size="small">comments</el-button>
          </el-badge>
          <el-badge :value="2" type="warning">
            <el-button size="small">replies</el-button>
          </el-badge>
        </div>
      </div>
      <div class="flex pb-10">
        <span>日历：</span>
        <el-calendar v-model="date1" />
      </div>
      <div class="flex pb-10">
        <span>树形选择器：</span>
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        />
      </div>
      <div class="flex pb-10">
        <span>tabs标签页：</span>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="User" name="first">User</el-tab-pane>
          <el-tab-pane label="Config" name="second">Config</el-tab-pane>
          <el-tab-pane label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex pb-10">
        <span>表格loading:</span>
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="flex pb-10">
        <el-tooltip content="Top center" placement="top">
          <el-button>Dark</el-button>
        </el-tooltip>
        <el-tooltip content="Bottom center" placement="bottom" effect="light">
          <el-button>Light</el-button>
        </el-tooltip>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'

const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
export default defineComponent({
  setup() {
    const state = reactive({
      value: [],
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
                {
                  value: 'feedback',
                  label: 'Feedback',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation',
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'docs',
              label: 'Design Documentation',
            },
          ],
        },
      ],
      date: '',
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      transferData: generateData(),
      leftValue: [1],
      renderFunc(h, option) {
        return h('span', null, option.key, ' - ', option.label)
      },
      date1: new Date(),
      treeData: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
            {
              id: 6,
              label: 'Level two 2-2',
            },
          ],
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        },
        {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        },
        {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        },
      ],
      loading: true,
    })
    const checkList = ref(['selected and disabled', 'Option A'])
    const handleChange = (value) => {
      console.log(value)
    }
    const transferHandleChange = (value, direction, movedKeys) => {
      console.log(value, direction, movedKeys)
    }
    const tabClick = (tab, event) => {
      console.log(tab, event)
    }
    return {
      checkList,
      ...toRefs(state),
      handleChange,
      transferHandleChange,
      tabClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  ::v-deep .el-menu {
    border: none;
  }
}
</style>
