<template>
<view >
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
    <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
              <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
                <view class="cate-lv2-title"> /  {{item2.cat_name}} /</view>
              </view>
    </scroll-view>
  </view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0, //不同设备上的屏幕可视高度
        cateList:[], //一级分类数据列表
        active:0, //当前选中项的索引，默认让第一项被选中
        cateLevel2:[] //二级分类的列表
			};
		},
    onLoad(){
      // 调用uni的api获取设备信息
      const sysInfo=uni.getSystemInfoSync()
      this.wh=sysInfo.windowHeight
      this.getCateList()
    },
    methods:{
     async getCateList(){
      const{data:res} = await uni.$http.get('/api/public/v1/categories')
      if(res.meta.status!==200) return uni.$showMsg()
      this.cateList=res.message  //获取的是一级分类，里面包含了二级分类和三级分类
      
      // 此处获取的二级分类无法做到响应式（根据一级列表的变化而变化）
      // this.cateLevel2=res.message[0].children
      },
       // 选中项改变的事件处理函数
        activeChanged(i) {
          this.active = i
          
          // 当选中项发生改变之后，需要为右侧的二级分类重新赋值
        this.cateLevel2 =this.cateList[i].children
        }
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
</style>
