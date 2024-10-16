import { useAppDispatch, useAppSelector } from "app/store"
import { login, selectIsLoginIn } from "features/auth/model/authSlice"
import { useFormik } from "formik"
import { BaseResponse } from "common/types/types"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoginIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      //проверка фронта для ввода корректного мэйла и пароля, без запроса на сервер
      if (!values.email.trim()) {
        errors.email = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password.trim()) {
        errors.password = "Required"
      } else if (values.password.length < 4) {
        errors.password = "Must be more 4 symbols"
      }
      return errors
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(login({ values }))
        //.unwrap() используем в Redux Toolkit , читать документацию. санка createAsyncThunk возвращает всегда зарезолвленный промис
        .unwrap()
        //проверка из зарежджектного промиса для ввода корректного мэйла и пароля
        .catch((error: BaseResponse) => {
          if (error.fieldsErrors) {
            error.fieldsErrors.forEach((el) => formikHelpers.setFieldError(el.field, el.error))
          }
        })
      //formik.resetForm()
    },
  })
  return { isLoggedIn, formik }
}
