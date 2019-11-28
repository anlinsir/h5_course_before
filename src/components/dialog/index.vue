<template>
  <div class="warper">
      <div class="white-box">
        <div class="white-box-message-box">
          <div class="title">{{data.title}}</div>
          <div class="content">{{data.content}}</div>
          <div class="btn-box">
            <div class="btn-left">{{data.cancel}}</div>
            <div class="btn-right">{{data.ok}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="scss">
  .warper{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    height: 100%;

  }
  .white-box{
    width:560px;
    margin-top: 80%;
    min-height:324px;
    background:rgba(255,255,255,1);
    border-radius:12px;
    padding: 42px 0 56px;
    box-sizing: border-box;
    background-color: #fff;
     .title{
      font-size:32px;
      font-weight:bold;
      text-align: center;
      margin-bottom: 24px;
      color: #303133;
    }
    .content{
      text-align: center;
      font-size:32px;
      color: #333333;
      line-height:40px;
      padding:  0 74px;
      margin-bottom: 58px;
    }
  }
  .btn-box{
    display: flex;
    justify-content: space-between;
    padding: 0 74px;
    box-sizing: border-box;

    div{
        width:160px;
        height:64px;
        border:2px solid rgba(255,198,0,1);
        font-size:32px;
        text-align: center;
        line-height: 64px;
        border-radius:48px;
        color: #FFC600;
    }
    .btn-right{
      background:linear-gradient(90deg,rgba(255,198,0,1) 0%,rgba(255,174,0,1) 100%);
      box-shadow:0px 4px 20px rgba(255,199,0,0.6);
      color: #fff;
    }
  }

</style>
