<template>

    <div class="container">

        <h2 class="title"> 猫眼电影 </h2>

        <div class="demo clearfix">

            <!---左边座位列表-->

            <div id="seat_area">

                <div class="front">屏幕</div>

            </div>

            <!---右边选座信息---->

            <div class="booking_area" v-for="film in films">
 
                <p>电影：
                    <span>{{film.filmname}}</span>
                </p>

                <p>时间：
                    <span>03月20日 22:15</span>
                </p>

                <p>座位：</p>

                <ul id="seats_chose"></ul>

                <p>票数：
                    <span id="tickects_num">0</span>
                </p>

                <p>总价：
                    <b>￥
                        <span id="total_price">0</span>
                    </b>
                </p>



                <input type="button" class="btn" value="确认" />



                <div id="legend"></div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
films:'',
            }
        },
        created: function () {
            var price =10; //电影票价
            $(document).ready(function () {

                var $cart = $('#seats_chose'), //座位区

                    $tickects_num = $('#tickects_num'), //票数

                    $total_price = $('#total_price'); //票价总额



                var sc = $('#seat_area').seatCharts({

                    map: [//座位结构图 a 代表座位; 下划线 "_" 代表过道

                        'cccccccccc',

                        // 'cccccccccc',

                        // '__________',

                        // 'cccccccccc',

                        // 'cccccccccc',

                        // 'cccccccccc',

                        // 'cccccccccc',

                        // 'cccccccccc',

                        // 'cccccccccc',

                        // 'cc__cc__cc'

                    ],

                    naming: {//设置行列等信息

                        top: false, //不显示顶部横坐标（行）

                        getLabel: function (character, row, column) { //返回座位信息 

                            return column;

                        }

                    },

                    legend: {//定义图例

                        node: $('#legend'),

                        items: [

                            ['c', 'available', '可选座'],

                            ['c', 'unavailable', '已售出']

                        ]

                    },

                    click: function () {

                        if (this.status() == 'available') { //若为可选座状态，添加座位

                            $('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')

                                .attr('id', 'cart-item-' + this.settings.id)

                                .data('seatId', this.settings.id)

                                .appendTo($cart);



                            $tickects_num.text(sc.find('selected').length + 1); //统计选票数量

                            $total_price.text(getTotalPrice(sc) + price);//计算票价总金额



                            return 'selected';

                        } else if (this.status() == 'selected') { //若为选中状态



                            $tickects_num.text(sc.find('selected').length - 1);//更新票数量

                            $total_price.text(getTotalPrice(sc) - price);//更新票价总金额

                            $('#cart-item-' + this.settings.id).remove();//删除已预订座位



                            return 'available';

                        } else if (this.status() == 'unavailable') { //若为已售出状态

                            return 'unavailable';

                        } else {

                            return this.style();

                        }

                    }

                });

                //设置已售出的座位

                sc.get(['1_3', '1_4', '4_4', '4_5', '4_6', '4_7', '4_8']).status('unavailable');



            });



            function getTotalPrice(sc) { //计算票价总额

                var total = 0;

                sc.find('selected').each(function () {

                    total += price;

                });

                return total;

            }

        },
        mounted: function(){
            
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

        }
    }




</script>


<style scoped>
a,
body,
center,
code,
dd,
div,
dl,
dt,
em,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
i,
img,
label,
li,
ol,
p,
pre,
small,
span,
strong,
sub,
sup,
u,
ul {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

a {
  color: #007bc4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ol,
ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

html {
  /* background: url("../images/demo_bg.png"); */
}

body {
  height: 100%;
  font: 12px/18px "Microsoft Yahei", Tahoma, Helvetica, Arial, Verdana,
    "\5b8b\4f53", sans-serif;
  color: #51555c;
}

img {
  border: none;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.head {
  border-bottom: 1px solid #dadada;
  padding: 0 0 5px;
}

.head_inner {
  margin: 0 auto;
  width: 980px;
}

.container {
  width: 980px;
  min-height: 600px;
  margin: 30px auto 0;
  border: 1px solid #d3d3d3;
  background: #fff;
  -moz-border-radius: 5px;
  -khtml-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

h2.title {
  margin: 4px 0 30px;
  padding: 15px 0 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  font-size: 18px;
  color: #a84c10;
  /* background: url("../images/arrow.jpg") no-repeat 2px 14px; */
}

.foot {
  height: 60px;
  padding: 10px 2px;
  line-height: 24px;
  text-align: center;
}

.foot a:hover {
  color: #51555c;
}

.btn {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  background-color: #ff8400;
  color: #fff;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  text-align: center;
  width: 72px;
  transition: background-color 0.2s linear 0s;
  border: none;
  cursor: pointer;
}

.demo {
  width: 700px;
  margin: 0 auto;
}

.btn:hover {
  background-color: #e95a00;
  text-decoration: none;
}

ul.ul_demo li {
  /* background: url("../images/demo_icon.gif") no-repeat scroll 0 6px; */
  line-height: 28px;
  padding-left: 20px;
}

.input {
  border: 1px solid #ccc;
  padding: 0 5px;
  width: 220px;
  height: 26px;
  line-height: 26px;
}

.front {
  width: 300px;
  margin: 5px 32px 45px 32px;
  background-color: #f0f0f0;
  color: #666;
  text-align: center;
  padding: 3px;
  border-radius: 5px;
}

.booking_area {
  float: right;
  position: relative;
  width: 200px;
  height: 450px;
}

.booking_area h3 {
  margin: 5px 5px 0 0;
  font-size: 16px;
}

.booking_area p {
  line-height: 26px;
  font-size: 16px;
  color: #999;
}

.booking_area p span {
  color: #666;
}

div.seatCharts-cell {
  color: #182c4e;
  height: 25px;
  width: 25px;
  line-height: 25px;
  margin: 3px;
  float: left;
  text-align: center;
  outline: none;
  font-size: 13px;
}

div.seatCharts-seat {
  color: #fff;
  cursor: pointer;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

div.seatCharts-row {
  height: 35px;
}

div.seatCharts-seat.available {
  background-color: #b9dea0;
}

div.seatCharts-seat.focused {
  background-color: #76b474;
  border: none;
}

div.seatCharts-seat.selected {
  background-color: #e6cac4;
}

div.seatCharts-seat.unavailable {
  background-color: #472b34;
  cursor: not-allowed;
}

div.seatCharts-container {
  border-right: 1px dotted #adadad;
  width: 400px;
  padding: 20px;
  float: left;
}

div.seatCharts-legend {
  padding-left: 0px;
  position: absolute;
  bottom: 16px;
}

ul.seatCharts-legendList {
  padding-left: 0px;
}

.seatCharts-legendItem {
  float: left;
  width: 90px;
  margin-top: 10px;
  line-height: 2;
}

span.seatCharts-legendDescription {
  margin-left: 5px;
  line-height: 30px;
}

.checkout-button {
  display: block;
  width: 80px;
  height: 24px;
  line-height: 20px;
  margin: 10px auto;
  border: 1px solid #999;
  font-size: 14px;
  cursor: pointer;
}

#seats_chose {
  max-height: 150px;
  overflow-y: auto;
  overflow-x: none;
  width: 200px;
}

#seats_chose li {
  float: left;
  width: 72px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d3d3d3;
  background: #f7f7f7;
  margin: 6px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>