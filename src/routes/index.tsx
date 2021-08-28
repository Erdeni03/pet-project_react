import React from "react";
import Counter from "../pages/Counter";
import Posts from "../pages/Posts";
import Users from "../pages/Users";
import PaintOnline from "../pages/PaintOnline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BrushIcon from "@material-ui/icons/Brush";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const dashBoardRoutes = [
    {url: '/counter', label: 'Счетчик', icon: <AddCircleOutlineIcon/>, component: <Counter/>},
    {url: '/posts', label: 'Посты', icon: <ListAltIcon/>, component: <Posts/>},
    {url: '/users', label: 'Пользователи', icon: <ListAltIcon/>, component: <Users/>},
    {url: '/paint-online/:id', label: 'Рисовалка',icon: <BrushIcon/>, component: <PaintOnline/>},
]


export const authRoutes = [
    {url: '/login', component: <Login/>},
    {url: '/registration', component: <Registration/>},
]