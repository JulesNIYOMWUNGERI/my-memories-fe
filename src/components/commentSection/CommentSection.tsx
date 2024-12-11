import { Avatar, Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import { apis } from '../../store/apis';
import { deepPurple } from '@mui/material/colors';

const CommentSection = ({ postId }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState('')

  const { 
    data,
    comments
  } = useSelector((state: RootState) =>  ({
    data: state.signin.data,
    comments: state.getComments.comments,
  }));

  const user = data;

  const handleClick = async() => {
    const data = {
      comment: comment,
      id: postId,
      token: user?.access_token
    }
    await dispatch(apis?.commentPost(data) as any);
    await dispatch(apis?.getComments(postId) as any)

    setComment('');

    commentsRef?.current!.scrollIntoView({ behavior:'smooth'})
  }

  useEffect(() => {
    if (postId) {
      dispatch(apis?.getComments(postId) as any)
    }
  }, [postId]);

  return (
    <div>
        <div className='flex flex-col-reverse justify-between gap-5'>
            <div className='max-h-[200px] overflow-y-auto mr-[30px] flex flex-col gap-2 custom-scrollbar'>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments?.length > 0 ? comments.map((c: { message: string, creator: { firstName: string, lastName: string, image: string } }, i: number) => (
                  <Box 
                    key={i} 
                    display="flex" 
                    justifyContent="start" 
                    alignItems="flex-start" 
                    gap="5px"
                    sx={{ width: 'auto' }}
                  >
                    <Avatar 
                      sx={{
                        bgcolor: deepPurple[500], 
                        color: theme.palette.getContrastText(deepPurple[500]),
                        width: '27px',
                        height: '27px'
                      }} 
                      alt={c.creator.firstName} 
                      src={c.creator.image}
                    >
                      <Typography 
                        sx={{ color: '#ffffff',
                          fontSize: '12px',
                          display: 'flex',
                          justifyItems: 'center',
                          alignItems: 'center' 
                        }}
                      >
                        {c.creator.firstName.charAt(0)}
                      </Typography>
                    </Avatar>
                    <Typography 
                      variant="subtitle2" 
                      component="p"
                      sx={{ color: '#cccccc', marginTop: '3px' }}
                    >
                      {c.creator.firstName} {c.creator.lastName} <strong className='text-[#6d6d6d]'>{c.message}</strong>
                    </Typography>
                  </Box>
                )) : (
                  <div className='flex'>
                    <h1 className='text-[#88888886] ml-3'>Be the first to share your thoughts—no comments here yet!</h1>
                  </div>
                )}
                <div ref={commentsRef}/>
            </div>
            {user?.access_token && (
            <div style={{ width:'93%' }}>
                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <TextField
                    fullWidth
                    minRows={4}
                    variant='outlined'
                    label='Comment'
                    multiline
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                 />
                 <Button style={{ marginTop:'10px' }} fullWidth disabled={!comment} variant='contained' color='secondary' onClick={handleClick}>
                    Comment
                 </Button>
            </div>
            )}
        </div>
    </div>
  )
}

export default CommentSection
