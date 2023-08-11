<template>
  <el-container class="account-contain">
    <el-aside class="account-aside">
      <el-menu
        :default-openeds="['1', '2', '3', '4', '5']"
        :unique-opened="false"
        ref="accountMenus"
        :default-active="$route.path"
        router
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/user"
              ><span><i class="el-icon-user"></i>用户信息</span></el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/role"
              ><span><i class="el-icon-user-solid"></i>角色信息</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/power">
              <span
                ><i class="el-icon-coordinate"></i>权限信息</span
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-s-tools"></i>系统选项</template
          >
          <el-menu-item-group>
            <el-menu-item index="/system-setting"
              ><span
                ><i class="el-icon-setting"></i>核算选项</span
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-film"></i>出纳模块</template>
          <el-menu-item-group>
            <el-menu-item index="/cm-import"
              ><span
                ><i class="el-icon-suitcase"></i>导入管理</span
              ></el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/cm-manage"
              ><span
                ><i class="el-icon-suitcase-1"></i>出纳管理</span
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-bank-card"></i>凭证模块</template
          >
          <el-menu-item-group>
            <el-menu-item index="/voucher-import"
              ><span><i class="el-icon-money"></i>凭证录入</span></el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/voucher-manage"
              ><span
                ><i class="el-icon-discount"></i>凭证管理</span
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-film"></i>账簿模块</template>
          <el-menu-item-group>
            <el-menu-item index="/detail-book"
              ><span><i class="el-icon-suitcase"></i>明细账</span></el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/balance-book"
              ><span
                ><i class="el-icon-suitcase-1"></i>余额账</span
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="account-header">
        <el-dropdown>
          <span class="header-title">{{ moduleTitle }}</span>
          <span
            style="display: inline-block; cursor: pointer"
            @click="systemSetting"
            ><i class="el-icon-setting system-setting"></i
          ></span>
        </el-dropdown>
      </el-header>
      <el-main class="account-main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog
      title="系统设置"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  name: 'accountMain',
  data () {
    return {
      moduleTitle: '首页',
      dialogVisible: false
    }
  },
  methods: {
    systemSetting () {
      this.dialogVisible = true
    }
  },
  watch: {
    $route: {
      handler: function (oldValue, newValue) {
        this.moduleTitle = oldValue.meta.headerTitle
      }
    }
  }
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.account-contain {
  height: 100%;
  border: 1px solid #eee;
  .account-aside {
    background-color: rgb(238, 241, 246);
    width: 200px;
  }
  .account-header {
    @{deep} .el-dropdown {
      font-size: 30px;
      width: 100%;
      display: flex;
    }
    .header-title {
      flex: 12;
      text-align: center;
    }
    .system-setting {
      flex: 1;
      margin: auto;
    }
  }
  span {
    display: inline-block;
  }
  .account-main-content {
    padding: 0;
  }
  @{deep} .el-menu-item-group__title {
    line-height: 0;
    padding: 0;
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
