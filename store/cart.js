export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    // 1.定义addToCart添加购物车方法，形参内state代表模块内的state数据，goods代表外界传递过来的商品数据
    addToCart(state,goods){
      // 2.使用find方法，寻找当前购物车内的商品id和后续添加的商品id是否相等
      // 如find寻找到对应条件，则findResult返回结果为是寻找到的商品对象/数组，说未找到则findResult返回undefined
     const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
     // 3.1 如果不相等，则证明需要添加的商品不在购物车内，需要添加到购物车
     if(!findResult) {
       state.cart.push(goods)
     }else{
       // 3.2 如果相等，则证明需要添加的商品已存在购物车，只需要将购物车内的商品数量加1即可
       findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
       uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品选中状态
    updataGoodsState(state,goods){
      // 用购物车内已有的商品id和页面中发生状态改变的商品id进行比较
     const findResult = state.cart.find(x=>x.goods_id ===goods.goods_id)
     // 如果传递过来的商品id和购物车内已有的商品id相等，则将最新的商品勾选状态赋值给组件中存储的商品勾选状态
      if(findResult){
        findResult.goods_state=goods.goods_state
        // 调用uni的本地存储的api
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车内的商品数量
    undataGoodsCount(state,goods){
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count=goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 实现左滑动删除商品的功能
    removeGoodsByid(state,goods){
     state.cart = state.cart.filter(x=>x.goods_id !== goods.goods_id)
     this.commit('m_cart/saveToStorage')
    }
  },

  // 模块的 getters 属性
  getters: {
    // 统计购物车内的商品总数量
    total(state){
      let c = 0
      state.cart.forEach(goods=> c += goods.goods_count)
      return c
    }
  },
}