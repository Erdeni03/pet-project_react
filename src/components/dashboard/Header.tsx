import React, { FC } from 'react'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import { Tooltip } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Divider from '@material-ui/core/Divider'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AppBar from '@material-ui/core/AppBar'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface HeaderProps {
  classes: ClassNameMap
  isOpenBar: boolean
  handleVisibilityBar: () => void
  handleGoHome: () => void
  handleLogout: () => void
  swapRouteToAdmin: () => void
  label: string
  switchMode: () => void
  isDarkMode: boolean
}
const Header: FC<HeaderProps> = ({
  classes,
  isOpenBar,
  handleVisibilityBar,
  handleLogout,
  handleGoHome,
  label,
  swapRouteToAdmin,
  switchMode,
  isDarkMode,
}) => {
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, isOpenBar && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleVisibilityBar}
          className={clsx(
            classes.menuButton,
            isOpenBar && classes.menuButtonHidden
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
          <NavLink
            to="/"
            onClick={handleGoHome}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <HomeIcon
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
        <Tooltip title={'Переключить светлую/темную тему'} aria-label="add">
          <IconButton color="inherit" onClick={switchMode}>
            {isDarkMode ? <Brightness5Icon /> : <Brightness6Icon />}
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
          Admin
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
  )
}

export default Header
