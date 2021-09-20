import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import MaterialLink from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'

import { RootState } from '../../store/reducers'
import { disableAuth, setAuth } from '../../store/action-creators/auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setAlert } from '../../store/action-creators/alert'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory, Link } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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

interface HomeProps {
  id?: number
}

type Props = HomeProps & LinkProps & typeof mapDispatchToProps

const Login = ({ setAuth, setAlert }: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Поле email обязательный'),
    password: yup
      .string()
      .min(6, 'Пароль должен состоять минимум из 8 символов')
      .required('Поле password обязательный'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signInWithFirebase(values)
    },
  })

  const signInWithFirebase = (values: { email: string; password: string }) => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setAlert({
          isOpen: true,
          text: 'Вход в систему успешно пройден!!',
          variant: 'success',
        })

        setAuth()
        history.push('/')
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setAlert({
            isOpen: true,
            text: 'Такого пользователя не существует!',
            variant: 'error',
          })
          // disableAuth();
        } else if (error.code === 'auth/wrong-password') {
          setAlert({
            isOpen: true,
            text: 'Введен неверный пароль. Повторите попытку.',
            variant: 'error',
          })
        }
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в систему
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
            label="Email"
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
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

// ownProps: HomeProps

interface LinkProps {
  isAuth: boolean | null
}

const mapStateToProps = (state: RootState): LinkProps => {
  return {
    isAuth: state.auth.isAuth,
  }
}

const mapDispatchToProps = {
  setAuth,
  disableAuth,
  setAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
