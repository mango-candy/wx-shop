<template>
  <view>
  <!-- 顶部搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
  
    <!-- 搜索建议列表 -->
    <view class="sugg-list">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name" >{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
  
  </view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,  //延时器
        kw: '', //搜索框输入内容
        searchResults:[] //服务器返回搜索结果列表
			};
		},
    methods:{
      // 搜索框输入监听事件
      input(e){
        // console.log(e.value)
        clearTimeout(this.timer)   // 第二步,若500毫秒内重复触发input输入事件,则清除上一个延时器重新计时

        this.timer=setTimeout(()=>{        // 第一步建议一个500毫秒的延时器
          this.kw=e.value
          this.getSearchList()
        },500)
      },
      // 输入框内发生改变后传递数据
     async getSearchList(){
        // 预判断是否输入框内为空值
        if(this.kw===''){
          this.searchResults = []
          return
        }
      const {data:res}=await uni.$http.get( `/api/public/v1/goods/qsearch?query=${this.kw}` )
        if(res.meta.status!==200) return uni.$showMsg()
        this.searchResults=res.message
      },
      // 点击搜索item进入商品详情页面
      gotoDetail(goods_id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      }
    }
	}
</script>

<style lang="scss">
 .uni-searchbar {
    background-color: #c00000 !important;
 }
.search-box{
   position: sticky;
    top: 0;
    z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
</style>
