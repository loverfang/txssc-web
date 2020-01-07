<template>
    <div align="center" style="width:1204px;" class="app-container">
    <el-table :data="tableData" border style="width: 100%" align="center" >
        <el-table-column
                prop="date"
                label="期数"
                width="150" align="center">
        </el-table-column>

        <el-table-column
                prop="name"
                label="姓名"
                width="120">
        </el-table-column>

        <el-table-column
                prop="province"
                label="省份"
                width="120">
        </el-table-column>
        <el-table-column
                prop="city"
                label="市区"
                width="120">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
                width="280">
        </el-table-column>
        <el-table-column
                prop="zip"
                label="开奖号码"
                width="300">
        </el-table-column>
        <el-table-column
                label="操作"
                width="110" align="center">
            <template slot-scope="scope" style="text-align: center">
                <el-button @click="handleClick(scope.row)" type="text" size="small">复制号码</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="footer">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    </div>

    </div>
</template>

<script>
    export default {
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        computed: {},
        components: {}
    }
</script>

<style>
    .app-container{margin:0 auto;}
    .footer{margin:10px;}
</style>
