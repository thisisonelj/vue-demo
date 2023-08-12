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
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="角色名">
        <el-input v-model="queryForm.userName" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <el-table
      ref="userTable"
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
        <template slot-scope="scope">
          <template v-if="item.key === 'operation'">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
          <template v-else-if="item.key === 'roleName'">
           <el-input type="text" v-model="scope.row.roleName" :disabled="scope.row.disabled" :key="scope.row.id"></el-input>
          </template>
          <template v-else>
            <el-date-picker
            v-model="scope.row.createTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:hh:ss"
            :disabled="scope.row.disabled"
            :key="scope.row.id"
          >
          </el-date-picker>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加角色" :visible.sync="dialogRoleVisible" center width="420px" class="dialog-role">
      <el-form :model="roleForm" :inline="false">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="roleForm.roleName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="roleForm.createTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:hh:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="RoleInsert" style="margin-left: 20px;">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import roleApi from '../../../../utils/account-role'
export default {
  name: 'roleManage',
  data () {
    return {
      formLabelWidth: '55',
      roleForm: {
        roleName: 'system_admin',
        createTime: this.$XeUtils.toDateString(
          new Date(),
          'yyyy-MM-dd HH:mm:ss'
        )
      },
      dialogRoleVisible: false,
      queryForm: {
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
          width: 350,
          prop: 'roleName',
          label: '角色名',
          key: 'roleName'
        },
        {
          type: '',
          width: 350,
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
      roleData: []
    }
  },
  methods: {
    insertRole () {
      this.dialogRoleVisible = true
    },
    updateRole () {
      this.roleData.forEach(element => {
        // element.disabled = false
      })
    },
    saveRole () {
      roleApi.update(this.roleData).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.queryAllRole()
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    btnfunc (btnInfo) {
      if (btnInfo.key === 'insert') {
        this.insertRole()
      }
      if (btnInfo.key === 'update') {
        this.updateRole()
      }
      if (btnInfo.key === 'save') {
        this.saveRole()
      }
    },
    handleDelete (index, row) {
      this.$confirm('确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleApi.delete(row).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.queryAllRole()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功'
        })
      })
    },
    queryAllRole () {
      roleApi
        .queryall(this.roleForm)
        .then((res) => {
          if (res.status === 200) {
            this.roleData = res.data
            this.roleData.forEach(element => {
              element.disabled = false
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    RoleInsert () {
      roleApi
        .add(this.roleForm)
        .then((res) => {
          if (res.status === 200) {
            this.queryAllRole()
            this.$message({
              message: '添加角色成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加角色失败',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.dialogRoleVisible = false
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
   .dialog-role{
    @{deep} .el-form-item{
        display: flex;
        width: auto;
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
