<template>
    <div id="car">


        <div class="pre">
            <a href="#/hot">
                <i class="fa fa-arrow-left"></i>返回
            </a>
            <span>我的影票</span>



            <small class="clears">
                <a href="" @click="clears">清空</a>
            </small>
            <span class="all">
                <a href="" @click="all" v-if="xuan">全选</a>
                <a href="" @click="all" v-else>全不选</a>
            </span>
        </div>
        <div class="content">
            <ul>
                <li v-for="film in films">
                    <div class="content-left">
                        <figure>
                            <img :src="film.url" alt="">
                        </figure>
                    </div>
                    <div class="content-right">
                        <h4>{{film.filmname}}</h4>
                        <input type="checkbox" :name="film._id" @click="options" class="options">
                        <div class="content-wrap">
                            <b>¥ {{film.cost}}</b>
                            <div class="btm">
                                <button @click="minus" :name="film._id">-</button>
                                <span>
                                    {{film.amount}}
                                </span>
                                <button @click="add" :name="film._id">+</button>
                            </div>
                        </div>
                        <a href="" class="shanchu" @click="del" :name="film._id">
                            <i class="fa fa-trash"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="money">
            <p>总价 :
                <span>¥ {{sum}}</span>
            </p>

            <button @click="pay">去结算</button>

            <button @click="take">选座</button>

        </div>

    </div>
