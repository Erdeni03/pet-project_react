import React, { FC } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { IPosts } from '../types/types';

const useStyles = makeStyles({
  root: {
    width: '20%',
    padding: 5,
    margin: 5,
  },

  input: {
    width: 300,
    marginBottom: 12,
  },

  addBtn: {
    height: '70%',
    marginRight: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
});

interface PostProps {
  post: IPosts;
  removeItem: (id: number) => void;
}

const PostItem: FC<PostProps> = ({ post, removeItem }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {post.title}
        </Typography>

        <Typography variant="body2" component="p">
          {post.body}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => removeItem(post.id)}
          color="secondary"
          size="small"
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
