<template>
    <div id="home">
 
      <header>
          <p>猫眼电影 - 郑州</p>
      </header>
 
        <div class="banner">
            <Swiper auto :list="baseList" v-model="demo01_index"></Swiper>
        </div>

        <div>
            <group>
                <cell>
                    <marquee>
                        <marquee-item v-for="i in 3" :key="i"> {{ films[i] }}</marquee-item>
                    </marquee>
                </cell>
            </group>
        </div>

        <div class="img">
            <ul>
                <li>
                    <div>
                        <img src="http://p1.meituan.net/movie/5d8ab833a6ffb29d945ebcd4965c72db702436.jpg@160w_220h_1e_1c" alt="">
                        <p>空天猎</p>
                    </div>

                </li>
                <li>
                    <div>
                        <img src="http://p0.meituan.net/movie/2d408512ec0089d455a01ded176b6ba32209792.jpg@160w_220h_1e_1c" alt="">
                        <p>胡杨的夏天</p>
                    </div>

                </li>
                <li>
                    <div>
                        <img src="http://p0.meituan.net/movie/5fa96b6dfef654fabab85e600cda14392032510.jpg@160w_220h_1e_1c" alt="">
                        <p>我的爸爸是森林之王</p>
                    </div>

                </li>
                <li>
                    <div>
                        <img src="http://p0.meituan.net/movie/385a6d22c2f1ed563aa58594d56cee39955568.jpg@160w_220h_1e_1c" alt="">
                        <p>天才枪手</p>
                    </div>

                </li>
            </ul>
        </div>



    </div>
</template>

<script>
  
    import { Swiper, GroupTitle, SwiperItem, XButton, Divider , Group, Cell, Marquee, MarqueeItem } from 'vux';
     

    const baseList = [
        {
            
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509691403746&di=44be3674d5d2ab52bde100f9a5f1e145&imgtype=0&src=http%3A%2F%2Ffiles.jb51.net%2Ffile_images%2Farticle%2F201509%2F2015091009500846.jpg",

        },
        {
           
            img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1219084285,3394693199&fm=27&gp=0.jpg"
        },
        {
            
            img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1736579343,2517659207&fm=27&gp=0.jpg",
        },
        {
            
            img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=388814563,1427035123&fm=27&gp=0.jpg",
        }
 




    ];
    const films = ['羞羞的铁拳', '王牌特工2', '缝纫机乐队', '追龙'];
   
    export default {
        methods: {

        },
        data() {
            return {
                baseList,
                demo01_index: 0,
                films,
            }
        },
        components: {
           
            Swiper,
            SwiperItem,
            GroupTitle,
            XButton,
            Divider,
            Marquee,
            MarqueeItem,
            Group,
            Cell,
            Divider,
          

        },

    }
</script>

<style scoped>
#Home header {
  width: 100%;
  background: linear-gradient(bottom right, #e0b163, #170e3d);
  text-align: center;
}
#Home header p {
  font-size: 20px;
  /* color: white; */
  color: #eb9e05;
  padding: 5px 0;
}
#home .banner .vux-slider > .vux-swiper {
  height: 280px;
}

#home .img ul {
  width: 96%;
  margin: 10px;
  overflow: hidden;
  padding-bottom: 60px;
}

#home .img ul li {
  float: left;
  width: 40%;
  margin-right: 30px;
  margin-top: 10px;
}

#home .img ul li div {
  text-align: center;
  font-size: 14px;
}
</style>