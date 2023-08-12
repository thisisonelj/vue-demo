<template>
  <div class="account-form-inline">
    <el-breadcrumb separator="/" class="account-power-header">
      <el-breadcrumb-item
        v-for="item in btnGroups"
        :key="item.key"
        @click="btnfunc(item)"
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
            <el-input type="text" v-model="scope.row.prop">
              <template slot="suffix">
                <i class="el-icon-more icon-role" @click="getRoleInfo"></i>
              </template>
            </el-input>
          </template>
          <template v-else>
            <el-input type="text" v-model="scope.row.prop"> </el-input>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      userForm: {
        userName: ''
      },
      btnGroups: [
        {
          name: '增加',
          key: 'insert'
        },
        {
          name: '修改',
          key: 'update'
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
      userData: [
        {
          userName: 'liu',
          roleName: 'liu',
          age: 24,
          createTime: new Date()
        }
      ]
    }
  },
  methods: {
    btnfunc (btnInfo) {},
    handleDelete (index, row) {},
    getRoleInfo () {

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
<style>
.el-icon-more {
  line-height: 2;
  font-size: 20px;
}
.el-input__suffix {
  cursor: pointer;
}
</style>
