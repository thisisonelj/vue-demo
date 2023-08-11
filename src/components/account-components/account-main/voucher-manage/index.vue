<template>
  <div class="init-content">
    <span>{{ mainContent }}</span>
  </div>
</template>
<script>
export default {
  name: 'voucherManage',
  data () {
    return {
      mainContent: '欢迎来到凭证管理'
    }
  }
}
</script>
<style lang="less" scoped>
@url: "../../../../assets/sea.jpg";
.init-content {
  width: auto;
  height: 100%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
}
</style>
