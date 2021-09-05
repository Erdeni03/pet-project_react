import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

const NotFound = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant={'h1'}>404 NotFound</Typography>
    </div>
  )
}

export default NotFound
