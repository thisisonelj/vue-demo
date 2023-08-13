<template>
  <div class="account-form-inline">
    <el-breadcrumb separator="/" class="account-power-header">
      <el-breadcrumb-item
        v-for="item in btnGroups"
        :key="item.key"
        @click.native="btnfunc(item)"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider class="header-divider"></el-divider>
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
          <template v-if="item.key === 'operation'">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
          <template v-else-if="item.key === 'roleName'">
            <el-input type="text" v-model="scope.row[item.key]">
              <template slot="suffix">
                <i
                  class="el-icon-more icon-role"
                  @click="updateRoleInfo(scope.$index, scope.row)"
                ></i>
              </template>
            </el-input>
          </template>
          <template v-else>
            <el-input type="text" v-model="scope.row[item.key]"> </el-input>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="增加用户"
      :visible.sync="dialogUserVisible"
      center
      width="420px"
      class="dialog-user"
    >
      <el-form
        :model="userInsertForm"
        :inline="false"
        label-position="right"
        :rules="userRules"
        ref="accountUserForm"
      >
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="userName"
        >
          <el-input
            v-model="userInsertForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色名"
          :label-width="formLabelWidth"
          prop="roleName"
        >
          <el-input type="text" v-model="userInsertForm.roleName">
            <template slot="suffix">
              <i class="el-icon-more icon-role" @click="getRoleInfo"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input-number
            v-model="userInsertForm.age"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="passWord"
        >
          <el-input
            v-model="userInsertForm.passWord"
            autocomplete="off"
            style="margin-left: 13px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="创建时间"
          :label-width="formLabelWidth"
          prop="createTime"
          style="text-align: center"
        >
          <el-date-picker
            v-model="userInsertForm.createTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:hh:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="userInsert('accountUserForm')"
          style="margin-left: 20px"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="角色列表"
      :visible.sync="dialogRoleVisible"
      center
      width="480px"
      class="dialog-role"
    >
      <el-table
        ref="roleTable"
        :data="roleData"
        tooltip-effect="dark"
        class="role-table"
        highlight-current-row
        border
        @select="selectChange"
        @selection-change="moniterSelect"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="item in roleList"
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
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="RoleConfirm" style="margin-left: 20px"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="角色列表"
      :visible.sync="dialogRoleCopyVisible"
      center
      width="480px"
      class="dialog-role"
    >
      <el-table
        :key="roleCopyTableValue"
        :ref="roleCopyTableValue"
        :data="roleCopyData"
        tooltip-effect="dark"
        class="role-table"
        highlight-current-row
        border
        @selection-change="moniterCopySelect"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="item in roleList"
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
        <el-button @click="dialogRoleCopyVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="RoleCopyConfirm"
          style="margin-left: 20px"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userApi from '../../../../utils/account-user'
