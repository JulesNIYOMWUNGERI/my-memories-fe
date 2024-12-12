import { Alert, Button, CircularProgress, Paper, Snackbar, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { apis } from '../../store/apis';
import { RootState } from '../../store/store';
import { useFormik } from 'formik';
import { PostFormValidationSchema } from '../validation/Validations';

const Form = ({ currentId, setCurrentId }: any) => {
  const theme = useTheme();
  const [postData, setPostData] = useState({ selectedFile: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
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
    if (post) {
      setPostData({ selectedFile: post?.selectedFile })
      formik.setValues({
        title: post?.title,
        description: post?.description,
        tags: post?.tags.join(', '),
      })
    };
  }, [post]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      tags: '',
    },
    validationSchema: PostFormValidationSchema,
    onSubmit: async (values) => {
      if (postData?.selectedFile) {
        const formData = {
          ...values,
          selectedFile: postData?.selectedFile,
          tags: values?.tags.split(',')
        }

        if (currentId === 0) {
          const data = {
            formData,
            token: user?.access_token
          }
          await dispatch(apis?.createPost(data) as any);
          await dispatch(apis?.getPosts('1') as any)
          formik.resetForm();
        } else {
          const data = {
            updatedPost: formData,
            token: user?.access_token,
            postId: post?.id
          }
          await dispatch(apis?.updatePost(data) as any);
          await dispatch(apis?.getPosts('1') as any)
          formik.resetForm();
        }

      } else {
        console.log('file is missing================')
        setSnackbarMessage('Image is not added');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  });

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
      <form autoComplete="off" noValidate className={`flex flex-wrap gap-2 justify-center`} onSubmit={formik?.handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <div className="w-full h-[80px] flex flex-col justify-start items-start p-2">
          <TextField
            name="title" 
            variant="outlined" 
            label="Title" 
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="flex px-[3px] text-[9px] text-center text-red-600 self-stretch">
              {formik.errors.title}
            </p>
          ) : null}
        </div>
        <div className="w-full  flex flex-col justify-start items-start p-2">
          <TextField
            name="description" 
            variant="outlined" 
            label="Message" 
            fullWidth 
            multiline 
            minRows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="flex px-[3px] text-[9px] text-center text-red-600 self-stretch">
              {formik.errors.description}
            </p>
          ) : null}
        </div>
        <div className="w-full h-[80px] flex flex-col justify-start items-start p-2">
          <TextField
            name="tags" 
            variant="outlined" 
            label="Tags (coma separated)" 
            fullWidth
            value={formik.values.tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tags && formik.errors.tags ? (
            <p className="flex px-[3px] text-[9px] text-center text-red-600 self-stretch">
              {formik.errors.tags}
            </p>
          ) : null}
        </div>
        <div className='w-[97%] my-2.5'>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }: { base64: string }) => setPostData({ ...postData, selectedFile: base64 })} 
          />
        </div>
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
          onClick={() => formik.resetForm()} 
          fullWidth
        >
          Clear
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default Form