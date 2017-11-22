<template>
  <div id="Home">



    <router-view></router-view>



    <Tabbar style="position:fixed;bottom:0;width:100%">

      <TabbarItem selected link="/">
        <!-- <img src="static/index1.png" slot="icon"> -->
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">主页</span>
      </TabbarItem>


      <TabbarItem link="/hot" show-dot >
        <!-- <img src="static/index2.png" slot="icon"> -->

        <i slot="icon"   class="fa fa-free-code-camp"></i>
        <span slot="label">热映</span>
      </TabbarItem>


      <TabbarItem link="/car" :badge="num.toString()">
        <!-- <img src="static/index3.png" slot="icon"> -->
     
        <i slot="icon"  class="fa fa-money"></i>
        <span slot="label" >购物车</span>
      </TabbarItem>
      <!-- <TabbarItem show-dot link="/car">
                <img src="static/index4.png" slot="icon">
                <span slot="label">购物车</span>
              </TabbarItem> -->
      <TabbarItem   link="/me">
        <!-- <img src="static/index4.png" slot="icon"> -->
        <i slot="icon" class="fa fa-signal"></i>
        <span slot="label">我的</span>
      </TabbarItem>
    </Tabbar>



  </div>
</template>

<script>

  import { Badge, Tabbar, TabbarItem } from 'vux';

  export default {
    components: {
      // Badge,
      Tabbar,
      TabbarItem,
      // Cell,
      //  Top,
    },
    data() {
      return {
        user: '',
        num: '',
        // users: '',
      }
    },
    mounted: function () {


      this.$axios.post('/aaa/dot').then((result) => {
        // console.log(result.data)
        if (result.data.error == 0) {
        
        console.log(result.data.num)    
        this.num = result.data.num;
          // console.log(result.data.users)
          // this.users = result.data.users;
          //   console.log(this.users)
        }
        else {
          alert(result.data.message);
        }
      }).catch((err) => {
        console.log(err);
      })



    },
    created: function () {

      this.$axios.get('/aaa/session').then((result) => {
        // console.log(result.data.message)
        if (result.data.error == 0) {
          this.user = result.data.session.username;

        }
      }).catch((err) => {
        console.log(err);
      })

    },
    // computed: {
    //   total: function () {
    //     var m = 0;
    //     for (var i = 0; i < this.users.length; i++) {
    //       m += this.users[i].amount;
    //     }
    //      console.log(m)
    //     return m.toString();
    //   }
    // }
  }
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>