import React, { ReactElement } from 'react'
import Counter from '../pages/mini-projects/Counter'
import Posts from '../pages/mini-projects/Posts'
import Users from '../pages/mini-projects/Users'
import PaintOnline from '../pages/mini-projects/PaintOnline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ListAltIcon from '@material-ui/icons/ListAlt'
import BrushIcon from '@material-ui/icons/Brush'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import Login from '../pages/registration/Login'
import Registration from '../pages/registration/Registration'

import Profile from '../pages/admin/Profile'
import Settings from '../pages/admin/Settings'
import WebSockets from '../pages/medium-projects/WebSockets'
import CryptoCurrency from '../pages/test-tasks/CryptoCurrency'
import CatalogProducts from '../pages/test-tasks/appevent'
import TestTasks from '../pages/test-tasks'
import MiniProjects from '../pages/mini-projects'
import Admin from '../pages/admin'
import BigProjects from '../pages/medium-projects'

interface IRoutes {
  url: string
  component: React.ReactNode
  icon?: ReactElement | null
  label?: string
  isVisible?: boolean
}

export const routes: {
  [key: string]: IRoutes[]
} = {
  auth: [
    { url: '/login', component: <Login /> },
    { url: '/registration', component: <Registration /> },
  ],
  admin: [
    {
      url: '/admin',
      label: 'Админ',
      icon: null,
      component: <Admin />,
      isVisible: false,
    },
    {
      url: '/admin/profile',
      label: 'Профиль',
      icon: <AccountBoxIcon />,
      component: <Profile />,
      isVisible: true,
    },
    {
      url: '/admin/settings',
      label: 'Настройки',
      icon: <SettingsIcon />,
      component: <Settings />,
      isVisible: true,
    },
  ],
  miniProjects: [
    {
      url: '/mini-projects',
      label: 'Маленькие проекты',
      icon: null,
      component: <MiniProjects />,
      isVisible: false,
    },
    {
      url: '/mini-projects/counter',
      label: 'Счетчик',
      icon: <AddCircleOutlineIcon />,
      component: <Counter />,
      isVisible: true,
    },
    {
      url: '/mini-projects/posts',
      label: 'Посты',
      icon: <ListAltIcon />,
      component: <Posts />,
      isVisible: true,
    },
    {
      url: '/mini-projects/users',
      label: 'Пользователи',
      icon: <ListAltIcon />,
      component: <Users />,
      isVisible: true,
    },
    {
      url: '/mini-projects/paint-online/:id',
      label: 'Рисовалка',
      icon: <BrushIcon />,
      component: <PaintOnline />,
      isVisible: true,
    },
  ],
  bigProjects: [
    {
      url: '/big-projects',
      label: 'Большие проекты',
      icon: <ListAltIcon />,
      component: <BigProjects />,
      isVisible: false,
    },
    {
      url: '/big-projects/web-socket',
      label: 'WEB',
      icon: <ListAltIcon />,
      component: <WebSockets />,
      isVisible: true,
    },
  ],
  testTasks: [
    {
      url: '/test-tasks',
      label: 'Тестовые задания',
      icon: null,
      component: <TestTasks />,
      isVisible: false,
    },
    {
      url: '/test-tasks/crypto-currency',
      label: 'Криптовалюта',
      icon: <AttachMoneyIcon />,
      component: <CryptoCurrency />,
      isVisible: true,
    },
    {
      url: '/test-tasks/catalog-products',
      label: 'Интернет-магазин',
      icon: <ShoppingCartIcon />,
      component: <CatalogProducts />,
      isVisible: true,
    },
  ],
}

// export const adminRoutes = [
//   {
//     url: '/admin/profile',
//     label: 'Профиль',
//     icon: null,
//     component: <Profile />,
//     visibility: true,
//   },
//   {
//     url: '/admin/settings',
//     label: 'Настройки',
//     icon: null,
//     component: <Settings />,
//     visibility: true,
//   },
// ]
//
// export const dashBoardRoutes = [
//   {
//     url: '/',
//     label: 'Главная',
//     icon: null,
//     component: <Home />,
//     visibility: false,
//     isAdmin: false,
//   },
//   {
//     url: '/admin/profile',
//     label: 'Профиль',
//     icon: <AccountBoxIcon />,
//     component: <Profile />,
//     visibility: true,
//     isAdmin: true,
//   },
//   {
//     url: '/admin/settings',
//     label: 'Настройки',
//     icon: <SettingsIcon />,
//     component: <Settings />,
//     visibility: true,
//     isAdmin: true,
//   },
//
//   {
//     url: '/counter',
//     label: 'Счетчик',
//     icon: <AddCircleOutlineIcon />,
//     component: <Counter />,
//     visibility: true,
//     isAdmin: false,
//   },
//   {
//     url: '/posts',
//     label: 'Посты',
//     icon: <ListAltIcon />,
//     component: <Posts />,
//     visibility: true,
//     isAdmin: false,
//   },
//   {
//     url: '/users',
//     label: 'Пользователи',
//     icon: <ListAltIcon />,
//     component: <Users />,
//     visibility: true,
//     isAdmin: false,
//   },
//   {
//     url: '/paint-online/:id',
//     label: 'Рисовалка',
//     icon: <BrushIcon />,
//     component: <PaintOnline />,
//     visibility: true,
//     isAdmin: false,
//   },
// ]
//
// export const authRoutes = [
//   { url: '/login', component: <Login /> },
//   { url: '/registration', component: <Registration /> },
// ]
