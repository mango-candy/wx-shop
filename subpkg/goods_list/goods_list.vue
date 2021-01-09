<template>
	<view>
		<view class="goods-list">
      <!-- block标签包裹循环的好处是，block标签的渲染的时候不会被渲染为实际元素 -->
      <block v-for="(goods,i) in goodsList" :key="i"> 
      <!-- 商品item项 -->
        <view class="goods-item">
          <!-- 左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧文本区域 -->
          <view class="goods-item-right">
            <!-- 商品名称 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <!-- 商品价格 之所以用view多包一层是为了以后添加其他内容做准备 -->
            <view class="goods-info-box">
              <view class="goods-price">￥{{goods.goods_price}}</view>
            </view>
          </view>
        </view>
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
         // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
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
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
