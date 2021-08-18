import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import {getPosts} from "../api/posts";
import {IPosts} from "../types/types";
import {Box, FormControl, Icon, Input, InputAdornment, InputLabel} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import CustomList from "../components/CustomList";
import PostItem from "../components/PostItem";

const useStyles = makeStyles({
    root: {
        width: '20%',
        padding: 5,
        margin: 5
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

    useEffect(() => {
        fetchPosts().then(resolve => setPosts(resolve.data)).catch(e => alert(e))
    }, [])

    async function fetchPosts() {
        return await getPosts('https://jsonplaceholder.typicode.com/posts?_limit=10')
    }

    const removeItem = (id:number)=> {
        setPosts(posts.filter(item => item.id !== id))
    }
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))

    const classes = useStyles();
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <FormControl className={classes.input} size='medium'>
                    <InputLabel htmlFor="input-with-icon-adornment">Поиск</InputLabel>
                    <Input
                        onChange={e=> setSearch(e.target.value)}
                        value={search}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button color='primary' variant="contained" endIcon={<AddIcon/>}
                        className={classes.addBtn}>Добавить</Button>
            </Box>


            <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                <CustomList items={filteredPosts} renderItem={(post: IPosts) =>
                    <PostItem key={post.id} post={post} removeItem={removeItem}/>
                } />
            </Box>

        </>
    );
};

export default Posts;