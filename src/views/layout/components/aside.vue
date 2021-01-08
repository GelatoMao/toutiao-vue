<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可 因为激活了路由 所以这边的index设置为路径
    router开启路由导航模式
  -->
  <el-menu
    class="navmenu-container"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshouye"></use>
      </svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconneirong"></use>
      </svg>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconimage"></use>
      </svg>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconfabu"></use>
      </svg>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconcomment1"></use>
      </svg>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconfans"></use>
      </svg>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icongeren"></use>
      </svg>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'], // props里面的数据使用短横杆来处理
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.navmenu-container {
  .icon {
    margin-right: 10px;
    padding-left: 5px;
  }
}
</style>
