<template>
    <div id="hot">

        <h3>正在热映</h3>
        <ul class="paixu">
            <input class="search" type="text" placeholder="找你喜欢的电影" v-model="enterText" @keyup.enter="onEnter">
            <li>
                <a href="" @click="record">按票房排序</a>
            </li>
            <li>
                <a href="" @click="score">按评分排序</a>
            </li>
        </ul>

        <div class="content">
            <ul>
                <li v-for="film in films">

                    <a :href="'#/detailed/' + film._id" :name="film._id">
                        <figure>
                            <img :src="film.url" alt="">
                            <p class="names">{{film.filmname}}</p>
                            <p class="record">{{film.record}}亿</p>
                            <p class="score">{{film.score}}</p>
                        </figure>
                    </a>
                </li>

            </ul>

        </div>
    </div>
</template>

<script>

    export default {
        methods: {

            // xiangxi:function(ev){
            //     // console.log(ev.currentTarget.name);
            //     var ids =  ev.currentTarget.name;
            //     this.$axios.post('/aaa/detailed',{ids:ids}).then((result)=>{
            //         console.log(result);
            //     }).catch((err)=>{
            //         console.log(err);
            //     })
            // }
            record: function (ev) {
                ev.preventDefault();
                $(ev.currentTarget).addClass('active').parent().siblings().children().removeClass('active');

                this.$axios.post('/aaa/record').then((result) => {
                    // console.log(result.data)
                    if (result.data.error == 0) {
                        this.films = result.data.film;
                    }
                }).catch((err) => {
                    console.log(err);
                })

            },
            score: function (ev) {
                ev.preventDefault();
                $(ev.currentTarget).addClass('active').parent().siblings().children().removeClass('active');
                this.$axios.post('/aaa/score').then((result) => {
                    // console.log(result.data)
                    if (result.data.error == 0) {
                        this.films = result.data.film;
                    }
                }).catch((err) => {
                    console.log(err);
                })

            },
            onEnter: function (val) {
                // console.log('123')
                // console.log(this.enterText);
                this.$axios.post('/aaa/search', { search: this.enterText }).then((result) => {
                    if (result.data.error == 0) {

                        this.films = result.data.film;
                        //  console.log(that.articles[13])
                    }
                }).catch((err) => {
                    console.log(err);
                })

            },
        },
        data() {
            return {
                films: '',
                user: '',
                enterText: '',

            }
        },
        mounted: function () {
            var that = this;
            this.$axios.get('/aaa/show').then((result) => {
                // console.log(result.data)
                if (result.data.error == 0) {
                    this.films = result.data.film;
                    // console.log(this.films)
                }

            }).catch((err) => {
                console.log(err);
            })
            var num = 0;
            $(document).on("scroll", window, function () {
                var height = $(this).height();
                var screenHeight = $(window).height();
                var scrollTop = $(window).scrollTop();

                // console.log(height)
                // console.log(screenHeight)
                // console.log(scrollTop)
                if (scrollTop + screenHeight > height - 2) {
                    num += 1;

                    that.$axios.get('/aaa/show?page=' + num).then((result) => {
                        // console.log(result.data);

                        result.data.film.forEach((element) => {
                            
                            that.films.push(element);
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })



        },


        // created: function () {

        //     this.$axios.get('/aaa/session').then((result) => {
        //         // console.log(result.data.message)
        //         if (result.data.error == 0) {
        //             this.user = result.data.session;
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // }


    }

</script>

<style scoped>
#hot ul {
  list-style: none;
}

#hot h3 {
  width: 100%;
  text-align: center;
  background: orangered;
  padding: 5px 0;
  color: white;
}

#hot .paixu {
  padding: 5px 0;
  overflow: hidden;
  margin-right: 15px;
}

#hot .paixu .search {
  margin-left: 10px;
}

#hot .paixu li {
  float: right;
  margin-left: 20px;
  font-size: 13px;
}

#hot .paixu li a {
  color: #adadad;
}

#hot .paixu li .active {
  color: orangered;
}

#hot .content ul {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  padding-bottom: 50px;
}

#hot .content ul li {
  float: left;
  text-align: center;
  margin: 10px 0;
  margin-right: 15px;
  width: 45%;
}

#hot .content ul li .record {
  color: #bebebe;
}

#hot .content ul li .score {
  color: orangered;
}
</style>