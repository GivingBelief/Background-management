import request from './request'		// 引入request.js

const path = process.env.NODE_ENV === 'development' ? '/api' : ''		// 根据开发环境获取path路径

// 登录请求
export const loginApi = params => request.post(`${path}/tokens`, params)

// 注销登录
export const logoutApi = params => request.delete(`${path}/tokens`, {params: params})

// 员工管理
export const employeesApi = params => request.get(`${path}/employees`, {params: params})

// 部门管理
export const departmentsApi = params => request.get(`${path}/departments`, {params: params})

// 添加部门
export const addDepartmentApi = params => request.post(`${path}/departments`, params)

// 修改部门
export const changeaddDepartmentApi = params => request.put(`${path}/departments/${params.id}`, params)

// 删除部门
export const deleteaddDepartmentApi = params => request.delete(`${path}/departments/${params.id}`, params)

// 获取角色
export const rolesApi = params => request.put(`${path}/departments/${params.id}`, {params: params})

// 添加员工
export const addemployeesApi = params => request.post(`${path}/employees`, params)


// 导出员工
export const employeesxlsesApi = `${path}/employees/xlses`

// 修改员工信息
export const changeaddemployeesApi = params => request.put(`${path}/employees/${params.id}`, params)

// 删除员工信息
export const deleteaddemployeesApi = params => request.delete(`${path}/employees/${params.id}`, {params})

// 批量删除员工信息
export const AlldeleteaddemployeesApi = params => request.delete(`${path}/employees`, {params})


// 获取权限列表
export const permissionsApi = params => request.get(`${path}/permissions`, {params: params})

// 重新加载权限列表
export const loadpermissionsApi = params => request.post(`${path}/permissions`, {params: params})

// 删除权限数据
export const deletepermissionsApi = params => request.delete(`${path}/permissions/${params.id}`, {params})

// 获取角色列表
export const RolesApi = params => request.get(`${path}/roles`, {params: params})

//添加角色
export const AddrolesApi = params => request.post(`${path}/roles`, params)

// 删除角色
export const deleteAddrolesApi = params => request.delete(`${path}/roles/${params.id}`, params)

// 修改角色
export const changeAddrolesApi = params => request.put(`${path}/roles/${params.id}`, params)

// 获取字典目录
export const systemDictionariesApi = params => request.get(`${path}/systemDictionaries`, {params: params})

// 添加字典目录
export const addsystemDictionariesApi = params => request.post(`${path}/systemDictionaries`, params)

// 编辑字典目录
export const changesystemDictionariesApi = params => request.put(`${path}/systemDictionaries/${params.id}`, params)

// 获取字典明细
export const systemDictionaryItemsApi = params => request.get(`${path}/systemDictionaryItems`, {params: params})

// 添加字典明细
export const addsystemDictionaryItemsApi = params => request.post(`${path}/systemDictionaryItems`, params)

//编辑字典明细
export const changesystemDictionaryItemsApi = params => request.put(`${path}/systemDictionaryItems/${params.id}`, params)

// 删除字典明细
export const deletesystemDictionaryItemsApi = params => request.delete(`${path}/systemDictionaryItems/${params.id}`, params)

// 获取客户列表
export const customersApi = params => request.get(`${path}/customers`, {params: params})

//市场专员查询
export const marketApi = params => request.get(`${path}/employees/market`, {params: params})

// 潜在客户添加
export const addcustomersApi = params => request.post(`${path}/customers`, params)

//潜在客户编辑
export const changecustomersApi = params => request.put(`${path}/customers/${params.id}`, params)

//潜在客户跟进
export const customerTraceHistoriesApi = params => request.post(`${path}/customerTraceHistories`, params)

//潜在客户移交
export const customerTransfersApi = params => request.post(`${path}/customerTransfers`, params)

// 修改潜在客服状态
export const gaicustomersApi = params => request.patch(`${path}/customers/${params.id}`, params)




