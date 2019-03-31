<template>
  <div class="bangumi">
    <div class="search vertical">
      <el-input placeholder="请输入内容" v-model="searchValue" clearable class="input-with-select">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <!-- <main> -->
      <ul>
        <router-link v-for="(item, index) in 12" :key="index" class="center" tag="li" :to="{name: 'bangumiDetail', query: {id: index}}">
          <img src="../assets/img/test.webp" class="image">
          <!-- <img src="" class="image" loading> -->
            <div>
              <span>转生成为史莱姆的这件事</span>
            </div>
        </router-link>
      </ul>
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
    <!-- </main> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Bangumi extends Vue {
  searchValue: string = ""
  currentPage4: number = 4
  handleSizeChange (val: number) {
    console.log(`每页 ${val} 条`)
  }
  handleCurrentChange (val: number) {
    console.log(`当前页: ${val}`)
  }
}
</script>
<style>
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
  main {
    display: flex;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 1 0;
      flex-direction: column;
      box-shadow: 5px 5px 10px #ccc;
      border-radius: 5px;
      padding: 15px;
      margin: 15px;
      // perspective: 200px;
      transform-style: preserve-3d;
      transform-origin: center center;
      img {
        width: 150px;
        height: 190px;
      }
      div {
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 10px;
        color: #888;
        text-align: left;
        line-height: 24px;
        font-size: 14px;
      }
      &:hover {
       
        transform: translate3d(0, 0, 300px);
        transition: .2s;
      }
    }
  }
  // @media screen and (max-width: 750px) {
  //   ul li {
  //     img {
  //       width: 180px;
  //       height: 280px;
  //     }
  //   }
  // }
</style>
