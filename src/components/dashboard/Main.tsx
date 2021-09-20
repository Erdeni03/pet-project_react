import React, { FC } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Paper from '@material-ui/core/Paper'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../routes'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { Link as MaterialLink } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Home from '../../pages/Home'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <MaterialLink color="inherit" href="https://material-ui.com/">
//         Your Website
//       </MaterialLink>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

interface MainProps {
  classes: ClassNameMap
}

const Main: FC<MainProps> = ({ classes }) => {
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            {/* <Paper className={fixedHeightPaper}> */}
            <TransitionGroup className={fixedHeightPaper} component={Paper}>
              <Switch>
                <Route path={'/'} exact>
                  {({ match }) => (
                    <CSSTransition
                      timeout={1000}
                      classNames="item"
                      unmountOnExit
                      in={match != null}
                    >
                      <Home />
                    </CSSTransition>
                  )}
                </Route>
                {routes.testTasks.map((route) => {
                  return (
                    <Route key={route.url} path={route.url} exact>
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
                {routes.admin.map((route) => {
                  return (
                    <Route key={route.url} path={route.url} exact>
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
                {routes.miniProjects.map((route) => {
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
                {routes.bigProjects.map((route) => {
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
                <Redirect to={'/'} />
                {/* <Route component={NotFound} /> */}
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
        {/* <Box pt={4}> */}
        {/*  <Copyright /> */}
        {/* </Box> */}
      </Container>
    </main>
  )
}

export default Main
