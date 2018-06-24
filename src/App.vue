<script>
import ajax from './api/ajax'
export default {
  onLaunch () {
    wx.login({
      success: async (res) => {
        let code = res.code
        let loginInfo = await ajax.post('login', {code})
        console.log(loginInfo)
      }
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
