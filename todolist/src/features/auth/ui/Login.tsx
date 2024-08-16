import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import { login, selectIsLoginIn } from "features/auth/model/authSlice"
import { useAppDispatch, useAppSelector } from "app/store"
import { Navigate } from "react-router-dom"
import { BaseResponse } from "common/types/types"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
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

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
