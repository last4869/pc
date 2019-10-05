<template>
  <div class="bangumi">
    <div class="search vertical">
      <el-input placeholder="请输入内容" v-model="searchValue" clearable class="input-with-select">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <main>
      <el-row tag="ul">
        <el-col
          :span="4"
          :offset="1"
          tag="li"
          v-for="(item, index) in 13" :key="index"
        >
          <router-link :to="{name: 'bangumiDetail', query: {id: index}}">
            <img src="../assets/img/test.png" class="image">
            <div>
              <span>转生成为史莱姆的这件事</span>
            </div>
          </router-link>
        </el-col>
      </el-row>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400" background class="vertical">
        </el-pagination>
      </div>
    </main>
  </div>
</template>'
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Bangumi extends Vue {
  searchValue: string = ''
  currentPage4: number = 4
  created () {
    console.log(navigator.userAgent)
  }
  handleSizeChange (val: number) {
    console.log(`每页 ${val} 条`)
  }
  handleCurrentChange (val: number) {
    console.log(`当前页: ${val}`)
  }
}
</script>
<style lang="scss">
  .el-pagination {
    width: 100%;
    margin: 50px 0;
  }
  .search .el-input__inner {
    height: 50px;
    border: 1.5px solid #409eff;
  }
  .search .el-input__inner:hover {
    border: 1.5px solid #409eff;
  }
  .search .el-input__inner:focus {
    border-color: #409eff !important;
  }
  .search .el-input-group__append,
  .el-input-group__prepend {
    background: #409eff;
    border: 1.5px solid #409eff;
    color: white;
    font-size: 16px;
  }
</style>
<style lang="scss" scoped>
  .bangumi {
    flex-direction: column;
  }
  .search {
    width: 600px;
    margin: 40px auto;
  }
  ul {
    li {
      flex-direction: column;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
      div {
        width: 100%;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #888;
        text-align: left;
        line-height: 24px;
        font-size: 14px;
      }
      &:nth-child(5n - 4) {
        margin-left: 0;
      }
      &:hover {
        transform: translate3d(0, 0, 300px);
        transition: .2s;
      }
    }
  }
</style>
