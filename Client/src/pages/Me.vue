<template>
    <div id="me">
        <div class="top">
            <blur :blur-amount=10 :url="url">
                <p class="center">
                    <img :src="url">
                </p>
                <div class="yonghu">

                    <a href="" @click="move" v-if="(!user)">还没有登录?!</a>
                    <span v-else class="mingzi">你好!
                        <b>{{uname}}</b>
                        <a @click="logout">退出</a>
                    </span>

                </div>


            </blur>
            <flexbox :gutter="0">
                <flexbox-item v-for="(img, index) in images" :key="index">
                    <img :src="img" style="width:100%" @click="url = img" />
                </flexbox-item>
            </flexbox>
        </div>


        <x-button @click.native="submitForm($event)" type="primary">修改头像</x-button>
        <div>
            <ul v-for="user in users">
                <li>评论数: {{user.comment_num}}条</li>
                <li>用户积分 : {{user.score}}</li>
            </ul>
        </div>

        <button @click="xianshi" class="xianshi">我购买的票</button>
        <x-table :cell-bordered="false" style="background-color:#fff;" v-show="show3">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="film in films">
                    <td>{{film.filmname}}</td>
                    <td>{{film.cost}}</td>
                    <td> x {{film.amount}}</td>
                </tr>

            </tbody>
        </x-table>




        <div class="info">
            <a href="" @click="off" class="guan">
                <i class="fa fa-times-circle"></i>
            </a>
            <form action="">
                <div>
                    账号 :
                    <input type="text" v-model="username">
                    <br>
                    <br> 密码 :
                    <input type="password" v-model="password">
                    <br>
                    <button class="deng" @click="login">登录</button>

                    <p>没有账号? 点击
                        <a href="#/register" class="zhu">注册</a>
                    </p>

                </div>
            </form>
        </div>
        <alert v-model="err4" :title="('Error')" class="alert">账号/密码不能为空!</alert>
        <alert v-model="err1" :title="('Error')">账号/密码长度需大于4位!</alert>
        <alert v-model="err2" :title="('Error')">用户名不存在,请注册!</alert>
        <alert v-model="err3" :title="('Error')">密码错误,请重新输入 </alert>
        <alert v-model="show1" :title="('Success!')">登陆成功! 正在跳转 .. </alert>
        <alert v-model="show2" :title="('Success!')">退出成功! 正在跳转 .. </alert>
    </div>
</template>

