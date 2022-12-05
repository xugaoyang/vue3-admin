<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" @click="startRecord()">录音</el-button>
      <el-button type="primary" @click="pauseRecord()">暂停</el-button>
      <el-button type="primary" @click="resumeRecord()">恢复</el-button>
      <el-button type="primary" @click="stopRecord()">停止</el-button>
    </el-row>
    <div>{{ duration }}</div>
    <canvas id="canvas"></canvas>
    <el-row class="mb-4">
      <el-button type="primary" @click="startPlay()">录音播放</el-button>
      <el-button type="primary" @click="pausePlay()">暂停播放</el-button>
      <el-button type="primary" @click="resumePlay()">恢复播放</el-button>
      <el-button type="primary" @click="stopPlay()">停止播放</el-button>
      <el-button type="primary" @click="destroy()">销毁实例</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button type="primary" @click="downloadWAV()">下载wav</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Recorder from 'js-audio-recorder'

export default defineComponent({
  setup() {
    const data = reactive({
      duration: 0,
      paintRecordWaveAni: null,
      recorder: null,
    })
    data.recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1, // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
    const paintRecordWave = () => {
      data.paintRecordWaveAni = requestAnimationFrame(paintRecordWave)
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      const unit8ClampedArr = data.recorder.getRecordAnalyseData()
      let bufferLength = unit8ClampedArr.length

      // 填充背景色
      ctx.fillStyle = 'rgb(200, 200, 200)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 设定波形绘制颜色
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgb(0, 0, 0)'

      ctx.beginPath()
      let sliceWidth = (canvas.width * 1.0) / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
        x = 0 // 绘制点的x轴位置
      for (let i = 0; i < bufferLength; i++) {
        let v = unit8ClampedArr[i] / 128.0
        let y = (v * canvas.height) / 2

        if (i === 0) {
          // 第一个点
          ctx.moveTo(x, y)
        } else {
          // 剩余的点
          ctx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
      }
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
    }

    const stopDrawRecord = () => {
      data.paintRecordWaveAni && cancelAnimationFrame(data.paintRecordWaveAni)
      data.paintRecordWaveAni = null
    }
    data.recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1, // 声道，支持 1 或 2， 默认是1
      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    })
    const startRecord = () => {
      Recorder.getPermission().then(
        () => {
          console.log('给权限了')
          data.recorder
            .start()
            .then(() => {
              console.log('开始录音')
              paintRecordWave()
            })
            .catch((err) => console.log(err))
        },
        (error) => {
          console.log(`${error.name} : ${error.message}`)
        }
      )
    }
    const pauseRecord = () => {
      data.recorder.pause()
    }
    const resumeRecord = () => {
      data.recorder.resume()
    }
    const stopRecord = () => {
      data.recorder.stop()
    }

    const startPlay = () => {
      data.recorder.play()
    }

    const pausePlay = () => {
      data.recorder.pausePlay()
    }

    const resumePlay = () => {
      data.recorder.resumePlay()
    }

    const stopPlay = () => {
      data.recorder.stopPlay()
    }

    const destroy = () => {
      data.recorder.destroy()
    }
    const downloadWav = () => {
      data.recorder.downloadWAV()
    }
    data.recorder.onprogress = function (params) {
      console.log('录音实时参数', params)
      console.log('录音时长(秒)', params.duration)
      console.log('录音大小(字节)', params.fileSize)
      console.log('录音音量百分比(%)', params.vol)
      console.log('当前录音的总数据([DataView, DataView...])', params.data)
    }
    data.recorder.onplay = () => {
      console.log('%c回调监听，开始播放音频', 'color: #2196f3')
    }
    data.recorder.onpauseplay = () => {
      console.log('%c回调监听，暂停播放音频', 'color: #2196f3')
    }
    data.recorder.onresumeplay = () => {
      console.log('%c回调监听，恢复播放音频', 'color: #2196f3')
    }
    data.recorder.onstopplay = () => {
      console.log('%c回调监听，停止播放音频', 'color: #2196f3')
    }
    data.recorder.onplayend = () => {
      console.log('%c回调监听，音频已经完成播放', 'color: #2196f3')
      // 播放结束后，停止绘制canavs
      stopDrawRecord()
    }

    onMounted(() => {})
    return {
      ...toRefs(data),
      startRecord,
      pauseRecord,
      resumeRecord,
      stopRecord,
      startPlay,
      pausePlay,
      resumePlay,
      stopPlay,
      destroy,
      downloadWav,
    }
  },
})
</script>

<style lang="scss" scoped></style>
