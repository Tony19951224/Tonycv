<template>
    <div id="register">

        <div class="content">
            <form action="">

                <div>
                    <h4>注册</h4>
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4228183737,843503690&fm=27&gp=0.jpg" alt=""> 账号 :
                    <input type="text" v-model="username">
                    <br>
                    <br> 密码 :
                    <input type="password" v-model="password">
                    <br>
                    <button class="zhu" @click="register">注册</button>
                   
                    <a href="#/me">返回</a>
                </div>
            </form>
 <alert v-model="show" :title="('Error!')" @on-show="onShow" @on-hide="onHide">账号/密码不能为空!</alert>
                    <alert v-model="wrong" :title="('输入有误!')" @on-show="onShow" @on-hide="onHide">账号/密码长度需大于4位!</alert>
        </div>
    </div>
</template>

<script>
    import { Alert } from 'vux'
    export default {
        data() {
            return {
                username: '',
                password: '',
                show: false,
                wrong: false,
            }
        },
        components: {
            Alert,

        },
        methods: {
            register: function (ev) {
                ev.preventDefault();
                // console.log(this.username);
                // console.log(this.password);
                if ((this.username && this.password) == '') {
                    return this.show = true;
                }
                if ((this.username.length && this.password.length) < 4) {
                    return this.wrong = true;
                }

                this.$axios.post('/aaa/register', {
                    username: this.username,
                    password: this.password
                }).then((result) => {
                    console.log(result);
                    if (result.data.error == 1) {
                        alert(result.data.message);
                    }
                    else {
                        alert(result.data.message);
                        location.href = '#/me'
                    }

                }).catch((err) => {
                    console.log(err);
                })
            },
            onHide() {
                console.log('on hide')
            },
            onShow() {
                console.log('on show')
            },
        }

    }
</script>

<style scoped>
#register .content {
  width: 300px;
  /* background: #e0e0e0; */
  /* background: linear-gradient(yellowgreen, #46a3ff); */
  background: linear-gradient(right, #46a3ff, red);
  margin: 30px auto;
  text-align: center;
}

#register .content form div {
  padding: 30px 0;
}

#register .content form div input {
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid #000;
  /* background: #e0e0e0; */
  background: no-repeat;
  text-align: center;
}

#register .content form div img {
  width: 100px;
  display: block;
  margin: 0 auto;
}

#register .content form div .zhu {
  padding: 5px 0;
  width: 100px;
  background: #84c1ff;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 20px 10px 0;
}

#register .content form div .zhu:hover {
  background: #008dff;
  color: white;
}
</style>