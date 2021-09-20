import React, { useEffect, useRef, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useHistory } from 'react-router-dom'

import '../../App.css'
import { getAuth, signOut } from 'firebase/auth'
import { setAlert } from '../../store/action-creators/alert'

import { useActions } from '../../helpers/hooks/useActions'

import firebase from 'firebase/compat/app'

import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'
import Breadcrumb from '../BreadCrumb'
import { Box } from '@mui/material'

const drawerWidth = 275

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowX: 'hidden',
    height: '100vh',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  content: {
    flexGrow: 1,
    height: '100%',
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

interface MainProps {
  currentUser: firebase.User
  switchMode: () => void
  isDarkMode: boolean
}

export default function Dashboard({
  currentUser,
  switchMode,
  isDarkMode,
}: MainProps) {
  const classes = useStyles()
  const [isOpenBar, setIsOpenBar] = useState<boolean>(true)
  const [label, setLabel] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)

  const userRef = useRef<string | null>()
  const history = useHistory()

  const { setAlert } = useActions()

  userRef.current = currentUser.displayName

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

  const handleVisibilityBar = () => setIsOpenBar(!isOpenBar)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        classes={classes}
        isOpenBar={isOpenBar}
        handleVisibilityBar={handleVisibilityBar}
        handleLogout={handleLogout}
        handleGoHome={handleGoHome}
        label={label}
        swapRouteToAdmin={swapRouteToAdmin}
        switchMode={switchMode}
        isDarkMode={isDarkMode}
      />
      <Sidebar
        classes={classes}
        isOpenBar={isOpenBar}
        handleVisibilityBar={handleVisibilityBar}
        isAdmin={isAdmin}
        userRef={userRef}
      />
      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        <Breadcrumb handleGoHome={handleGoHome} />
        <Main classes={classes} />
      </Box>
    </div>
  )
}
