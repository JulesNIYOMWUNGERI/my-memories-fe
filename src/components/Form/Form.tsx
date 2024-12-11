import { Button, CircularProgress, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { apis } from '../../store/apis';
import { RootState } from '../../store/store';

const Form = ({ currentId, setCurrentId }: any) => {
  const theme = useTheme();
  const [postData, setPostData] = useState({ title: '', description: '', tags: '', selectedFile: '' });
  const post = useSelector((state: RootState) => (currentId ? state.getPosts.posts.find((post: any) => post.id === currentId) : null));
  const dispatch = useDispatch();
  const history = useNavigate();

  const { 
    saving,
    updating,
    data
  } = useSelector((state: RootState) =>  ({
    saving: state.createPost.saving,
    updating: state.updatePost.updating,
    data: state.signin.data,
  }));

  const user = data;

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', description: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (currentId === 0) {
      const data = {
        postData,
        token: user?.access_token
      }
      await dispatch(apis?.createPost(data) as any);
      await dispatch(apis?.getPosts('1') as any)
      clear();
    } else {
      const data = {
        updatedPost: postData,
        token: user?.access_token,
        postId: post?.id
      }
      await dispatch(apis?.updatePost(data) as any);
      await dispatch(apis?.getPosts('1') as any)
      clear();
    }
  };

  if(!user?.userInfo?.email) {
    return (
    <Paper style={{ padding: theme.spacing(2) }}>
      <Typography variant='h6' align='center' >
        Please signIn to create your own post and like other's posts 
      </Typography>
    </Paper>
    )
  }

  return (
    <Paper style={{ padding: theme.spacing(2), paddingBottom: '2' }} elevation={6}>
      <form autoComplete="off" noValidate className={`flex flex-wrap gap-2 justify-center`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField style={{ padding: theme.spacing(1) }} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField style={{ padding: theme.spacing(1) }} name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <TextField style={{ padding: theme.spacing(1) }} name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e: any) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className='w-[97%] my-2.5'><FileBase type="file" multiple={false} onDone={({ base64 }: { base64: string }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button 
          className='mb-10' 
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit" 
          fullWidth
        >
          {saving || updating ? (
            <CircularProgress size={24} sx={{ color: 'white' }} /> // Display a loading spinner
          ) : (
            'Submit'
          )}
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          size="small" 
          onClick={clear} 
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form