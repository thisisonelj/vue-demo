<template>
  <div class="account-form-inline">
    <el-breadcrumb separator="/" class="account-power-header">
      <el-breadcrumb-item @click.native="updateUserInfo()"
        >增加用户</el-breadcrumb-item
      >
      <el-breadcrumb-item @click.native="updateRoleInfo()"
        >增加角色</el-breadcrumb-item
      >
      <el-breadcrumb-item @click.native="SavePower">保存</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="importPower">导入</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="exportPower">导出</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="header-divider"></el-divider>
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
          <template
            v-if="
              item.key !== 'operation' &&
              item.key !== 'userRoleValue' &&
              item.key !== 'powerIndex'
            "
          >
            <el-checkbox
              v-model="scope.row[item.prop]"
              :size="'medium'"
            ></el-checkbox>
          </template>
          <template v-else-if="item.key == 'operation'">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
          <template v-else-if="item.key == 'powerIndex'">
            {{ scope.$index + 1 }}
          </template>
          <template v-else>
            {{ scope.row[item.prop] }}
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
    <Modal
      v-model="displayUpload"
      width="420"
      :closable="false"
      footer-hide
      class="upload-modal"
    >
      <div slot="header">
        <Icon
          type="ivu-icon ivu-icon-ios-help-circle"
          size="28"
          class="icon-color"
        />
        <span class="upload-header-title" style="margin-left: 10px"
          >提示信息</span
        >
      </div>
      <div style="padding-left: 55px" class="upload-content">
        <span>导入后用户/角色的权限将被覆盖</span>
      </div>
      <div class="upload-footer">
        <Button type="primary" @click="cancelUpload" ghost>取消</Button>
        <Upload
          class="upload-power"
          :show-upload-list="false"
          ref="uploadPower"
          :on-success="handleSuccess"
          :on-error="handleError"
          :format="['xlsx', 'xls']"
          accept="xlsx,xls"
          :before-upload="handleBeforeUpload"
          :action="action"
          :headers="headers"
        >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="confirmUpload"
            >确定</Button
          >
        </Upload>
      </div>
    </Modal>
  </div>
</template>
<script>
import userManage from './components/user-manage'
import roleManage from './components/role-manage'
import powerApi from '../../../../utils/account-power.js'
export default {
  name: 'powerManage',
  components: {
    userManage: userManage,
    roleManage: roleManage
  },
  data () {
    return {
      uploadFile: {},
      headers: { token: localStorage.getItem('token') },
      action: this.$axios.defaults.baseURL.concat('/rest/account/power/import'),
      displayUpload: false,
      selectedRoles: [],
      selectedUsers: [],
      roleVisible: false,
      UserVisible: false,
      userForm: {
        user: '',
        role: ''
      },
      propsList: [
        {
          type: '',
          width: 50,
          prop: 'powerIndex',
          label: '序号',
          key: 'powerIndex'
        },
        {
          type: '',
          width: 150,
          prop: 'userRoleValue',
          label: '用户/角色',
          key: 'userRoleValue'
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
      powerData: []
    }
  },
  methods: {
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt !== 'xlsx' && fileExt !== 'xls') {
        this.$Message.error('格式必须为xlsx、xls类型')
        return false
      } else {
        this.uploadFile = file
        return true
      }
    },
    handleError (response) {},
    handleSuccess (response) {
      if (response.status === 200) {
        this.$message({
          type: 'success',
          message: '导入成功'
        })
        this.powerData = response.data
      } else {
        this.$message({
          type: 'error',
          message: '导入失败'
        })
      }
    },
    confirmUpload () {
      if (Object.keys(this.uploadFile).length !== 0) {
        let uploadFile = this.uploadFile
        this.$refs.uploadPower.post(uploadFile)
      }
      this.displayUpload = false
    },
    cancelUpload () {
      this.displayUpload = false
    },
    cancelUserDialog (data) {
      this.UserVisible = data.status
    },
    confirmUserDialog (data) {
      this.UserVisible = data.status
      this.selectedUsers = data.selectedUsers // 存储选中的用户列表
      this.userForm.user = data.selectedUsers
        .map((item) => {
          return item.userName
        })
        .join(',')
      let users = data.selectedUsers
      let roles = this.selectedRoles
      let powerRoleList = roles.map((item) => {
        return { userRoleId: item.id, userRoleValue: item.roleName }
      })
      let powerUserList = users.map((e) => {
        return { userRoleId: e.id, userRoleValue: e.userName }
      })
      let powerList = powerRoleList.concat(powerUserList)
      powerApi
        .selectList(powerList)
        .then((res) => {
          if (res.status === 200) {
            this.powerData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleDelete ($index, row) {
      this.$confirm('确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          powerApi.delete(row).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.powerData.splice($index, 1)
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        })
    },
    selectPower () {},
    cancelContent () {},
    SavePower () {
      powerApi
        .update(this.powerData)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.powerData = res.data
          } else {
            this.$message({
              message: `${res.message}`,
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    importPower () {
      this.displayUpload = true
    },
    exportPower () {
      let selectedDatas = this.$refs.powerTable.selection
      if (selectedDatas.length === 0) {
        this.$Message.info('请至少选择一条数据')
      } else {
        this.$axios
          .post(
            '/rest/account/power/export',
            JSON.stringify(selectedDatas),
            {
              responseType: 'blob'
            }
          )
          .then((res) => {
            let blob = new Blob([res.data], {
              type: 'application/ms-excel;charset=utf-8'
            })
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            let temp = res.headers['content-disposition'].slice(9)
            // 对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
            let iconv = require('iconv-lite')
            iconv.skipDecodeWarning = true // 忽略警告
            let fileName = iconv.decode(temp, 'utf-8')
            downloadElement.download = fileName
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          })
      }
    },
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
      this.selectedRoles = data.selectedRoleList
      this.userForm.role = data.selectedRoleList
        .map((item) => {
          return item.roleName
        })
        .join(',')
      let roles = data.selectedRoleList
      let users = this.selectedUsers
      let powerRoleList = roles.map((item) => {
        return { userRoleId: item.id, userRoleValue: item.roleName }
      })
      let powerUserList = users.map((e) => {
        return { userRoleId: e.id, userRoleValue: e.userName }
      })
      let powerList = powerRoleList.concat(powerUserList)
      powerApi
        .selectList(powerList)
        .then((res) => {
          if (res.status === 200) {
            this.powerData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    queryPowerAll () {
      powerApi
        .queryall({})
        .then((res) => {
          if (res.status === 200) {
            this.powerData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.queryPowerAll()
  }
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.account-form-inline {
  height: 100%;
  padding: 10px;
  .account-power-header {
    line-height: 1.5;
    height: 2%;
    @{deep} .el-breadcrumb__item {
      cursor: pointer;
    }
  }
  .header-divider {
    margin-top: 0px;
  }
  @{deep} .el-divider--horizontal {
    margin: 13px 0;
  }
  .account-table {
    width: 100%;
    border: 0.5px solid;
    overflow: auto;
    height: 94%;
  }
}
</style>
<style lang="less">
@deep:~ ">>>";
.upload-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 30%;
  }
  .ivu-modal-header {
    border-bottom: 0px;
    .icon-color {
      color: #f90;
    }
    .upload-header-title {
      font-size: 18px;
      vertical-align: 2px;
    }
  }
  .upload-content {
    font-size: 16px;
  }
  .upload-footer {
    display: flex;
    margin-top: 10%;
    justify-content: end;
  }
}
</style>
