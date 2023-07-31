<template>
  <div>233</div>
</template>
<script lang="ts" setup>
import { fetchList } from './api'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

const list = async () => {
  const res: DataType = await fetchList()
  console.log(res)
}
list()
// import bobxRequest from '@/service'

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// bobxRequest
//   .request<DataType>({
//     url: 'home/multidata',
//     method: 'get'
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

// bobxRequest
//   .get<DataType>({
//     url: 'home/multidata'
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
</script>
