<template>
  <div>
    <el-row>
      <el-upload action="/api/admin/attachment" :with-credentials="true" type="drag"
                      :on-success="initData" class="freyja-attachment-upload">
        <i class="el-icon-upload"></i>
        <div class="">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-row>
    <el-row>
      <el-col :span="6" v-for="attachment in attachments" :key="attachment._id">
        <freyja-attachment-card class="freyja-attachment-card" :attachment="attachment"></freyja-attachment-card>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination :page-size="pageSize" :total="total" :current-page="currentPage"></el-pagination>
    </el-row>
  </div>
</template>
<script>
  import FreyjaAttachmentCard from '../../../components/admin/attachment-card.vue'

  export default {
    components: {FreyjaAttachmentCard},
    data() {
     return {
       attachments: [],
       pageSize: 20,
       total: 0,
       currentPage: 1,
     }
    },
    mounted() {
      this.initData()
    },
    methods: {
      async initData() {
        let resp = await this.$fetch.get('/api/admin/attachment')
        let body = await resp.json()
        this.attachments = body;
        resp = await this.$fetch.get('/api/admin/attachment/count')
        body = await resp.json()
        this.total = body.count
      }
    }
  }
</script>
<style scoped lang="scss">
  .freyja-attachment-card {
    width: 90%;
    margin: 10px auto;
  }
  .freyja-attachment-upload {
    border: solid #ccc 1px;
    border-radius: 2px;
    height: 50px;
    width: 300px;
    margin: 20px auto;
    text-align: center;
  }
</style>
