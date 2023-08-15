<template>
  <div class="org-main">
    <el-breadcrumb separator="/" class="org-header">
      <el-breadcrumb-item
        v-for="item in propsList"
        @click.native="btn(item.key)"
        :key="item.key"
        >{{ item.value }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider class="header-divider"></el-divider>
    <el-tree
      :data="orgTreeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      class="org-tree"
      :highlight-current="true"
      default-expand-all
      :ref="'org-tree'"
      node-key="id"
      :filter-node-method="filterNode"
    >
      <span slot-scope="{ node, data }" class="org-tree-node">
        <span style="display: inline-block; width: 100%;font-size:16px">
          <i class="el-icon-film" v-if="data.id === 'root'"></i>
          <i
            class="el-icon-suitcase"
            v-else-if="data.id !== 'root' && !data.leafStatus"
          ></i>
          <i class="el-icon-suitcase-1" v-else></i>
          <span style="margin-left:10px">{{ data.label }}</span>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'orgTree',
  data () {
    return {
      propsList: [
        {
          key: 'insert',
          value: '增加'
        },
        {
          key: 'update',
          value: '修改'
        },
        {
          key: 'delete',
          value: '删除'
        }
      ],
      orgTreeData: [
        {
          id: 'root',
          label: '一级 1'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick () {},
    filterNode () {}
  }
}
</script>
<style lang="less" scoped>
@deep:~ ">>>";
@url: "../../../../assets/sea.jpg";
.org-main {
  .org-header {
    line-height: 2.5;
    height: 2%;
  }
  .header-divider {
    margin-top: 0px;
  }
  @{deep} .el-divider--horizontal {
    margin: 0px;
  }
  .org-tree {
    .org-tree-node {
    }
  }
}
</style>
