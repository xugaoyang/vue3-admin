<script setup lang="ts">
import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { reactive } from 'vue'

const data = reactive({
  key: 'CRCLDAP',
  name: '',
  pwd: '',
  cryptograph: '',
})
const startCrypto = () => {
  console.log(data.pwd, sha256(data.pwd).toString())
  if (data.key && data.name && data.pwd) {
    const step1 = `${data.key}+${data.name}+${sha256(data.pwd).toString().toUpperCase()}`
    data.cryptograph = sha256(step1).toString().toUpperCase()
  }
}
</script>

<template>
  <h3>test sha256</h3>
  <el-input v-model="data.key" placeholder="密钥" clearable />
  <el-input v-model="data.name" placeholder="用户名" clearable />
  <el-input v-model="data.pwd" placeholder="密码" clearable />
  <el-button type="primary" @click="startCrypto">提交</el-button>
  <el-input v-model="data.cryptograph" placeholder="密文" clearable></el-input>
</template>

<style></style>
