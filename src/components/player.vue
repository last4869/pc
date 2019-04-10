<template>
  <div class="player" ref="playerBox">
    <video ref="video"
      :width="options.width"
      :height="options.height"
      src="../assets/video/映画『天気の子』予報（予告篇）.mp4"
      @timeupdate="timeupdate">
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
        <span :class="['volume icon iconfont', volumeIcon]"></span>
        <div class="volumeBox" ref="volumeBox">
          <div class="progressLine" ref="volumeLine" @click="volume">
            <div class="progress" ref="volume"></div>
          </div>
          <div class="progressBar"  ref="volumeBar" @mousemove="volumeMove($event)"></div>
        </div>
        <span class="fullscreen icon iconfont icon-fullscreen" @click="fullScreen"></span>
      </div>
    </div>
  </div>
</template>
<script>
import {Format} from '../utils/index.js'
export default {
  data () {
    return {
      playStatus: false,
      player: undefined,
      currentTime: '00:00:00',
      duration: '00:00:00',
      options: {
        width: 708,
        height: 400,
        fullScreen: false
      },
      volumeIcon: 'icon-yinliang'
    }
  },
  mounted () {
    this.player = this.$refs.video
    this.init()
  },
  methods: {
    init () {
      console.log(this.$refs)
      this.currentTime = this.player.currentTime
      this.duration = this.player.duration
    },
    play () {
      this.playStatus = this.player.paused ? this.player.play() : this.player.pause()
    },
    fullScreen () {
      this.options.fullScreen = !this.options.fullScreen
      this.options.fullScreen ? this.player.webkitRequestFullScreen() : this.player.webkitExitFullScreen()
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
    volumeChangeIcon () {
      let volume = this.player.volume
      if (volume > .75) {
        this.volumeIcon = 'icon-yinliang'
      } else if (volume > .4 && volume < .75) {
        this.volumeIcon = 'icon-yinliangdaxiao'
      } else if (volume > 0 && volume < .4) {
        this.volumeIcon = 'icon-zuixiaoyinliang'
      } else if (volume === 0) {
        this.volumeIcon = 'icon-guanbiyinliang'
      }
    },
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
    timeupdate () {
      // this.currentTime = Format(this.player.currentTime, false)
      // this.duration = Format(this.player.duration, false)
      // let videoProgress = this.$refs.videoProgress.clientWidth
      // let videoProgressLine = this.$refs.videoProgressLine.clientWidth
      // console.log(videoProgress, videoProgressLine)
      // let position = (this.player.currentTime / this.player.duration) * 100 + '%'
      // this.$refs.videoProgress.style.width = position
      // this.$refs.videoProgressBar.style.left = videoProgress - this.$refs.videoProgressBar.clientWidth + 3 + 'px'
      // console.log(this.$refs.videoProgressBar.style.left)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/player.scss';

video::-webkit-media-controls{
  display:none !important;
}
.player{
  width: 708px;
  height: 400px;
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
    }
    .icon-tingzhi {
      font-size: 24px;
    }
    .icon-caret-right {
      font-size: 28px;
    }
    .icon-caret-right, .icon-tingzhi {
      width: 30px;
      // border: 2px solid red;
      margin: 0 15px;
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
        background: $primaryColor;
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
}
</style>
