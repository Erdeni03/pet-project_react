import React from 'react'
import Counter from '../pages/Counter'
import Posts from '../pages/Posts'
import Users from '../pages/Users'
import PaintOnline from '../pages/PaintOnline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ListAltIcon from '@material-ui/icons/ListAlt'
import BrushIcon from '@material-ui/icons/Brush'
// eslint-disable-next-line import/namespace
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

export const adminRoutes = [
  {
    url: '/admin/profile',
    label: 'Профиль',
    icon: null,
    component: <Profile />,
    visibility: true,
  },
  {
    url: '/admin/settings',
    label: 'Настройки',
    icon: null,
    component: <Settings />,
    visibility: true,
  },
]
export const dashBoardRoutes = [
  {
    url: '/',
    label: 'Главная',
    icon: null,
    component: <Home />,
    visibility: false,
    isAdmin: false,
  },
  {
    url: '/admin/settings',
    label: 'Настройки',
    icon: null,
    component: <Settings />,
    visibility: true,
    isAdmin: true,
  },
  {
    url: '/admin/profile',
    label: 'Profile',
    icon: null,
    component: <Profile />,
    visibility: true,
    isAdmin: true,
  },
  {
    url: '/counter',
    label: 'Счетчик',
    icon: <AddCircleOutlineIcon />,
    component: <Counter />,
    visibility: true,
    isAdmin: false,
  },
  {
    url: '/posts',
    label: 'Посты',
    icon: <ListAltIcon />,
    component: <Posts />,
    visibility: true,
    isAdmin: false,
  },
  {
    url: '/users',
    label: 'Пользователи',
    icon: <ListAltIcon />,
    component: <Users />,
    visibility: true,
    isAdmin: false,
  },
  {
    url: '/paint-online/:id',
    label: 'Рисовалка',
    icon: <BrushIcon />,
    component: <PaintOnline />,
    visibility: true,
    isAdmin: false,
  },
]

export const authRoutes = [
  { url: '/login', component: <Login /> },
  { url: '/registration', component: <Registration /> },
]
