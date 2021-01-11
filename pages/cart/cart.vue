<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
         <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
              <my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
         </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    
  </view>
</template>

<script>
  // 按需导入 badgeMix(底部tag栏徽标) 这个辅助方法
  import badgeMix from '@/mixins/tabbar-badge.js' 
  import {mapState, mapMutations} from 'vuex'
  
	export default {
    mixins:[badgeMix], //引用badgeMix(底部tag栏徽标)这个方法
      
    computed: {
      ...mapState('m_cart',['cart'])
    },
    // 生命周期函数，在页面刚刷新出来的时候执行
    onShow(){},
		data() {
			return {
        options:[{
          text:'删除',
          style:{
            backgroundColor: '#C00000'
          }
        }]
      };
		},
    methods:{
      ...mapMutations('m_cart',['updataGoodsState','undataGoodsCount','removeGoodsByid']),
      // 商品勾选状态发生改变
      radioChangeHandler(e){
        // console.log(e) e里面包含了最新的商品id和商品勾选状态
        this.updataGoodsState(e)
      },
      // 购物车内商品数量发生变化
      numberChangeHandler(e){
        this.undataGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        this.removeGoodsByid(goods)
      }
    }
	}
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;
    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
