<template>
  <div class="login-page w-full h-full">
    <div class="login-box">
      <el-form class="login-form" ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="input username">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="input password">
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" size="small">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'
import { User, Lock } from '@element-plus/icons'
import { init, animate } from '@/utils/loginBgWithThree'

export default defineComponent({
  components: { User, Lock },
  setup() {
    const data = reactive({
      form: {
        name: '',
        password: '',
      },
    })
    onMounted(() => {
      init('.login-page')
      animate()
    })
    return {
      ...data,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-page {
  ::v-deep canvas {
    width: 100% !important;
    height: 100% !important;
  }
  .login-box {
    position: absolute;
    right: 15%;
    top: 40%;
    width: 400px;
    height: 200px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    .login-form {
    }
  }
}
</style>
