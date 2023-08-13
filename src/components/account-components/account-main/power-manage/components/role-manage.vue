<template>
  <el-dialog
    class="account-form-inline"
    title="角色列表"
    :visible="dialogRoleVisible"
    center
    width="560px"
  >
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="角色名">
        <el-input v-model="queryForm.userName" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <el-table
      ref="roleTable"
      :data="roleData"
      tooltip-effect="dark"
      class="user-table"
      highlight-current-row
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="item in propsList"
        :key="item.key"
        :type="item.type"
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelConfirm">取 消</el-button>
      <el-button type="primary" @click="userConfirm" style="margin-left: 20px"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import roleApi from '../../../../../utils/account-role'
export default {
  props: {
    dialogRoleVisible: {
      type: Boolean,
      default: false
    }
  },
  name: 'roleManage',
  data () {
    return {
      roleForm: {
        roleName: 'system_admin',
        createTime: this.$XeUtils.toDateString(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )
      },
      queryForm: {
        userName: ''
      },
      propsList: [
        {
          type: '',
          width: 150,
          prop: 'roleName',
          label: '角色名',
          key: 'roleName'
        },
        {
          type: '',
          prop: 'createTime',
          label: '创建时间',
          key: 'createTime'
        }
      ],
      roleData: []
    }
  },
  methods: {
    queryAllRole () {
      roleApi
        .queryall(this.roleForm)
        .then((res) => {
          if (res.status === 200) {
            this.roleData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cancelConfirm () {
      this.$emit('cancel-role-confirm', { status: false })
    },
    userConfirm () {
      this.$emit('user-role-confirm', { status: false })
    }
  },
  created () {
    this.queryAllRole()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.account-form-inline {
  height: 100%;
  padding: 10px;
  overflow: hidden;
  @{deep} div[role="dialog"] {
    margin-top: 10vh !important;
  }
  .account-power-header {
    line-height: 2;
    height: 6%;
    @{deep} .el-breadcrumb__item {
      cursor: pointer;
    }
  }
  .header-divider {
    margin-top: 0px;
  }
  @{deep} .el-dialog__body .el-form-item:nth-child(1) {
    width: 100%;
    .el-form-item__content {
      width: 80%;
    }
  }
  @{deep} .el-form-item:nth-child(2) {
    width: 40%;
    .el-form-item__content {
      width: 80%;
    }
  }
  .account-table {
    width: 100%;
    border: 0.5px solid;
    overflow: auto;
  }
  .dialog-role {
    @{deep} .el-form-item {
      display: flex;
      width: auto;
    }
  }
  .user-table {
    overflow: auto;
    width: 100%;
  }
}
</style>
<style>
.el-icon-more {
  line-height: 2;
  font-size: 20px;
}
.el-input__suffix {
  cursor: pointer;
}
</style>
