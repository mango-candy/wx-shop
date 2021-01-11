<template>
   <view class="goods-item">
          <!-- 左侧图片区域 -->
          <view class="goods-item-left">
            <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧文本区域 -->
          <view class="goods-item-right">
            <!-- 商品名称 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <!-- 商品价格 之所以用view多包一层是为了以后添加其他内容做准备 -->
            <view class="goods-info-box">
              <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
              <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
            </view>
          </view>
        </view>
</template>

<script>
	export default {
    props:{
      // 商品信息对象
       goods:{
         type:Object,
         default:{}
       }, 
       showRadio:{
         type:Boolean,
         default:false
       },
       showNum:{
         type:Boolean,
         default:false
       }
    },
		data() {
			return {
             // 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    // 过滤器
    filters:{
      tofixed(num){
        // 在自定义tofixed方法里调用Number（）将里面的值转为数字类型
        // 然后调用toFixed（2），表示保留2位小数
       return Number(num).toFixed(2)
      }
    },
    methods:{
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          // goods_count:val - 0
          goods_count:+val
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    .goods-info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
