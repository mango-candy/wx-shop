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
        total:0 //总商品条数 需要向服务器获取的
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
    async getGoodsList(){
     const{data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
     if(res.meta.status!==200) return uni.$showMsg()
     // 向服务器获取参数
     this.goodsList=res.message.goods
     this.total=res.message.total
     }
   }
	}
</script>

<style lang="scss">

</style>
