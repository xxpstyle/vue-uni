<template>
    <view>
        <view>
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column">
                    <view class="title">账号</view>
                    <input v-model="addForm.userCode" class="uni-input" name="input" placeholder="账号"/>
                    <view class="title">密码</view>
                    <input v-model="addForm.password" class="uni-input" name="input" type="password" placeholder="密码"/>
                </view>
                <view class="uni-btn-v">
                    <button form-type="submit">登录</button>
                    <!--<button type="default" form-type="reset">注册</button>-->
                </view>
            </form>
        </view>
    </view>
</template>
<script>

    export default {
        data() {
            return {
                addForm: {
                    userCode: 'wnn',
                    password: '123456',
                }
            }
        },
        methods: {
            formSubmit() {
                let loginRules = [
                    {name: 'userCode', type: 'required', errmsg: '请输入账号'},
                    {name: 'password', type: 'required', errmsg: '请输入密码'},
                ]
                let valLoginRes = this.$validate.validate(this.addForm, loginRules)
                if (!valLoginRes.isOk) {
                    uni.showToast({icon: 'none', title: valLoginRes.errmsg})
                    return false
                }
                this.$api('/auth/login', {
                    userCode: this.addForm.userCode,
                    pwd: this.addForm.password
                }).then(res => {
                    uni.setStorageSync('token', res.token)
                    uni.setStorageSync('user', {
                        uid: res.uid,
                        userCode: this.addForm.userCode,
                        userName: res.userName,
                    })
                    uni.setStorageSync('roleList', res.roles)
                    console.log(uni.getStorageSync('roleList'))
                    console.log(uni.getStorageSync('user'))
                    console.log(uni.getStorageSync('token'))
                })
            },
            formReset: function (e) {
                console.log('清空数据')
            }
        }
    }
</script>

<style>

</style>