<script>

    import { Flexbox, FlexboxItem, Blur, Alert, Rater, Cell, XButton, XTable } from 'vux';

    export default {

        components: {
            Blur,
            Flexbox,
            FlexboxItem,
            Alert,
            Rater,
            XButton,
            Cell,
            XTable,

        },

        data() {
            return {
                images: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221890556&di=a1d8daee65a5f8c8eafccef9b06191c8&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160713%2F6a80e5df2a9e4252a6f28a0943f63d7f_th.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3098891403,1943866363&fm=27&gp=0.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510814095&di=af161ad144727e9101d3b9d5b5238bbe&imgtype=jpg&er=1&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1212%2F27%2F3129845_22.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510222121929&di=383f84a62d81ac2cdc78bd5a078a0ece&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170716%2Fd9aac525a30842b8ae0d2f4d882a216b.gif',


                ],
                url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',

                username: '',
                password: '',
                show1: false,
                show2: false,
                err1: false,
                err2: false,
                err3: false,
                err4: false,
                // isLogin: false,
                uname: '',
                user: '',
                data5: 3,
                userID: '',
                users: '',
                show3: false,
                films: '',
            }
        },

        methods: {
            xianshi: function (ev) {
                ev.preventDefault();
                if(this.user){
                       if (this.show3 == false) {
                    this.show3 = true;
                } else {
                    this.show3 = false;
                }
                }else{
                    alert('登录后才可查看!')
                }
             
                this.$axios.post('/aaa/xianshi', { id: this.userID }).then((result) => {
                    // console.log(result.data.films)
                    this.films = result.data.films;
                }).catch((err) => {
                    console.log(err);
                })


            },
            move: function (ev) {
                ev.preventDefault();
                $(ev.target).parents('#me').find('.info').css('display', 'block');
            },
            off: function (ev) {
                ev.preventDefault();
                $(ev.target).parents('.info').css('display', 'none');
            },
            login: function (ev) {
                ev.preventDefault();
                // console.log(this.username);
                // console.log(this.password);
                if ((this.username && this.password) == '') {
                    this.err4 = true;
                } else if ((this.username.length && this.password.length) < 4) {
                    this.err1 = true;
                }
                else {
                    this.$axios.post('/aaa/login', {
                        username: this.username,
                        password: this.password
                    }).then((result) => {
                        // console.log(result);
                        if (result.data.error == 1) {
                            return this.err3 = true;

                        } if (result.data.error == 2) {
                            return this.err2 = true;
                        }
                        this.show1 = true;

                        setTimeout(function () {
                            location.reload();
                        }, 1200);

                        $('.info').css('display', 'none');


                    }).catch((err) => {
                        console.log(err);
                    })
                }


            },
            logout: function (ev) {
                ev.preventDefault();
                this.$axios.get('/aaa/logout').then((result) => {
                    // this.isLogin = false;
                    this.url = 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg';

                    // console.log(result);
                    if (result.data.error == 0) {
                        this.show2 = true;

                    }
                    setTimeout(function () {
                        location.reload();
                    }, 1200);
                }).catch((err) => {
                    console.log(err);
                })

            },
            submitForm: function (ev) {
                var url = this.url;
                // console.log(this.userID)
                this.$axios.post('/aaa/revise', { url: url, id: this.userID }).then((result) => {
                    console.log(result.data)
                    if (result.data.error == 0) {
                        alert(result.data.message);
                        this.url = result.data.user.avatar;
                        this.users = result.data.user;
                        location.reload();
                    } else {
                        alert(result.data.message);
                    }

                }).catch((err) => {
                    console.log(err);
                })

            }
        },

        mounted: function () {

            this.$axios.get('/aaa/session').then((result) => {
                // console.log(result.data.session)
                if (result.data.error == 0) {
                    this.userID = result.data.session._id;
                    this.uname = result.data.session.username;
                    this.user = result.data.session;
                    this.url = result.data.session.avatar;
                }
            }).catch((err) => {
                console.log(err);
            })
        }


    }
</script>

<style scoped>
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}

.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
#me .xianshi {
  border-width: 0;
  margin-top: 10px;
  width: 100%;
  background: #1aad19;
  font-size: 18px;
  color: #ffffff;
  border-radius: 5px;
  line-height: 2.333;
}
#me .top .yonghu {
  text-align: center;
}

#me .top .yonghu a {
  color: white;
  width: 30%;
  padding: 5px 10px;
  border-radius: 5px;
  background: orangered;
}

#me .top .yonghu .mingzi b {
  color: orangered;
}

#me .info {
  position: absolute;
  left: 30px;
  top: 100px;
  display: none;
}

#me .info form div {
  width: 300px;
  margin: 0 auto;
  /* background: #e0e0e0; */
  background: linear-gradient(right, yellowgreen, #46a3ff);
  text-align: center;
  color: black;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 5px;
}

#me .info form div input {
  border: none;
  border-bottom: 1px solid #000;
  /* background: #e0e0e0; */
  background: no-repeat;

  text-align: center;
}

#me .info form div .deng {
  padding: 5px 0;
  width: 100px;

  background: #008dff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
}

#me .info form div .deng:hover {
  background: #84c1ff;
  color: white;
}

#me .info form div p .zhu {
  color: orangered;
  margin-left: 5px;
}

#me .info .guan {
  color: white;
}
</style>