import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { AuthState } from '../store/reducers/authReducer';
import { RootState } from '../store/reducers';
import { disableAuth, setAuth } from '../store/action-creators/auth';
import firebase from 'firebase/compat/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import CustomAlert from '../components/UI/CustomAlert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
}));

interface HomeProps {
  id?: number;
}

type Props = HomeProps & AuthState & typeof mapDispatchToProps;
// "prettier/react" "plugin:prettier/recommended",
const Login = ({ isAuth, setAuth, disableAuth }: Props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    console.log(auth, 'authauthauthauth');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential;

        setIsAlert(true);
        setAuth();
        console.log(isAlert, 'isAlertisAlertisAlert');
        // setTimeout(() => {
        //   setAuth();
        // }, 1000);

        console.log(user, 'user');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setIsAlert(true);
          // disableAuth();
        }
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, 'useruseruseruseruseruseruseruseruseruser2');
        const uid = user.uid;

        console.log(uid, 'uiduiduiduiduiduiduid');
      }
    });
  };
  //
  useEffect(() => {
    console.log(isAuth, 'isAuth33333333333');
  }, [isAuth]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CustomAlert isOpen={isAlert} text={'xyevo'} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Почтовый ящик"
            name="email"
            autoComplete="email"
            autoFocus
            error
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              <Link href="#" variant="body2">
                Забыл пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
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
  );
};
// ownProps: HomeProps
const mapStateToProps = (state: RootState): AuthState => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = {
  setAuth,
  disableAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
