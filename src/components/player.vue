<template>
  <div class="playerBox" ref="playerBox">
    <video ref="player"
      src="../assets/video/映画『天気の子』予報（予告篇）.mp4"
      :width="options.width"
      :height="options.height"
      :autoplay="options.autoplay"
      :loop="options.loop"
      preload="auto"
      @canplay.stop="canplay"
      @error.stop="error"
      @timeupdate.stop="timeupdate">
      <!-- <source v-for="(item, index) in options.source" :key="index" :src="item.video" type="video/mp4"/> -->
    </video>
    <div class="controlBox" ref="controlBox">
      <ul class="controls" v-show="showSetting">
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
            <div class="playMode" v-for="(item, index) in playModeList" :key="index" @click="playMode(item)">{{item}}</div>
          </div>
        </li>
      </ul>
      <!-- 点击设置调整播放模式、播放速度 -->
      <div class="progressBox">
        <div class="progressLine" ref="videoProgressLine" @click="jump">
          <div class="progress" ref="videoProgress"></div>
          <div class="preload" ref="preload"></div>
        </div>
        <div class="progressBar" ref="videoProgressBar" @mousemove.stop="progressMove" @mouseup.stop="mouseUp"></div>
      </div>
      <div class="left">
        <!-- 播放按钮 -->
        <div class="play">
          <span class="icon iconfont icon-step-backward"></span>
          <span :class="['icon iconfont', playStatus ? 'icon-tingzhi' : 'icon-caret-right']" @click="play"></span>
          <span class="icon iconfont icon-step-forward"></span>
        </div>
        <!-- 时间显示 -->
        <div class="duration">
          <span>{{currentTime}}</span>
          <span>/</span>
          <span>{{duration}}</span>
        </div>
      </div>
      <div class="right">
        <!-- 音量控制 -->
        <span :class="['volume icon iconfont', volumeIcon]" @click="muted"></span>
        <div class="volumeBox" ref="volumeBox">
          <div class="progressLine" ref="volumeLine" @click="volume">
            <div class="progress" ref="volume"></div>
          </div>
          <div class="progressBar"  ref="volumeBar" @mousemove.stop="volumeMove" @mouseup.stop="mouseUp"></div>
        </div>
        <!-- 设置部分 -->
        <span class="icon iconfont icon-kongzhi" @click="setting"></span>
        <!-- 全屏 -->
        <span class="fullscreen icon iconfont icon-fullscreen" @click="fullScreen"></span>
      </div>
    </div>
    <!-- video加载部分 -->
    <div class="loading" v-show="loading">
      <span class="icon iconfont icon-loading"></span>
    </div>
    <!-- 暂停显示的部分 -->
    <div class="playStatus" v-show="!loading && !playStatus">
      <span class="icon iconfont icon-video1" @click="play"></span>
    </div>
  </div>
