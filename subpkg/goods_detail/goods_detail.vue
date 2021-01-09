<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
		    <image :src="item.pics_big"></image>
		  </swiper-item>
      </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 商品详情对象
				goods_info:{}
			};
		},
    onLoad(options){
      // 获取跳转页面传递过来的商品id
      const goods_id= options.goods_id
      // 将跳转页面传递过来的商品id发送给服务器
      this.getGoodsDetail(goods_id)
    },
    methods:{
      async getGoodsDetail(goods_id){
        const{data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(res.meta.status!==200) return uni.$showMsg()
        this.goods_info=res.message
       }   
    },

	}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
