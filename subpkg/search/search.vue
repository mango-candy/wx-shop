<template>
  <view>
  <!-- 顶部搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
  
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name" >{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
  
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
     <!-- 标题区域 -->
     <view class="history-title">
         <text>搜索历史</text>
         <uni-icons type="trash" size="17" @click="clean"></uni-icons>
       </view>
     <!-- 列表区域 -->
      <view class="history-list">
         <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
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
        searchResults:[], //服务器返回搜索结果列表
        historyList:[] //搜索关键词的历史记录
			};
		},
    onLoad(){
      // 页面一加载的时候从本地存储获取历史搜索记录
      // 如果有历史数据则会经过JSON.parse，如果没有历史数据组返回空数组
     this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
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
        this.saveSearchHistory()
      },
      // 点击搜索item进入商品详情页面
      gotoDetail(goods_id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        
        // 1.将存储的历史记录的数组转化为Set方法对象
        const set=new Set(this.historyList)
        // 2.调用set的delete方法，移除对应的元素
        set.delete(this.kw)
        // 3.调用set的add方法，添加元素 （第二步和第三步的作用是如果新增的搜索记录和之前的相同话，可以将之前的搜索记录删除，将新的搜索记录重新添加到首位）
        set.add(this.kw)
        // 4.将set对象转化为数组
        this.historyList=Array.from(set)
        // 调用uni.setStorageSync(key, value) ，将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 点击清空按钮，清空搜索历史
      clean(){
          // 清空 data 中保存的搜索历史
          this.historyList = []
          // 清空本地存储中记录的搜索历史
          uni.setStorageSync('kw', '[]')
      },
      // 点击搜索历史的tag标签进入对应的商品列表
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+ kw
        })
      }
    },
    computed:{
      histories(){
       return [...this.historyList].reverse()
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
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
