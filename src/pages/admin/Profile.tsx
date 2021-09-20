import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useTypedSelector } from '../../helpers/hooks/useTypedSelector'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const Profile = () => {
  const classes = useStyles()
  const { currentUser } = useTypedSelector((state) => state.auth)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar alt="Remy Sharp" src={currentUser?.photoURL || ''} />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Имя пользователя: {currentUser?.displayName}
        </Typography>
        <Typography variant="h5" component="h2">
          Email: {currentUser?.email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Ваш id: {currentUser?.uid}
        </Typography>
        <Typography variant="body2" component="p">
          Аккаунт был создан: {currentUser?.metadata.creationTime}
          {/* <br /> */}
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Изменить</Button>
      </CardActions>
    </Card>
  )
}

export default Profile
