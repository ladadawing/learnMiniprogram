// components/Tabs.js
Component({
  properties: {
    tabs: {
      type: Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    handleItemTap(e) { 
      console.log(e)
      const {index} = e.currentTarget.dataset
      //子组件向父组件传值
      this.triggerEvent('handleChange',{index})
    }
  }
})
