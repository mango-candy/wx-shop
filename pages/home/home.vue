<template>
  <view>
    <!-- 顶部搜索区域 -->
    <view class="search-box">
          <my-search ></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 导航列表区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层区域渲染 、楼层容器-->
    <view class="floor-list">
      <!-- 每一层的楼层item -->
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
            <!-- 左侧大图片盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧小图片盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !==0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}" ></image>
            </navigator>
          </view>
        </view>
      </view> 
    </view>
  </view>
</template>

<script>
  // 按需导入 badgeMix(底部tag栏徽标) 这个辅助方法
  import badgeMix from '@/mixins/tabbar-badge.js' 
  
	export default {
    mixins:[badgeMix], //引用badgeMix(底部tag栏徽标)这个方法
    data() {
      return {
        swiperList: [] ,//轮播图数据
        navList:[], //分类导航
        floorList:[] //楼层列表
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        else
          this.swiperList = res.message
        uni.$showMsg('数据请求成功！')
      },
      // 获取分类导航数据
     async getNavList(){
      const{data:res} = await uni.$http.get('/api/public/v1/home/catitems')
      if(res.meta.status!==200 ) return uni.$showMsg()
      this.navList=res.message
      },
      // 点击分类项切换页面
      navClickHandler(item){
        if(item.name==="分类") {
          uni.switchTab({ url:'/pages/cate/cate'})
        }
      },
      // 获取楼层列表数据
       async getFloorList(){
        const{data:res}=await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status!==200) return uni.$showMsg()
        
        // 通过双层forEach循环，处理url地址
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
          })
        })
        
        this.floorList=res.message
      }
    }
  }
</script>

<style lang="scss">
  .search-box{
     // 设置定位效果为“吸顶”
      position: sticky;
      // 吸顶的“位置”
      top: 0;
      // 提高层级，防止被轮播图覆盖
      z-index: 999;
  }
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
  .nav-list{
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img{
      width: 128rpx;
       height: 140rpx;
    }
  }
  .floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor-img-box{
  display: flex;
  margin: 8rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