</template>
<script>
import { Format } from '../utils/index.js'
export default {
  data () {
    return {
      playStatus: false,
      player: undefined,
      loading: true,
      currentTime: '00:00:00',
      duration: '00:00:00',
      currentIndex: 0,
      playModeList: ['单集播放', '洗脑循环', '列表播放', '列表循环', '随机播放'],
      options: {
        width: '100%',
        height: '100%',
        source: ['../assets/video/一拳超人第二季01.mp4', '../assets/video/movie.ogg', '../assets/video/异世界四重奏01.mp4', '../assets/video/映画『天気の子』予報（予告篇）.mp4'],
        defaultPlayMode: '单集播放',
        fullScreen: false,
        speed: 1,
        autoplay: false,
        loop: false
      },
      // 全局的el
      init: {},
      volumeIcon: 'icon-yinliang',
      showSetting: false
    }
  },
  mounted () {
    this.init = {
      ...this.$refs
    }
    this.player = this.$refs.player
    /*
    http://zm.ayypd.cn/index.php/m3u8/7debQblQzBGyXXoPkJtz6EuW0KDWtsYl5cWwomqbHGbGxQi2dogeePXZlTlIPpws4nVk91N0JN9trQg.m3u8
    // 测试地址
      readyState表示音频/视频元素的就绪状态：
        0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
        1 = HAVE_METADATA - 关于音频/视频就绪的元数据
        2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
        3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
        4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
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
    console.log('错误信息' + this.player.error)
    console.log('就绪状态' + this.player.readyState)
    console.log('网络状态' + this.player.networkState)
    this.shortcutKey()
    this.mouseUp()
  },
  methods: {
    // 快捷键
    shortcutKey () {
      window.onkeydown = ev => {
        /**
         * 32 空格播放暂停
         * 70 F 进入和退出全屏
         * 77 M 调整是否静音
         */
        if (ev.keyCode === 32) this.play()
        if (ev.keyCode === 70) this.fullScreen()
        if (ev.keyCode === 77) this.muted()
        console.log(ev.keyCode)
      }
    },
    mouseUp () {
      document.onmouseup = (ev) => {
        ev.stopPropagation()
        document.onmousemove = (ev) => {
          ev.preventDefault()
        }
      }
    },
    error (res) {
      console.log(this.player.error)
    },
    setting () {
      this.showSetting = !this.showSetting
    },
    // 预加载
    preload () {
      const len = this.player.buffered.length - 1
      const { videoProgressLine, preload } = this.init
      const start = this.player.buffered.start(len)
      const end = this.player.buffered.end(len)
      let position = (end / this.player.duration) * videoProgressLine.offsetWidth
      preload.style.width = position.toFixed(2) + 'px'
    },
    // video已经准备好播放
    canplay () {
      this.preload()
      this.loading = false
      this.duration = Format(this.player.duration)
    },
    // 播放
    play () {
      this.playStatus = this.player.paused ? this.player.play() : this.player.pause()
    },
    // 改变播放速率
    change (speed) {
      this.player.playbackRate = speed
    },
    /**
     * @param {number} min 最小数值
     * @param {number} max 最大值
     * @param {number} len 需要产生多少个随机数
     */
    random (min = 0, max, len) {
      let arr = []
      for (let i = 0; i < len; i++) {
        let rand = parseInt(Math.random(max - min) * max)
        arr.push(rand)
      }
      return arr
    },
    // 播放模式
    playMode (item) {
      const video = document.getElementsByTagName('video')[0]
      // 如果不是洗脑循环就改为false
      this.options.defaultPlayMode = item
      this.options.defaultPlayMode === '洗脑循环' ? this.options.loop = true : this.options.loop = false
      switch (this.options.defaultPlayMode) {
        case '单集播放':
          this.options.loop = false
          break
        case '列表播放':
          // 列表播放
          if (this.player.ended) {
            this.currentIndex++
            video.setAttribute('src', this.options.source[this.currentIndex])
            // this.player.src = this.options.source[this.currentIndex]
          }
          break
        case '列表循环':
          // 列表循环
          if (this.player.ended) {
            this.currentIndex++
            if (this.currentIndex >= this.options.source.length) {
              this.currentIndex = 0
            }
            this.player.src = this.options.source[this.currentIndex]
          }
          break
        case '随机播放':
          // 随机播放
          if (this.player.ended) {
            this.currentIndex = this.random(0, this.options.source.length, 1)[0]
            console.log(this.currentIndex)
            this.player.src = this.options.source[this.currentIndex]
          }
          break
      }
    },
    // 进入全屏
    FullScreen () {
      const { playerBox } = this.init
      const el = playerBox
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
    // 点击跳转进度
    jump (e) {
      const { videoProgress, videoProgressLine, videoProgressBar } = this.init
      let currentTime = e.offsetX / videoProgressLine.offsetWidth * this.player.duration
      let position = e.offsetX
      this.preload()
      this.currentTime = Format(currentTime)
      this.player.currentTime = currentTime
      videoProgress.style.width = position + 'px'
      videoProgressBar.style.left = position + 'px'
    },
    // 拖拽调整进度
    progressMove () {
      const { videoProgress, videoProgressLine, videoProgressBar, controlBox, playerBox } = this.init
      document.onmousedown = () => {
        document.onmousemove = (ev) => {
          let position = ev.clientX - controlBox.offsetLeft - playerBox.offsetLeft
          let maxMovePoint = videoProgressLine.offsetWidth - videoProgressBar.offsetWidth
          if (position > maxMovePoint) {
            position = maxMovePoint
          } else if (position < 0) {
            position = 0
          }
          let currentTime = (position / maxMovePoint) * this.player.duration
          this.currentTime = Format(currentTime)
          this.player.currentTime = currentTime
          videoProgress.style.width = position + 'px'
          videoProgressBar.style.left = position + 'px'
        }
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
      const { volumeLine, volumeBar, volume, volumeBox, playerBox } = this.init
      document.onmousedown = () => {
        document.onmousemove = (ev) => {
          let position = ev.clientX - volumeBox.offsetLeft - playerBox.offsetLeft
          let maxMovePoint = volumeLine.offsetWidth - volumeBar.offsetWidth
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
    },
    // 点击调整音量大小
    volume (e) {
      let position = e.offsetX
      const { volumeLine, volumeBar, volume } = this.init
      const volumeSize = Number((position / volumeLine.offsetWidth).toFixed(2))
      if ((position - volumeBar.offsetWidth) <= 0) {
        position = 0
      } else if (position > (volumeLine.offsetWidth - volumeBar.offsetWidth)) {
        position = volumeLine.offsetWidth - volumeBar.offsetWidth
      }
      volume.style.width = position + 'px'
      volumeBar.style.left = position + 'px'
      this.player.volume = volumeSize
      this.volumeChangeIcon()
    },
    // 视频时间调整的操作
    timeupdate () {
      this.preload()
      const { controlBox, videoProgressLine, videoProgressBar, videoProgress } = this.init
      let position = (this.player.currentTime / this.player.duration) * videoProgressLine.offsetWidth
      let max
      if (videoProgressBar.offsetLeft >= (videoProgressLine.offsetWidth - videoProgressBar.offsetWidth)) {
        max = videoProgressLine.offsetWidth - videoProgressBar.offsetWidth
      } else {
        max = position
      }
      this.currentTime = Format(this.player.currentTime, false)
      videoProgress.style.width = position + 'px'
      videoProgressBar.style.left = max + 'px'
      this.playMode(this.options.defaultPlayMode)
      if (this.player.ended) {
        console.log('错误信息' + this.player.error)
        console.log('就绪状态' + this.player.readyState)
        console.log('网络状态' + this.player.networkState)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/player.scss';
.player:hover .controlBox {
  opacity: 1;
}
.playerBox{
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  box-sizing: border-box;
  .loading, .playStatus {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 60px;
      color: white;
    }
    .icon-loading {
      animation: loading 1.5s linear infinite;
      display: inline-block;
    }
    // .icon-video1 {
    //   color: #409EFF;
    // }
    @keyframes loading {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  video {
    position: absolute;
    top: 0px;
  }
  .controlBox {
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    bottom: 0px;
    color: white;
    box-sizing: border-box;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // opacity: 0;
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
    .progressLine {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .5);
      .progress {
        width: 0%;
        height: 100%;
        background: #409EFF;
        position: absolute;
        top: 0px;
        left: 0%;
        z-index: 1;
      }
      .preload {
        width: 0%;
        height: 100%;
        background: white;
        position: absolute;
        top: 0px;
        left: 0%;
      }
    }
    .progressBar {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: $primaryColor;
      position: absolute;
      top: -5px;
      left: 0%;
      z-index: 1;
      border: 2px solid #409EFF;
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
      .progress {
        width: 50%;
      }
      .progressBar {
        left: 50%;
      }
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
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    position: absolute;
    bottom: 120%;
    left: 80%;
    // border: 2px solid red;
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
      padding: 5px;
      background: #409EFF;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 5px;
      text-align: center;
    }
  }
  @media screen and (min-width: 1800px){
    .controlBox {
      height: 7%;
    }
  }
}
</style>
