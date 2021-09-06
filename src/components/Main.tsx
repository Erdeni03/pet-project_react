import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MaterialLink,
  Avatar,
  Tooltip,
} from '@material-ui/core'
import {
  Link,
  Route,
  Switch,
  useHistory,
  NavLink,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { adminRoutes, dashBoardRoutes } from '../routes'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import '../App.css'
import { getAuth, signOut } from 'firebase/auth'
import { setAlert } from '../store/action-creators/alert'
import NotFound from '../pages/NotFound'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

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

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '100%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '82vh',
  },
  page: {
    position: 'absolute',
  },
}))

export default function Main() {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(true)
  const [label, setLabel] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)

  const history = useHistory()
  const location = useLocation()
  const { setAlert } = useActions()
  const { currentUser } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    dashBoardRoutes.forEach((route) => {
      if (history.location.pathname === route.url) {
        setLabel(route.label)
      }
    })
  })

  useEffect(() => {
    if (!localStorage.getItem('admin')) {
      localStorage.setItem('admin', JSON.stringify(isAdmin))
    }
    setIsAdmin(JSON.parse(localStorage.getItem('admin') as string))
  }, [])

  const swapRouteToAdmin = () => {
    localStorage.setItem('admin', JSON.stringify(true))

    setIsAdmin(JSON.parse(localStorage.getItem('admin') as string))
    history.push('/admin/profile')
  }
  const handleGoHome = () => {
    setIsAdmin(false)

    localStorage.setItem('admin', JSON.stringify(false))
    history.push('/')
  }

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setAlert({
          isOpen: true,
          text: 'Bye bye!!',
          variant: 'success',
        })
        history.push('/login')
        // Sign-out successful.
      })
      .catch((error) => {
        setAlert({
          isOpen: true,
          text: error.message,
          variant: 'error',
        })
        // An error happened.
      })
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <HomeIcon
                onClick={handleGoHome}
                fontSize={'large'}
                style={{
                  fontSize: '2.7rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            </NavLink>
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {label}
          </Typography>
          <Tooltip title="Пока это не работает!" aria-label="add">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Пока это не работает!" aria-label="add">
            <IconButton color="inherit">
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
          <Divider
            orientation={'vertical'}
            flexItem={true}
            style={{ width: 1, background: 'white' }}
          />
          <IconButton
            onClick={swapRouteToAdmin}
            color="inherit"
            style={{ marginLeft: 10 }}
          >
            {currentUser?.displayName}
            <Avatar alt="User" style={{ marginLeft: 5 }}>
              {/* {currentUser?.photoUrl} */}
              <PersonIcon fontSize={'large'} />
            </Avatar>
          </IconButton>
          <Divider
            orientation={'vertical'}
            flexItem={true}
            style={{ width: 1, background: 'white' }}
          />
          <IconButton onClick={handleLogout} color="inherit">
            Выйти
            <ExitToAppIcon style={{ marginLeft: 10 }} />
          </IconButton>
          {/*    TODO добавить DarkMOde */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {isAdmin
            ? dashBoardRoutes.map((route) => {
                return (
                  route.visibility &&
                  route.isAdmin && (
                    <ListItem
                      key={route.url}
                      button
                      component={Link}
                      to={route.url}
                    >
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.label} />
                    </ListItem>
                  )
                )
              })
            : dashBoardRoutes.map((route) => {
                return (
                  route.visibility &&
                  !route.isAdmin && (
                    <ListItem
                      key={route.url}
                      button
                      component={Link}
                      to={route.url}
                    >
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.label} />
                    </ListItem>
                  )
                )
              })}
        </List>
        <Divider />
        {/* <List>aaaaa</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              {/* <Paper className={fixedHeightPaper}> */}
              <TransitionGroup className={fixedHeightPaper} component={Paper}>
                <Switch>
                  {dashBoardRoutes.map((route) => {
                    return (
                      <Route
                        key={route.url}
                        path={route.url ? route.url : undefined}
                        exact
                      >
                        {({ match }) => (
                          <CSSTransition
                            key={route.url}
                            timeout={1000}
                            classNames="item"
                            unmountOnExit
                            in={match != null}
                          >
                            {route.component}
                          </CSSTransition>
                        )}
                      </Route>
                    )
                  })}
                  <Route component={NotFound} />
                  <Redirect to={'/'} />
                </Switch>
              </TransitionGroup>

              {/* <Redirect to={history.location.pathname} /> */}

              {/* <Redirect to={`/paint-online/f${(+new Date).toString(16)}`}/> */}
              {/* </Paper> */}
            </Grid>
            {/* Recent Deposits */}
            {/*                        <Grid item xs={12} md={4} lg={3}> */}
            {/*                            <Paper className={fixedHeightPaper}> */}
            {/* aadddddddddd */}
            {/*                            </Paper> */}
            {/*                        </Grid> */}
            {/* Recent Orders */}
            {/*                        <Grid item xs={12}> */}
            {/*                            <Paper className={classes.paper}> */}
            {/* dsdsds */}
            {/*                            </Paper> */}
            {/*                        </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
