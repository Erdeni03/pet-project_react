import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getPosts} from "../api/posts";
import {IPosts} from "../types/types";
import {Box, FormControl, Input, InputAdornment, InputLabel, Snackbar} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import CustomList from "../components/CustomList";
import PostItem from "../components/PostItem";
import CustomModal from "../components/CustomModal";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        padding: '16px',

    },

    input: {
        width: 300,
        marginBottom: 12
    },

    addBtn: {
        height: '70%',
        marginRight: 20
    },
    title: {
        fontSize: 14,
        marginBottom: 12,
    },

});

const Posts = () => {

    const [posts, setPosts] = useState<IPosts[]>([])
    const [search, setSearch] = useState<string>('')
    const [newPost, setNewPost] = useState<{ title: string, body: string }>({title: '', body: ''})
    const [showAlert, setShowAlert] = useState<boolean>(false)

    useEffect(() => {
        fetchPosts().then(resolve => setPosts(resolve.data)).catch(e => alert(e))
    }, [])

    async function fetchPosts() {
        return await getPosts('https://jsonplaceholder.typicode.com/posts?_limit=10')
    }

    const removeItem = (id: number) => {
        setPosts(posts.filter(item => item.id !== id))
    }
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))


    const [open, setOpen] = React.useState(false);

    const createPost = () => {
        const addCreatePost = {
            ...newPost,
            id: Date.now()
        }
        setPosts([...posts, addCreatePost])
        setShowAlert(true)
        setNewPost({title: '', body: ''})
        setOpen(false);
        setTimeout(() => setShowAlert(false), 1500)
    }


    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Snackbar open={showAlert} anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={6000}
                      onClose={() => setShowAlert(false)}>
                <Alert onClose={() => setShowAlert(false)} severity="success">
                    Пост успешно создан!!
                </Alert>
            </Snackbar>
            <Box display='flex' justifyContent='space-between'>
                <FormControl className={classes.input} size='medium'>
                    <InputLabel htmlFor="input-with-icon-adornment">Поиск</InputLabel>
                    <Input
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button onClick={() => setOpen(true)} color='primary' variant="contained" endIcon={<AddIcon/>}
                        className={classes.addBtn}>Добавить</Button>

            </Box>

            <CustomModal label='Создание нового поста' actionBtn={createPost} open={open}
                         setOpen={setOpen}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Заголовок"
                    type="email"
                    fullWidth
                    value={newPost?.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Описание"
                    type="email"
                    fullWidth
                    value={newPost?.body}
                    onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                />
            </CustomModal>
            <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                <CustomList items={filteredPosts} renderItem={(post: IPosts) =>
                    <PostItem key={post.id} post={post} removeItem={removeItem}/>
                }/>
            </Box>

        </div>
    );
};

export default Posts;