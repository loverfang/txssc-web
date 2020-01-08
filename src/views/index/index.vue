<template>
    <div align="center" style="width:1204px;" class="app-container">
    <el-table :data="dataList" border style="width: 100%" align="center" v-loading="listLoading">
        <el-table-column
                prop="date"
                label="期数"
                width="160" align="center">
        </el-table-column>

        <el-table-column
                prop="name"
                label="胆码"
                width="100" align="center">
        </el-table-column>

        <el-table-column
                prop="province"
                label="和值"
                width="100" align="center">
        </el-table-column>
        <el-table-column
                prop="city"
                label="和尾"
                width="100" align="center">
        </el-table-column>
        <el-table-column
                prop="address"
                label="对码"
                width="100" align="center">
        </el-table-column>
        <el-table-column
                prop="zip"
                label="切换状态"
                width="100" align="center">
        </el-table-column>
        <el-table-column
                prop="zip"
                label="总注数"
                width="100" align="center">
        </el-table-column>
        <el-table-column
                prop="zip"
                label="投注号码"
                width="300" align="left">
        </el-table-column>
        <el-table-column
                label="操作"
                width="140" align="center">
            <template slot-scope="scope" style="text-align: center">
                <el-button @click="handleClick(scope.row)" type="text" size="small">复制号码</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="footer">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadResultList" />
    </div>

    </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import { loadResultList } from '@/api/result.js' // 引入需要请求的路径

    export default {
        components: { Pagination },

        data() {
            return {
                dataList: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 200,
                    order: 'desc'
                }
            }
        },

        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            loadResultList(){
                this.listLoading = true
                loadResultList(this.listQuery).then(response => {
                    this.dataList = response.data.items
                    this.total = response.data.total
                    this.listLoading = false
                })
            }
        },

        computed: {},
        created: function(){
            this.loadResultList()
        }
    }
</script>

<style>
    .app-container{margin:0 auto;}
    .footer{margin:10px;}
</style>
