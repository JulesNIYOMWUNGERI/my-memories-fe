import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import { apis } from '../../store/apis';
import { RootState } from '../../store/store';

const Posts = ({ setCurrentId }: any) => {
  const dispatch = useDispatch();
  const { 
    fetching,
    posts
  } = useSelector((state: RootState) =>  ({
    fetching: state.getPosts.fetching,
    posts: state.getPosts.posts,
  }));

  useEffect(() => {
    dispatch(apis?.getPosts('1') as any)
  }, []);

  return (
    fetching ? <CircularProgress /> : (
        <Grid className='flex items-center' container alignItems="stretch" spacing={3}>
          {posts.map((post: any) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
    )
  )
}

export default Posts