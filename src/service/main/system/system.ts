import wxRequest from '@/service'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return wxRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// 删除接口 /users/id
export function deletePageData(url: string) {
  return wxRequest.delete<IDataType>({ url })
}

export function createPageData(url: string, newData: any) {
  return wxRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return wxRequest.patch<IDataType>({
    url,
    data: editData
  })
}
