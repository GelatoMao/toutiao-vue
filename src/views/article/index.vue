<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <!-- 将单选框中的数据绑定到status中 -->
          <el-radio-group v-model="status">
            <!--
              el-radio 默认把 label 作为文本和选中之后的 value 值
          -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!--
            button 按钮的 click 事件有个默认参数
            当你没有指定参数的时候，它会默认传递一个没用的数据
          -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{ totalCount }}条结果：
      </div>

      <!-- 数据列表 -->
      <!--
        Table 表格组件
        1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
          注意：不用去 v-for 遍历，它自己会遍历
        2、设计表格列 el-table-column
          width 可以设定表格列的宽度
          label 可以设定列的标题
          prop  用来设定要渲染的列表项数据字段，只能展示文本

        3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮、图片，那就需要自定义表格列模板了 自定义列的显示内容，可组合其他组件使用。：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
      -->
      <el-table
        class="list-table"
        :data="articles"
        stripe
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <!-- 如果有第一张照片，就选第一张，如果没有，就选no-cover.gif -->
            <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-cover" src="./no-cover.gif" alt="" />
            <!-- <img
              class="article-cover"
              :src="scope.row.cover.images[0] || 'no-cover.gif'"
              alt=""
            /> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="danger"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="info"
              >已删除</el-tag
            > -->
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template>
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle
              type="primary"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 列表分页 默认每页10条数据 一共100页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
      />
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      status: null // 查询文章的状态，不传就是全部
    }
  },
  computed: {},
  watch: {},
  created () {
    // 初始状态获取第一页数据
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      getArticles({ page, per_page: this.pageSize, status: this.status }).then(
        res => {
          // eslint中需要驼峰命名法 将total_count重新命名
          const { results, total_count: totalCount } = res.data.data
          this.articles = results
          this.totalCount = totalCount
        }
      )
    },
    // 页码改变就会触发这个函数，并且将此时的页码作为参数传递过来
    // 与此同时 调用loadArticles这个函数渲染最新请求数据 并且将当前的页码传递过去
    onCurrentChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 80px;
  background-size: cover;
}
</style>