import roleApi from '../../../../utils/account-role'
export default {
  name: 'userManage',
  data () {
    let checkUserName = (rule, value, callback) => {
      if (value === undefined || value === null || value === '') {
        return callback(new Error('用户名不能为空'))
      } else {
        return callback()
      }
    }
    let checkroleName = (rule, value, callback) => {
      if (value === undefined || value === null || value === '') {
        return callback(new Error('角色名称不能为空'))
      } else {
        return callback()
      }
    }
    let checkAge = (rule, value, callback) => {
      if (value === undefined || value === null || value === '') {
        return callback(new Error('年龄不能为空'))
      } else {
        return callback()
      }
    }
    let checkPassWord = (rule, value, callback) => {
      if (value === undefined || value === null || value === '') {
        return callback(new Error('密码不能为空'))
      } else {
        return callback()
      }
    }
    let checkCreateTime = (rule, value, callback) => {
      if (value === undefined || value === null || value === '') {
        return callback(new Error('创建时间不能为空'))
      } else {
        return callback()
      }
    }

    return {
      roleCopyTableValue: '',
      updateIndex: 0,
      addRoleCopyList: [],
      addRoleList: [], // 存储添加用户的角色列表
      dialogRoleCopyVisible: false,
      roleCopyData: [],
      dialogRoleVisible: false,
      roleData: [],
      roleList: [
        {
          type: '',
          width: 180,
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
      userRules: {
        userName: [{ validator: checkUserName, trigger: 'blur' }],
        roleName: [{ validator: checkroleName, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
        passWord: [{ validator: checkPassWord, trigger: 'blur' }],
        createTime: [{ validator: checkCreateTime, trigger: 'blur' }]
      },
      labelAlign: 'right',
      formLabelWidth: '55',
      dialogUserVisible: false,
      userInsertForm: {
        userName: '',
        roleName: '',
        age: 0,
        passWord: '',
        createTime: this.$XeUtils.toDateString(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )
      },
      userForm: {
        userName: ''
      },
      btnGroups: [
        {
          name: '增加',
          key: 'insert'
        },
        {
          name: '保存',
          key: 'save'
        }
      ],
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
          width: 200,
          prop: 'createTime',
          label: '创建时间',
          key: 'createTime'
        },
        {
          type: '',
          prop: 'operation',
          label: '操作',
          key: 'operation'
        }
      ],
      userData: []
    }
  },
  methods: {
    selectChange (selection, row) {},
    moniterSelect (selection) {
      this.addRoleList = selection
    },
    /**
     *添加用户的角色列表的选择项
     */
    moniterCopySelect (selection) {
      this.addRoleCopyList = selection
    },
    RoleConfirm () {
      this.dialogRoleVisible = false
      let roleNameList = this.addRoleList
        .map((item) => {
          return item.roleName
        })
        .join(',')
      this.userInsertForm.roleName = roleNameList
    },
    RoleCopyConfirm () {
      this.dialogRoleCopyVisible = false
      let roleNameList = this.addRoleCopyList
        .map((item) => {
          return item.roleName
        })
        .join(',')
      this.userData.forEach((element, index, array) => {
        if (index === this.updateIndex) {
          element.roleName = roleNameList
          element.accountRoleDOList = this.addRoleCopyList
        }
      })
    },
    insertUser () {
      this.dialogUserVisible = true
    },
    saveUser () {
      userApi
        .update(this.userData)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.queryUserAll()
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    btnfunc (btnInfo) {
      if (btnInfo.key === 'insert') {
        this.insertUser()
      }
      if (btnInfo.key === 'save') {
        this.saveUser()
      }
    },
    handleDelete (index, row) {
      this.$confirm('确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userApi.delete(row).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryUserAll()
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
    getRoleInfo () {
      this.dialogRoleVisible = true
    },
    updateRoleInfo (index, row) {
      this.roleCopyTableValue = row.id
      this.updateIndex = index
      this.dialogRoleCopyVisible = true
      let that = this
      this.$nextTick(
        this.roleCopyData.forEach((item) => {
          row.accountRoleDOList.forEach((element) => {
            if (item.id === element.id) {
              setTimeout(() => {
                that.$refs[this.roleCopyTableValue].toggleRowSelection(item, true)
              }, 0)
            }
          })
        })
      )
    },
    userInsert (accountUserForm) {
      this.$refs[accountUserForm].validate((valid) => {
        if (valid) {
          let insertFinalForm = Object.assign({}, this.userInsertForm)
          insertFinalForm.accountRoleDOList = this.addRoleList
          userApi
            .add(insertFinalForm)
            .then((res) => {
              if (res.status === 200) {
                this.dialogUserVisible = false
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.queryUserAll()
              } else {
                this.$message({
                  message: `${res.msg}`,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.dialogUserVisible = true
        }
      })
    },
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
            this.roleData = res.data
            this.roleCopyData = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
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
  .dialog-user {
    @{deep} .el-form-item {
      display: flex;
      width: auto;
      .el-form-item__content {
        width: 80%;
        .el-input-number {
          width: 100%;
          margin-left: 13px;
        }
      }
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
