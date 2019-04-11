<template>
  <div class="player" ref="playerBox">
    <video ref="video"
      :width="options.width"
      :height="options.height"
      :autoplay="options.autoplay"
      :loop="options.loop"
      preload="preload"
      @canplay="canplay"
      @error="error"
      @timeupdate="timeupdate">
      <source v-for="(item, index) in options.source" :key="index" :src="item.video" type="video/mp4"/>
    </video>
    <div class="controlBox" ref="progressBox">
      <div class="progressBox">
        <div class="progressLine" ref="videoProgressLine" @click="jump">
          <div class="progress" ref="videoProgress"></div>
        </div>
        <div class="progressBar" ref="videoProgressBar" @mousemove="progressMove"></div>
      </div>
      <div class="left">
        <div class="play">
          <span class="icon iconfont icon-step-backward"></span>
          <span :class="['icon iconfont', playStatus ? 'icon-tingzhi' : 'icon-caret-right']" @click="play"></span>
          <span class="icon iconfont icon-step-forward"></span>
        </div>
        <div class="duration">
          <span>{{currentTime}}</span>
          <span>/</span>
          <span>{{duration}}</span>
        </div>
      </div>
      <div class="right">
        <span :class="['volume icon iconfont', volumeIcon]" @click="muted"></span>
        <div class="volumeBox" ref="volumeBox">
          <div class="progressLine" ref="volumeLine" @click="volume">
            <div class="progress" ref="volume"></div>
          </div>
          <div class="progressBar"  ref="volumeBar" @mousemove="volumeMove($event)"></div>
        </div>
        <span class="icon iconfont icon-kongzhi"></span>
        <span class="fullscreen icon iconfont icon-fullscreen" @click="fullScreen"></span>
      </div>
    </div>
    <ul class="controls">
      <li class="list">
        <span class="title">速度控制</span>
        <div class="content slider">
          <el-slider
            v-model="options.speed"
            :min="0"
            :max="2"
            :step="0.1"
            :show-tooltip="false"
            @change="change">
          </el-slider>
        </div>
      </li>
      <li class="list">
        <span class="title">播放模式</span>
        <div class="content">
          <div class="playMode" v-for="(item, index) in playMode" :key="index">{{item}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Format } from '../utils/index.js'
