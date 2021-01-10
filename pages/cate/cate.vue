<template>
<view >
  <!-- 顶部搜索区域 -->
  <my-search @click="gotoSearch"></my-search>
  <view class="scroll-view-container">
    <!-- 左侧的滚动视图布局 -->
    <scroll-view class="left-scroll-view" scroll-y :style="{height:wh +'px'}"> 
            <block v-for="(item, i) in cateList" :key="i">
              <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
              {{item.cat_name}}
              </view>
            </block>
    </scroll-view>
    <!-- 右侧的滚动视图布局 -->
    <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
              <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
                <!-- 二级分类 -->
                <view class="cate-lv2-title"> /  {{item2.cat_name}} /</view>
                <!-- 当前二级分类下的三级分类列表 -->
                <view class="cate-lv3-list">
                  <!-- 三级分类的item项 -->
                  <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                    <!-- 三级分类的图片 -->
                    <image :src="item3.cat_icon" ></image>
                    <!-- 三级分类的文本 -->
                    <text>{{item3.cat_name}}</text>
                  </view>
                </view>
              </view>
    </scroll-view>
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
				wh:0, //不同设备上的屏幕可视高度
        cateList:[], //一级分类数据列表
        active:0, //当前选中项的索引，默认让第一项被选中
        cateLevel2:[], //二级分类的列表
        scrollTop:0 //右侧滚动条距离屏幕顶部的距离,像素为单位
			};
		},
    onLoad(){
      // 调用uni的api获取设备信息
      const sysInfo=uni.getSystemInfoSync()
        // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh=sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods:{
     async getCateList(){
      const{data:res} = await uni.$http.get('/api/public/v1/categories')
      if(res.meta.status!==200) return uni.$showMsg()
      this.cateList=res.message  //获取的是一级分类，里面包含了二级分类和三级分类
      
      // 此处获取的二级分类无法做到响应式（根据一级列表的变化而变化）  
      this.cateLevel2=res.message[0].children   //此项不能删除,因为一旦删除,则第一次打开页面的时候没有办法显示右侧菜单 
      },
       // 选中项改变的事件处理函数
        activeChanged(i) {
          this.active = i
          
          // 当选中项发生改变之后，需要为右侧的二级分类重新赋值
        this.cateLevel2 =this.cateList[i].children
        
        // 每次切换左侧一级菜单列表的时候自动将右侧滚动条置顶
        this.scrollTop=this.scrollTop===0 ? 1 :0
        // 可以简化为如下的代码：
          // this.scrollTop = this.scrollTop ? 0 : 1
        },
        // 点击三级商品菜单进入商品列表页面
        gotoGoodsList(item){
              uni.navigateTo({
                url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
              })
        },
        // 点击跳转搜索页面,功能直接在my-search组件内通过searchBoxHandler函数实现
        // gotoSearch(){
        //   uni.navigateTo({
        //     url:'/subpkg/search/search'
        //   })
        // }
    }
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
