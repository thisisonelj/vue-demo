<template>
  <div>
    <el-dialog
      title="用户列表"
      :visible="dialogUserVisible"
      center
      width="960px"
      class="account-form-inline"
      :show-close="false"
    >
      <el-form :inline="true" :model="userForm">
        <el-form-item label="用户">
          <el-input v-model="userForm.userName" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <el-table
        ref="userTable"
        :data="userData"
        tooltip-effect="dark"
        class="user-table"
        highlight-current-row
        border
        :cell-style="cellStyleSet"
        @selection-change="moniterSelect"
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
  </div>
</template>
<script>
import userApi from '../../../../../utils/account-user'
import roleApi from '../../../../../utils/account-role'
export default {
  name: 'userManage',
  props: {
    dialogUserVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedUserList: [],
      roleCopyData: [],
      userForm: {
        userName: ''
      },
      propsList: [
        {
          type: '',
          width: 200,
          prop: 'userName',
          label: '用户名',
          key: 'userName'
        },
        {
          type: '',
          width: 200,
          prop: 'roleName',
          label: '角色名',
          key: 'roleName'
        },
        {
          type: '',
          width: 200,
          prop: 'age',
          label: '年龄',
          key: 'age'
        },
        {
          type: '',
          prop: 'createTime',
          label: '创建时间',
          key: 'createTime'
        }
      ],
      userData: []
    }
  },
  methods: {
    moniterSelect (data) {
      this.selectedUserList = data
    },
    cancelConfirm () {
      this.$emit('cancel-userdialog', { status: false })
    },
    userConfirm () {
      this.$emit('confirm-userdialog', { status: false, selectedUsers: this.selectedUserList })
    },
    /**
     *添加用户的角色列表的选择项
     */
    queryUserAll () {
      userApi
        .queryall({})
        .then((res) => {
          if (res.status === 200) {
            this.userData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    queryRoleAll () {
      roleApi
        .queryall({})
        .then((res) => {
          if (res.status === 200) {
            this.roleCopyData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cellStyleSet ({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'roleName') {
        return { 'white-space': 'nowrap' }
      }
    }
  },
  created () {
    this.queryUserAll()
    this.queryRoleAll()
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
  @{deep} .el-form-item:nth-child(1) {
    width: 40%;
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
  .user-table {
    width: 100%;
    overflow: auto;
    @{deep} .cell{
      white-space:nowrap;
    }
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
