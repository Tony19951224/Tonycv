<template>
    <div id="detailed">
        <div class="content">
            <div class="pre">
                <a href="#/hot">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <span>电影介绍</span>
            </div>
            <div class="content-top">

                <figure>
                    <img :src="film.url" alt="">
                </figure>
                <div class="content-body">

                    <h3>{{film.filmname}} </h3>
                    <p>{{film.ename}}</p>
                    <p>{{film.type}}</p>
                    <p>{{film.country}}</p>

                    <div class="btn">
                        <button @click="buy" :name="film._id">
                            <i class="fa fa-heart">购票</i>
                        </button>
                        <span>
                            <i class="fa fa-google-plus-official"></i> {{film.record}}亿票房</span>
                    </div>
                </div>
            </div>
            <div class="content-btm">
                <h3>
                    <span></span> 剧情简介</h3>

                <article>
                    {{film.abstract}}

                </article>

            </div>

        </div>

        <div class="pl">
            <button @click="comment" id="co">评论一番</button>
            <button @click="see" :name="film._id" v-if="(play)" class="see">查看评论</button>
            <button @click="see" v-else class="see">收起评论</button>
            <p>共有 : <b>{{nums}}</b> 条评论</p>


            <popup v-model="show" height="270px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <x-textarea v-model="com" :height="60" :max="200" name="description" placeholder="我的影评 .."></x-textarea>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button @click.native="submitForm($event)" type="primary" :name="film._id">评论</x-button>
                        <x-button @click.native="show = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>

        <div class="comment">

            <ul v-if="display">

                <li v-for="reply in replys">

                    <div class="comment-left">

                        <a href="">
                            <img :src="reply.commenter.avatar" alt="">
                        </a>
                    </div>
                    <div class="comment-right">
                        
                        <b>{{reply.commenter.username}}</b>
                        <p>
                            {{reply.content}}
                           
                            <span>{{ reply.create_time }}</span>
                        </p>
                    </div>
                   <a href="" class="remove" @click="remove" 
                   :name="reply.last_reply_time"  v-show="(id == reply.commenter._id)"  >
                  
                   <i class="fa fa-trash"></i></a>  
                </li>

            </ul>

        </div>


    </div>
</template>
<script> 
    import { XTextarea, Popup, Group, XButton } from 'vux'
    export default {
        data: function () {
            return {
                film: '',
                user: '',
                show: false,
                replys: '',
                user: '',
                com: '',
                display: false,
                play: true,
                nums:0,
                id:'',

            }
        },
        components: {
            XTextarea,
            Group,
            Popup,
            Group,
            XButton
        },
        methods: {
            buy: function (ev) {
                ev.preventDefault();
                // console.log(this.user);
                var i = ev.currentTarget.name;
                // console.log(i)
                this.$axios.post('/aaa/buy', { i: i }).then((result) => {
                    // console.log(result);
                    // console.log('点击了')
                    if (result.data.error == 1) {
                        alert(result.data.message);
                    } else {
                        location.href = '#/car'

                    }

                }).catch((err) => {
                    console.log(err);
                })
            },
            comment: function (ev) {
                ev.preventDefault();
                this.show = true;
            },
            submitForm: function (ev) {
                ev.preventDefault();
                var text = this.com;
                var i = ev.currentTarget.name;

                this.$axios.post('/aaa/comment', { text: text, i: i }).then((result) => {

                    if (result.data.error == 0) {
                        alert(result.data.message);
                        location.reload();
                    } else {
                        alert(result.data.message);
                    }

                }).catch((err) => {
                    console.log(err);
                })
            },
            see: function (ev) {
                // console.log(ev.currentTarget.name);

                var i = ev.currentTarget.name;
                const moment = require('moment');
                moment.locale('zh-cn');
                this.$axios.post('/aaa/pinglun', { i: i }).then((result) => {
                    if (this.play == true) {
                        this.play = false;
                        this.display = true;
                    }
                    else if (this.play == false) {

                        this.play = true;
                        this.display = false;
                    }


                    if (result.data.coms.length != 0) {
                        result.data.coms.forEach(function (element) {
                            element.create_time = moment(element.create_time).fromNow();

                        });
                        this.replys = result.data.coms;
                    
                    }  
 
                    //  if(result.data.error == 1 ){
                    //     alert(result.data.message);
                    // }
                })
            },
            remove:function(ev){
                ev.preventDefault();
                //  console.log(this.id);
                    
                var idd = ev.currentTarget.name;
                   this.$axios.post('/aaa/remove', { idd: idd }).then((result) => {
                // console.log(result.data);
                if (result.data.error == 0) {
                   
                alert(result.data.message);
                         
                }else{
                     alert(result.data.message);
                }
            }).catch((err) => {
                console.log(err);
            })
            }
        },
        mounted: function () {

            // console.log(this.$route)
            var idd = this.$route.params;
            // console.log(idd);
            this.$axios.post('/aaa/detailed', { idd: idd }).then((result) => {
                // console.log(result.data);
                if (result.data.error == 0) {
                    this.film = result.data.films;
                      this.nums = result.data.coms.length;
                         
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        created: function () {

            this.$axios.get('/aaa/session').then((result) => {
                // console.log(result.data.message)
                //   console.log(result.data.session)
                if (result.data.error == 0) {
                    this.user = result.data.session.username;
                    this.id = result.data.session._id;
                  
                    
                }
            }).catch((err) => {
                console.log(err);
            })

        },
    }
</script>

<style scoped>
#detailed {
  width: 360px;
  overflow: hidden;
}
#detailed .content .pre {
  line-height: 40px;
}

#detailed .content .pre a i {
  font-size: 20px;
  color: orangered;
  margin-left: 5px;
}

#detailed .content {
  width: 100%;
}

