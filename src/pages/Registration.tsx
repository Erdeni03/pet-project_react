import React from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MaterialLink from '@material-ui/core/Link'
import { Link, useHistory } from 'react-router-dom'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Registration = () => {
  const classes = useStyles()

  const history = useHistory()

  const validationSchema = yup.object({
    displayName: yup
      .string()
      .min(3, 'Слишком коротко!')
      .max(15, 'Должно быть не более 15 символов')
      .required('Обязательное поле'),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле email обязательный'),
    password: yup
      .string()
      .min(6, 'Пароль должен состоять минимум из 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают. Повторите попытку')
      .required('Обязательное поле'),
  })

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUserWithFirebase(values)
    },
  })

  const createUserWithFirebase = (values: {
    displayName: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // @ts-ignore
        updateProfile(user, {
          displayName: values.displayName,
          photoURL: '/avatar-default.png',
        })
        history.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode, 'errorCodeerrorCode')
        const errorMessage = error.message
        console.log(errorMessage, 'errorMessageerrorMessage')
        // ..
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <CustomAlert isOpen={isAlert} text={'xyevo'} /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Имя пользователя"
            id="displayName"
            name="displayName"
            autoFocus
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
            value={formik.values.displayName}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Эл. почта"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          {/* <FormControlLabel */}
          {/*  control={<Checkbox value="remember" color="primary" />} */}
          {/*  label="Запомнить меня" */}
          {/* /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <MaterialLink href="#" variant="body2">
                Забыл пароль?
              </MaterialLink>
            </Grid>
            <Grid item>
              <Link to={'/registration'}>
                {'Нет аккаунта? Зарегистрируйся'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}> */}
      {/*  <Copyright /> */}
      {/* </Box> */}
    </Container>
  )
}

export default Registration
