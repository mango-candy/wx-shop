<template>
	<view>
		<view class="goods-list">
      <!-- block标签包裹循环的好处是，block标签的渲染的时候不会被渲染为实际元素 -->
      <block v-for="(goods,i) in goodsList" :key="i"> 
      <!-- 商品item项 -->
        <my-goods :goods="goods"></my-goods>
      </block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{ //需要向服务器发送过去的参数
          query:'', //查询关键词
          cid:'',  //商品分类ID
          pagenum:1, //页码值
          pagesize:10 //每页显示多少条数据
        },
        goodsList:[], //商品列表的详细数据  需要向服务器获取的
        total:0, //总商品条数 需要向服务器获取的
        isloading:false // 上拉加载数据的节流阀
			}
		},
   onLoad(options){
     // 因为有三个方法进入商品列表页面，传入options的值可能是query也可能是cid
     // 如果两个参数只有一个有值，需要用||方法不然页面会报错
     this.queryObj.query = options.query || ''  //将页面内的数据传递到data里的queryObj中为后续向服务器获取数据做准备
     this.queryObj.cid = options.cid || ''
     this.getGoodsList() //获取
   },
   methods:{
     // 向服务器获取商品列表数据
    async getGoodsList(cb){
      // 请求开始前设置开启节流阀
      this.isloading=true
     const{data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
     // 请求结束后关闭节流阀
     this.isloading=false
     // 请求结束调用回调函数，终止下拉刷新  形参cb代表的是uni里的stopPullDownRefresh方法
     cb && cb()
     if(res.meta.status!==200) return uni.$showMsg()
     // 向服务器获取参数
     this.goodsList=[...this.goodsList,...res.message.goods]
     this.total=res.message.total
     }
   },
   // 上拉加载更多
   onReachBottom(){
     // 若页码值于页码内数据量的积大于中数据量则停止加载下一页
     if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据已全部加载完毕')
     // 如果节流阀当前是开启状态表示当前已有需求在加载中，终端新的请求
     if(this.isloading=true) return
         this.queryObj.pagenum +1
         this.getGoodsList()
   },
   // 下拉刷新
   onPullDownRefresh() {
     // 1. 重置关键数据
     this.queryObj.pagenum = 1
     this.total = 0
     this.isloading = false
     this.goodsList = []
   
     // 2. 重新发起请求 ，下拉的时候传入uni的stopPullDownRefresh方法结束下拉刷新，避免重复刷新
     this.getGoodsList(() => uni.stopPullDownRefresh())
   }
	}
</script>

<style lang="scss">

</style>
