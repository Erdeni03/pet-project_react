import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

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

const CustomLoader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress style={{ width: 84, height: 84 }} />
    </div>
  )
}

export default CustomLoader
