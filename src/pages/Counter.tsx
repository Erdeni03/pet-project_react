import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
}))

const Counter = () => {
  const classes = useStyles()

  const [counter, setCounter] = useState<number>(0)
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100%' }}
    >
      <div>
        <Typography variant="h2" gutterBottom>
          Счетчик{' '}
          <span className={counter >= 0 ? classes.green : classes.red}>
            {counter}
          </span>
        </Typography>
      </div>

      <div className={classes.root}>
        <Button
          onClick={() => setCounter(counter + 1)}
          variant="contained"
          color="primary"
        >
          +
        </Button>
        <Button
          onClick={() => setCounter(counter - 1)}
          variant="contained"
          color="secondary"
        >
          -
        </Button>
      </div>
    </Box>
  )
}

export default Counter
