import { BaseResponse } from "common/types/types"
import { instance } from "common/instance/instance"
import { LoginParamsType } from "features/auth/api/authApi.types"

export const authAPI = {
  login(value: LoginParamsType) {
    return instance.post<BaseResponse<{ userId?: number }>>("auth/login", value)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
