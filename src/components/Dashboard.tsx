import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Counter from "../pages/Counter";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BrushIcon from '@material-ui/icons/Brush';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {Link as MaterialLink} from "@material-ui/core";
import {Link, Redirect, Route, Switch} from 'react-router-dom'
import Posts from "../pages/Posts";
import Users from "../pages/Users";
import PaintOnline from "../pages/PaintOnline";



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
    );
}

const drawerWidth = 240;

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
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    paper: {

        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: '75vh',
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />

                    </IconButton>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Training mini-projects
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                {/*    TODO добавить DarkMOde*/}
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
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to='/counter'>
                        <ListItemIcon>
                            <AddCircleOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Счетчик" />
                    </ListItem>

                    <ListItem button component={Link} to='/posts'>
                        <ListItemIcon>
                            <ListAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Посты" />
                    </ListItem>

                    <ListItem button component={Link} to='/users'>
                        <ListItemIcon>
                            <ListAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Пользователи" />
                    </ListItem>

                    <ListItem button component={Link} to='/paint-online'>
                        <ListItemIcon>
                            <BrushIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Paint-online" />
                    </ListItem>

                </List>
                <Divider />
                {/*<List>aaaaa</List>*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <Switch>
                                    <Route path='/counter' exact>
                                        <Counter/>
                                    </Route>
                                    <Route path='/posts' exact>
                                        <Posts/>
                                    </Route>
                                    <Route path='/users' exact>
                                        <Users/>
                                    </Route>
                                    <Route path='/paint-online/:id' exact>
                                        <PaintOnline/>
                                    </Route>
                                    <Redirect to={`/paint-online/f${(+new Date).toString(16)}`}/>
                                </Switch>

                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
{/*                        <Grid item xs={12} md={4} lg={3}>*/}
{/*                            <Paper className={fixedHeightPaper}>*/}
{/*aadddddddddd*/}
{/*                            </Paper>*/}
{/*                        </Grid>*/}
                        {/* Recent Orders */}
{/*                        <Grid item xs={12}>*/}
{/*                            <Paper className={classes.paper}>*/}
{/*dsdsds*/}
{/*                            </Paper>*/}
{/*                        </Grid>*/}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}