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

export const dashBoardRoutes = [
  {
    url: '/',
    label: 'Главная',
    icon: null,
    component: <Home />,
    visibility: false,
  },

  {
    url: '/counter',
    label: 'Счетчик',
    icon: <AddCircleOutlineIcon />,
    component: <Counter />,
    visibility: true,
  },
  {
    url: '/posts',
    label: 'Посты',
    icon: <ListAltIcon />,
    component: <Posts />,
    visibility: true,
  },
  {
    url: '/users',
    label: 'Пользователи',
    icon: <ListAltIcon />,
    component: <Users />,
    visibility: true,
  },
  {
    url: '/paint-online/:id',
    label: 'Рисовалка',
    icon: <BrushIcon />,
    component: <PaintOnline />,
    visibility: true,
  },
]

export const authRoutes = [
  { url: '/login', component: <Login /> },
  { url: '/registration', component: <Registration /> },
]
