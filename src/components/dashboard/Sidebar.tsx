import React, { FC, MutableRefObject, useState } from 'react'
import clsx from 'clsx'
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { routes } from '../../routes'
import { Link } from 'react-router-dom'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import Drawer from '@material-ui/core/Drawer'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { Fade } from 'react-awesome-reveal'

interface SidebarProps {
  classes: ClassNameMap
  userRef: MutableRefObject<string | null | undefined>
  isAdmin: boolean | null
  handleVisibilityBar?: () => void
  isOpenBar: boolean
}

const Sidebar: FC<SidebarProps> = ({
  classes,
  userRef,
  isAdmin,
  isOpenBar,
  handleVisibilityBar,
}) => {
  const [isOpenMiniProjects, setIsOpenMiniProjects] = useState(false)
  const [isOpenMediumProjects, setIsOpenMediumProjects] = useState(false)
  const [isOpenTestProjects, setIsOpenTestProjects] = useState(false)

  const adminPanel = routes.admin.map((route) => {
    return (
      route.isVisible && (
        <Fade
          key={route.url}
          delay={route.label === 'Настройки' ? 400 : undefined}
          direction="left"
          cascade
        >
          <ListItem button component={Link} to={route.url}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.label} />
          </ListItem>
        </Fade>
      )
    )
  })
  const projectList = (
    <>
      <Fade direction="left">
        <ListItem
          button
          onClick={() => setIsOpenMiniProjects(!isOpenMiniProjects)}
        >
          {!isOpenBar ? (
            <Tooltip
              title={<Typography>mini-projects</Typography>}
              placement={'right'}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
            </Tooltip>
          ) : (
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
          )}
          <ListItemText primary="Маленькие-проекты" />
          {isOpenMiniProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Fade>
      <Collapse in={isOpenMiniProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.miniProjects.map((route) => {
            return (
              route.isVisible && (
                <Fade key={route.url} direction={'up'}>
                  <ListItem
                    button
                    component={Link}
                    to={route.url}
                    className={classes.nested}
                  >
                    {!isOpenBar ? (
                      <Tooltip
                        title={<Typography>{route.label}</Typography>}
                        placement="right"
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                      </Tooltip>
                    ) : (
                      <>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.label} />
                      </>
                    )}
                  </ListItem>
                </Fade>
              )
            )
          })}
        </List>
      </Collapse>
      <Divider />
      <Fade delay={300} direction="left" cascade>
        <ListItem
          button
          onClick={() => setIsOpenMediumProjects(!isOpenMediumProjects)}
        >
          {!isOpenBar ? (
            <Tooltip
              title={<Typography>medium-projects</Typography>}
              placement={'right'}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
            </Tooltip>
          ) : (
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
          )}
          <ListItemText primary="Большие-проекты" />
          {isOpenMediumProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Fade>
      <Collapse in={isOpenMediumProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.bigProjects.map((route) => {
            return (
              route.isVisible && (
                <Fade key={route.url} direction={'up'}>
                  <ListItem
                    button
                    component={Link}
                    to={route.url}
                    className={classes.nested}
                  >
                    {!isOpenBar ? (
                      <Tooltip
                        title={<Typography>{route.label}</Typography>}
                        placement="right"
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                      </Tooltip>
                    ) : (
                      <>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.label} />
                      </>
                    )}
                  </ListItem>
                </Fade>
              )
            )
          })}
        </List>
      </Collapse>
      <Divider />
      <Fade delay={500} direction="left" cascade>
        <ListItem
          button
          onClick={() => setIsOpenTestProjects(!isOpenTestProjects)}
        >
          {!isOpenBar ? (
            <Tooltip
              title={<Typography>test-tasks</Typography>}
              placement={'right'}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
            </Tooltip>
          ) : (
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
          )}
          <ListItemText primary="test-tasks" />
          {isOpenTestProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Fade>
      <Collapse in={isOpenTestProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.testTasks.map((route) => {
            return (
              route.isVisible && (
                <Fade key={route.url} direction={'up'}>
                  <ListItem
                    button
                    component={Link}
                    to={route.url}
                    className={classes.nested}
                  >
                    {!isOpenBar ? (
                      <Tooltip
                        title={<Typography>{route.label}</Typography>}
                        placement="right"
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                      </Tooltip>
                    ) : (
                      <>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.label} />
                      </>
                    )}
                  </ListItem>
                </Fade>
              )
            )
          })}
        </List>
      </Collapse>
    </>
  )

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isOpenBar && classes.drawerPaperClose
        ),
      }}
      open={isOpenBar}
    >
      <div className={classes.toolbarIcon}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User" style={{ marginLeft: 5, marginRight: 5 }}>
            {/* {currentUser?.photoUrl} */}
            <PersonIcon fontSize={'large'} />
          </Avatar>
          <Typography variant={'h5'}>{userRef.current}</Typography>
        </div>

        <IconButton onClick={handleVisibilityBar}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      <List>{isAdmin ? adminPanel : projectList}</List>
    </Drawer>
  )
}

export default Sidebar