</template>
<script>

    export default {
        data() {
            return {
                show: false,
                user: '',
                films: '',
                m: '',
                xuan: true,
                arr: [],
                // num:1,
            }
        },
        components: {

        },

        mounted: function () {

            this.$axios.post('/aaa/car').then((result) => {
                // console.log(result.data)
                if (result.data.error == 0) {
                    this.films = result.data.film;
                } else {
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
        methods: {
            all: function (ev) {
                ev.preventDefault();
                var that = this;
                that.arr = [];
                if (that.xuan == true) {

                    $('.options').each(function () {
                   ;
                    $(this)[0].checked = true ;
                   
                    })

                    that.films.forEach(function (item) {
                        that.arr.push(item);
                    })
                 
                    that.xuan = false;
                } else {
                    $('.options').each(function () {
                    
                       $(this)[0].checked = false; 
                      
                    })
                    that.xuan = true;
                }

            },
            options: function (ev) {
                    
                // console.log(ev.currentTarget.name);
                if (ev.target.checked) {
                    //  console.log(ev.currentTarget.name)
                    this.films.forEach((item) => {
                        if (item._id == ev.currentTarget.name) {
                            //  console.log(item.amount)
                            this.arr.push(item);
                        }
                            
                    });

                } else {
                    this.arr.forEach((item, index) => {
                        if (item._id == ev.currentTarget.name) {

                            this.arr.splice(index, 1);

                        }
                    });
                }


            },
            minus: function (ev) {
                ev.preventDefault();
                var ids = ev.currentTarget.name;
                   this.arr.forEach((item, index) => {
                        if (item._id == ev.currentTarget.name) {
                            if(item.amount > 1){
                                   item.amount --;
                            }
                        }
                    });
                    this.arr = this.arr;
                // console.log(ids)
                this.$axios.post('/aaa/minus', { ids: ids }).then((result) => {
                    // console.log(result.data.films);
                    if (result.data.error == 0) {
                        this.films = result.data.films;
                    }
                    else {
                        alert(result.data.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            add: function (ev) {
                ev.preventDefault();
                 this.arr.forEach((item, index) => {
                        if (item._id == ev.currentTarget.name) {
                            if(item.amount < 5){
                                   item.amount ++;
                            }
                        }
                    });
                    this.arr = this.arr;

                
                var ids = ev.currentTarget.name;
                // console.log(ids)
                this.$axios.post('/aaa/add', { ids: ids }).then((result) => {
                    // console.log(result.data.films);
                    if (result.data.error == 0) {
                        this.films = result.data.films;
                    }
                    else {
                        alert(result.data.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })


            },
            del: function (ev) {
                ev.preventDefault();
                var ids = ev.currentTarget.name;
                // console.log(ids)
                this.$axios.post('/aaa/del', { ids: ids }).then((result) => {
                    // console.log(result.data.films);
                    if (result.data.error == 0) {
                        this.films = result.data.films;
                    }
                    else {
                        alert(result.data.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            take: function (ev) {
                ev.preventDefault();
                location.href = '#/seat'
            },
            pay: function (ev) {
                ev.preventDefault();
                if (this.films.length > 0) {
                    alert('您需要支付' + this.m + '元');
                    var r = confirm("您确认支付" + this.m + '元');
                    // var ids = ev.currentTarget.name;
                    if (this.show == false) {
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                    if (r == true) {
                        alert("支付成功!");
                        this.$axios.post('/aaa/pay', {arr : this.arr}).then((result) => {
                            if (result.data.error == 0) {
                                var films = result.data.films

                                location.reload();
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                    else {
                        alert("已取消!");
                    }
                } else {
                    alert('请先添加您想要的电影票吧 !')
                }

            },
            clears: function (ev) {
                ev.preventDefault();
                if (this.films.length > 0) {
                    var r = confirm("确认清空购物车么?");
                    if (r == true) {
                        alert("清除成功!");
                        this.$axios.post('/aaa/clears').then((result) => {
                            if (result.data.error == 0) {
                                var films = result.data.films
                                location.reload();
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                    else {
                        alert("已取消!");
                    }
                } else {
                    alert('购物车空荡荡的 .. ')
                }

            }
        },
        computed: {
            sum: function (ev) {
                var m = 0;
                for (var i = 0; i < this.arr.length; i++) {
                    m += this.arr[i].cost * this.arr[i].amount;
                    this.m = m;
                }
                return m;
            }
        }
    }
</script>

<style scoped>
#car .pre {
  line-height: 40px;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

#car .pre a {
  float: left;
  color: orangered;
}

#car .pre a i {
  margin-right: 5px;
  padding-left: 10px;
}

#car .pre .all {
  float: right;
  font-size: 14px;
  margin-right: 10px;
  width: 42px;
}

#car .pre .clears {
  float: right;
  margin-right: 10px;
}

#car .content {
  width: 100%;
  height: 100%;
  padding: 15px 0px 100px;
}

#car .content ul li {
  width: 100%;
  overflow: hidden;
  background: #f0f0f0;
  padding: 5px 0;
  margin-bottom: 5px;
}

#car .content ul li .active {
  border: solid 1px #d0d0d0;
}

#car .content ul li .content-left {
  width: 30%;
  float: left;
}

#car .content ul li .content-left figure {
  width: 100%;
}

#car .content ul li .content-left figure img {
  width: 100%;
}

#car .content ul li .content-right {
  width: 65%;
  margin-top: 30px;
  float: right;
  position: relative;
}

#car .content ul li .content-right .options {
  position: absolute;
  right: 20px;
  top: 5px;
}

#car .content ul li .content-right .shanchu {
  position: relative;
  left: 200px;
  top: 10px;
  color: black;
  font-size: 11px;
}

#car .content ul li .content-right .shanchu:hover {
  color: orangered;
}

#car .content ul li .content-right .content-wrap {
  width: 90%;
  margin: 30px auto 0;
  overflow: hidden;
}

#car .content ul li .content-right .content-wrap b {
  float: left;
  color: orangered;
}

#car .content ul li .content-right .content-wrap .btm {
  float: right;
  width: 40%;
  margin-right: 10px;
}

#car .content ul li .content-right .content-wrap .btm button {
  width: 20px;
  height: 20px;
  border-radius: 50% 50%;
  color: white;
  border: none;
  background: orangered;
}

#car .content ul li .content-right .content-wrap .btm span {
  margin: 0 5px;
}

#car .money {
  width: 100%;
  position: fixed;
  bottom: 50px;
  line-height: 40px;
  overflow: hidden;
  border-top: 1px solid #e0e0e0;
  background: white;
}

#car .money p {
  float: left;
  margin-left: 10px;
}

#car .money p span {
  color: orangered;
}

#car .money button {
  float: right;
  margin-left: 10px;
  line-height: 38px;
  background: orangered;
  border: none;
  border-radius: 3px;
  width: 100px;
  color: white;
}
</style>