export default {
  data () {
    return {
      playStatus: false,
      player: undefined,
      currentTime: '00:00:00',
      duration: '00:00:00',
      playMode: ['洗脑循环', '列表播放', '列表循环'],
      options: {
        width: '100%',
        height: '100%',
        source: [{
          video: '../assets/video/一拳超人第二季01.mp4'
        },
        {
          video: '../assets/video/异世界四重奏01.mp4'
        },
        {
          video: '../assets/video/映画『天気の子』予報（予告篇）.mp4'
        }],
        fullScreen: false,
        speed: 0,
        autoplay: false,
        loop: false
      },
      volumeIcon: 'icon-yinliang'
    }
  },
  mounted () {
    this.player = this.$refs.video
    /*
      video.error：
        MEDIA_ERR_ABORTED(数字值为1)，媒体数据的下载过程由于用户的操作原因而被终止。
        MEDIA_ERR_NETWORK(数字值为2)，确认媒体资源可用，但是在下载出现网络错误，媒体数据的下载过程被中止。
        MEDIA_ERR_DECODE(数字值为3)，确认媒体资源可用，但是解码时发生错误。
        MEDIA_ERR_SRC_NOT_SUPPORTED(数字值为4)，媒体资源不可用或媒体格式不被支持。

      video.networkState：
        NETWORK_EMPTY（数字值为0）：元素处于初始状态。
        NETWORK_IDLE(数字值为1)，浏览器已选择好用什么编码格式来播放媒体，但是尚未建立网络连接。
        NETWORK_LOADING(数字值为2)：媒体数据加载中
        NETWORK_NO_SOURCE(数字值为3)，没有支持的编码格式，不执行加载。
    */
    console.log(this.player.error)
    console.log(this.player.networkState)
    window.onkeydown = ev => {
      if (ev.keyCode === 32) this.play()
    }
  },
  methods: {
    error (res) {
      console.log(this.player.error)
    },
    // video已经准备好播放
    canplay () {
      this.duration = Format(this.player.duration)
    },
    // 播放
    play () {
      this.playStatus = this.player.paused ? this.player.play() : this.player.pause()
    },
    // 改变播放速率
    change (speed) {
      this.player.playbackRate = speed
      console.log(speed)
    },
    // 进入全屏
    FullScreen () {
      let el = document.documentElement
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    ExitFullscreen () {
      var doc = document
      if (doc.exitFullscreen) {
        doc.exitFullscreen()
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen()
      }
    },
    // 全屏
    fullScreen () {
      this.options.fullScreen = !this.options.fullScreen
      this.options.fullScreen ? this.FullScreen() : this.ExitFullscreen()
    },
    jump (e) {
      let videoProgress = this.$refs.videoProgress
      let videoProgressLine = this.$refs.videoProgressLine
      let videoProgressBar = this.$refs.videoProgressBar
      let currentTime = e.offsetX / videoProgressLine.clientWidth * this.player.duration
      let position = e.offsetX
      if ((position - videoProgressBar.clientWidth) <= 0) {
        position = 0
      } else if (position > (videoProgressLine.clientWidth - videoProgressBar.clientWidth)) {
        position = videoProgressLine.clientWidth - videoProgressBar.clientWidth
      }
      videoProgress.style.width = position + 'px'
      videoProgressBar.style.left = position + 'px'
      this.player.currentTime = currentTime
    },
    progressMove () {
      let videoProgress = this.$refs.videoProgress
      let videoProgressLine = this.$refs.videoProgressLine
      let videoProgressBar = this.$refs.videoProgressBar
      let videoProgressBox = this.$refs.progressBox
      let playerBox = this.$refs.playerBox
      document.onmousedown = () => {
        document.onmousemove = (ev) => {
          let position = ev.clientX - videoProgressBox.offsetLeft - playerBox.offsetLeft
          let maxMovePoint = videoProgressLine.clientWidth - videoProgressBar.clientWidth
          if (position > maxMovePoint) {
            position = maxMovePoint
          } else if (position < 0) {
            position = 0
          }
          let currentTime = (position / maxMovePoint) * this.player.duration
          videoProgress.style.width = position + 'px'
          videoProgressBar.style.left = position + 'px'
          this.player.currentTime = currentTime
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    },
    // 静音
    muted () {
      this.player.muted = !this.player.muted
      this.player.muted ? this.volumeIcon = 'icon-guanbiyinliang' : this.volumeIcon = 'icon-yinliang'
    },
    // 修改音量图标
    volumeChangeIcon () {
      let volume = this.player.volume
      if (volume > 0.75) {
        this.volumeIcon = 'icon-yinliang'
      } else if (volume > 0.4 && volume < 0.75) {
        this.volumeIcon = 'icon-yinliangdaxiao'
      } else if (volume > 0 && volume < 0.4) {
        this.volumeIcon = 'icon-zuixiaoyinliang'
      } else if (volume === 0) {
        this.volumeIcon = 'icon-guanbiyinliang'
      }
    },
    // 拖拽调整音量大小
    volumeMove () {
      const volumeLine = this.$refs.volumeLine
      const volumeBar = this.$refs.volumeBar
      const volume = this.$refs.volume
      const volumeBox = this.$refs.volumeBox
      const playerBox = this.$refs.playerBox
      document.onmousedown = () => {
        document.onmousemove = (ev) => {
          let position = ev.clientX - volumeBox.offsetLeft - playerBox.offsetLeft
          let maxMovePoint = volumeLine.clientWidth - volumeBar.clientWidth
          if (position > maxMovePoint) {
            position = maxMovePoint
          } else if (position < 0) {
            position = 0
          }
          let volumeSize = Number((position / maxMovePoint).toFixed(2))
          volume.style.width = position + 'px'
          volumeBar.style.left = position + 'px'
          this.player.volume = volumeSize
          this.volumeChangeIcon()
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    },
    // 点击调整音量大小
    volume (e) {
      const volumeLine = this.$refs.volumeLine
      const volumeBar = this.$refs.volumeBar
      const volume = this.$refs.volume
      let position = e.offsetX
      const volumeSize = Number((position / volumeLine.clientWidth).toFixed(2))
      if ((position - volumeBar.clientWidth) <= 0) {
        position = 0
      } else if (position > (volumeLine.clientWidth - volumeBar.clientWidth)) {
        position = volumeLine.clientWidth - volumeBar.clientWidth
      }
      volume.style.width = position + 'px'
      volumeBar.style.left = position + 'px'
      this.player.volume = volumeSize
      this.volumeChangeIcon()
    },
    // 视频时间调整的操作
    timeupdate () {
      let videoProgress = this.$refs.videoProgress
      let videoProgressLine = this.$refs.videoProgressLine
      let videoProgressBar = this.$refs.videoProgressBar
      let position = (this.player.currentTime / this.player.duration) * videoProgressLine.clientWidth
      let max = videoProgress.clientWidth - videoProgressBar.clientWidth + 3
      this.currentTime = Format(this.player.currentTime, false)
      if (max < 0) max = 0
      videoProgress.style.width = position + 'px'
      videoProgressBar.style.left = max + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/player.scss';
// video::-webkit-media-controls{
//   display:none !important;
// }
.player{
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  z-index: 2147483650 !important;
  video {
    position: absolute;
    top: 0;
  }
  .controlBox {
    width: 100%;
    height: 12%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    bottom: 0;
    color: white;
    box-sizing: border-box;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      vertical-align: middle;
    }
    .icon {
      font-size: 20px;
      margin: 0 10px;
    }
    .icon-tingzhi {
      font-size: 24px;
    }
    .icon-kongzhi {
      font-size: 24px;
    }
    .icon-caret-right {
      font-size: 28px;
    }
    .icon-caret-right, .icon-tingzhi {
      width: 30px;
      text-align: center;
      display: inline-block;
    }
    .fullscreen {
      font-size: 28px;
    }
    .progressBox {
      width: 100%;
      height: 5px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .volume {
      margin-right: 10px;
    }
    .volumeBox {
      width: 120px;
      height: 5px;
      margin-right: 20px;
      position: relative;
      .progressLine {
        border-radius: 5px;
        overflow: hidden;
      }
    }
    .progressLine {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .5);
      .progress {
        width: 0%;
        height: 100%;
        background: #409EFF;
      }
    }
    .progressBar {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: $primaryColor;
      position: absolute;
      top: -5px;
      left: 0;
      border: 2px solid #409EFF;
    }
    .play {
      margin-right: 20px;
    }
    .duration {
      span {
        &:nth-of-type(2) {
          margin: 0 5px;
        }
      }
    }
    .left, .right {
      display: flex;
      align-items: center;
    }
  }
  .controls {
    width: 200px;
    padding: 10px;
    z-index: 10;
    background: white;
    border-radius: 10px;
    position: absolute;
    bottom: 10%;
    left: 80%;
    border: 2px solid red;
    font-size: 14px;
    li {
      display: flex;
      flex: 1;
      flex-direction: column;
      &:nth-child(2) {
        .content {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }
      }
    }
    .playMode {
      color: white;
      width: 78px;
      padding: 10px;
      background: #409EFF;
      margin-right: 10px;
      margin-top: 10px;
    }
  }
  @media screen and (min-width: 960px) and (max-width: 1200px) {
    .controlBox {
      height: 10%;
    }
  }
  @media screen and (min-width: 1200px){
    .controlBox {
      height: 8%;
    }
  }
  @media screen and (min-width: 1600px){
    .controlBox {
      height: 6%;
    }
  }
}
</style>
