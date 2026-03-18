export interface CreateDepartmentDTO{
  name:string,
  imgURl: string,
  collegeId: number
}

export interface DepartmentCreateResponse{
  succsess: boolean,
  message: string,
  data: null,
}

export interface Department {
  id: number,
  name: string,
  imgUrl: string | null,
  collegeId: number,
  collegeName: string
}

export interface DepartmentPage {
  page: number,
  size: number,
  totalPage: number,
  totalElements: number,
  body: Department[]
}

export interface DepartmentPageParams {
  page:number,
  size: number,
  name?: string,
  collegeId?: number
}

export interface DepartmentPageResponse {
  success: boolean,
  message: string,
  data: DepartmentPage;
}

export interface DepartmentListResponse {
  seccess: boolean,
  message: string,
  data: Department[]
}

export interface UpdateDepartmentDTO {
  name: string,
  imgUrl?: string,
  collegeId: number
}