#detailed .content .content-top {
  overflow: hidden;
  padding-top: 10px;
  background: linear-gradient(right, #409eff, #fa5555);
  color: white;
}

#detailed .content .content-top figure {
  float: left;
  width: 40%;
  margin: 10px 10px 0;
}

#detailed .content .content-top figure img {
  width: 100%;
}

#detailed .content .content-top .content-body {
  float: left;
  margin-top: 30px;
  width: 50%;
}

#detailed .content .content-top .content-body p {
  padding: 2px 0;
  font-size: 12px;
}

#detailed .content .content-top .content-body .btn {
  margin-top: 20px;
  width: 100%;
}

#detailed .content .content-top .content-body .btn button {
  padding: 4px 10px;
  color: orangered;
  margin-right: 5px;
  border: none;
  border-radius: 6px;
}

#detailed .content .content-btm {
  width: 95%;
  margin: 20px auto 0;
}

#detailed .content .content-btm h3 span {
  width: 10px;
  border-left: 5px solid orangered;
  padding-right: 10px;
}

#detailed .content .content-btm article {
  font-size: 13px;
}

#detailed #co {
  width: 120px;
  background: #409eff;
  padding: 5px;
  border-radius: 5px;
  border: none;
  color: #e6ebf5;
  margin: 20px 30px 0;
  transition: all 0.3s;
}

#detailed #co:hover {
  background: #eb9e05;
}
#detailed .pl {
  padding-bottom: 60px;
}
#detailed .pl p {
  position: relative;
  left: 220px;
  font-size: 12px;
  color: #2d2f33;
}

#detailed .pl p b {
  color: orangered;
}

#detailed .pl .see {
  width: 120px;
  background: #67c23a;
  padding: 5px;
  border-radius: 5px;
  border: none;
  color: #edf2fc;
  margin: 20px 20px 0;
  transition: all 0.3s;
}

#detailed .pl .see:hover {
  background: #fa5555;
}

#detailed .comment {
  height: 80%;
}

#detailed .comment ul {
  padding-bottom: 80px;
  margin-top: 20px;
}

#detailed .comment ul li {
  overflow: hidden;
  border-top: solid 1px #e0e0e0;

  padding: 10px 0 10px 20px;
}

#detailed .comment ul li .comment-left {
  float: left;
  width: 20%;
}

#detailed .comment ul li a {
  display: block;
  width: 50px;
  height: 50px;
}
#detailed .comment ul li .remove {
  display: inline;
  font-size: 12px;
  position: relative;
  top: -5px;
  left: -10px;
  color: #bebebe;
}
#detailed .comment ul li .remove:hover {
  color: orangered;
}
#detailed .comment ul li .comment-left a img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

#detailed .comment ul li .comment-right {
  float: left;
  /* margin-left: 15px; */
  width: 70%;
}

#detailed .comment ul li .comment-right p {
  overflow: hidden;
  font-size: 12px;
}

#detailed .comment ul li .comment-right p span {
  float: right;
  font-size: 10px;
}
</style>