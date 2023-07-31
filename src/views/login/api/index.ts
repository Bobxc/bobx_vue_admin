import bobxRequest from '@/service'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

export function fetchList() {
  return bobxRequest.request<DataType>({
    url: 'home/multidata',
    method: 'get'
  })
}
