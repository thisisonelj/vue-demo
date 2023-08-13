<template>
  <div class="account-form-inline">
    <el-breadcrumb separator="/" class="account-power-header">
      <el-breadcrumb-item @click.native="SavePower">保存</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="importPower">导入</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="exportPower">导出</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="header-divider"></el-divider>
    <el-form :inline="true" :model="userForm">
      <el-form-item label="用户">
        <el-input v-model="userForm.user" placeholder="">
          <template slot="suffix">
            <i class="el-icon-more icon-role" @click="updateUserInfo()"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="userForm.role" placeholder="">
          <template slot="suffix">
            <i class="el-icon-more icon-role" @click="updateRoleInfo()"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectPower">查询</el-button>
        <el-button @click="cancelContent" style="margin-left: 30px"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      ref="powerTable"
      :data="powerData"
      tooltip-effect="dark"
      class="account-table"
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
        <template slot-scope="scope">
          <template v-if="item.key !== 'operation' && item.key !== 'name'">
            <el-checkbox
              v-model="scope.row[item.prop]"
              :size="'medium'"
            ></el-checkbox>
          </template>
          <template v-if="item.key == 'operation'">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <user-manage
      :dialog-user-visible="UserVisible"
      @cancel-userdialog="cancelUserDialog"
      @confirm-userdialog="confirmUserDialog"
    ></user-manage>
    <role-manage
      @cancel-role-confirm="cancelRoleDialog"
      @user-role-confirm="confirmRoleDialog"
      :dialog-role-visible="roleVisible"
    ></role-manage>
  </div>
</template>
<script>
import userManage from './components/user-manage'
import roleManage from './components/role-manage'
export default {
  name: 'powerManage',
  components: {
    userManage: userManage,
    roleManage: roleManage
  },
  data () {
    return {
      roleVisible: false,
      UserVisible: false,
      userForm: {
        user: '',
        role: ''
      },
      propsList: [
        {
          type: '',
          width: 150,
          prop: 'name',
          label: '用户/角色',
          key: 'name'
        },
        {
          type: '',
          width: 150,
          prop: 'userManage',
          label: '用户管理',
          key: 'userManage'
        },
        {
          type: '',
          width: 150,
          prop: 'systemSetting',
          label: '系统管理',
          key: 'systemSetting'
        },
        {
          type: '',
          width: 150,
          prop: 'cmManage',
          label: '出纳管理',
          key: 'cmManage'
        },
        {
          type: '',
          width: 150,
          prop: 'voucherManage',
          label: '凭证管理',
          key: 'voucherManage'
        },
        {
          type: '',
          width: 150,
          prop: 'bookManage',
          label: '账簿管理',
          key: 'bookManage'
        },
        {
          type: '',
          prop: 'operation',
          label: '操作',
          key: 'operation'
        }
      ],
      powerData: [
        {
          name: '1',
          userManage: true,
          systemSetting: true,
          cmManage: true,
          voucherManage: true,
          bookManage: true
        },
        {
          name: '1',
          userManage: true,
          systemSetting: true,
          cmManage: true,
          voucherManage: true,
          bookManage: true
        },
        {
          name: '1',
          userManage: true,
          systemSetting: true,
          cmManage: true,
          voucherManage: true,
          bookManage: true
        }
      ]
    }
  },
  methods: {
    cancelUserDialog (data) {
      this.UserVisible = data.status
    },
    confirmUserDialog (data) {
      this.UserVisible = data.status
    },
    handleDelete ($index, row) {},
    selectPower () {},
    cancelContent () {},
    SavePower () {},
    importPower () {},
    exportPower () {},
    updateUserInfo () {
      this.UserVisible = true
    },
    updateRoleInfo () {
      this.roleVisible = true
    },
    cancelRoleDialog (data) {
      this.roleVisible = false
    },
    confirmRoleDialog (data) {
      this.roleVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.account-form-inline {
  height: 100%;
  padding: 10px;
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
  .account-table {
    width: 100%;
    border: 0.5px solid;
    overflow: auto;
  }
}
</style>
