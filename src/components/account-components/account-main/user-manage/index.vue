<template>
  <div class="account-form-inline">
    <el-form :inline="true" :model="userForm">
      <el-form-item label="用户">
        <el-input v-model="userForm.user" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="userForm.role" placeholder=""></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      userForm: {
        user: '',
        role: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.account-form-inline {
  padding: 10px;
  @{deep} .el-form-item {
    width: 45%;
    .el-form-item__content {
      width: 80%;
    }
  }
  & .el-form-item:last-child{
      margin-left: 8%;
    }

}
</style>
