import { CircularProgress, Divider, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';
import { apis } from '../../store/apis';
import CommentSection from '../../components/commentSection/commentSection';

const PostDetails = () => {
  const { 
    post,
    posts,
    fetching
  } = useSelector((state: RootState) => ({
    post: state.getPost.post,
    posts: state.getPosts.posts,
    fetching: state.getPost.fetching,
  }));
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(apis?.getPost(id) as any);
  }, [id]);
  
  const recommendedPosts = posts.filter(({ tags, id }: any) =>
    (tags?.some((t: string) => post?.tags?.includes(t)) || false) && id !== post.id
  ) || [];
  

  const openPost = (id: any) => history(`/posts/${id}`)

  if(!post) return null;

  if(fetching) {
    return (
        <Paper 
            elevation={6} 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '15px',
                height: '39vh',
            }}
        >
            <CircularProgress size="7em" />
        </Paper>
    )
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom: 40 }} elevation={6}>
      <div className='flex w-full flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row justify-center items-start gap-4'>
        <div className='rounded-[20px] flex-1 self-stretch'>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag: string) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection postId={post.id} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className=''>
          <img 
            className='rounded-[20px] object-cover object-center w-full sm:h-[400px] h-auto' 
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
            alt={post.title} 
          />
        </div>
      </div>
      {recommendedPosts.length ? (
        <div className='rounded-[20px] m-[10px] flex-1'>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className='flex flex-col sm:flex-row'>
            {recommendedPosts.map(({ title, description, name, likes, selectedFile, id }: any) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost( id )} key={ id }>
                <Typography gutterBottom variant='h6' >{title}</Typography>
                <Typography gutterBottom variant='subtitle2' >{name}</Typography>
                <Typography gutterBottom variant='subtitle2' >{title}</Typography>
                <Typography gutterBottom variant='subtitle1' >Likes: {likes?.length || 0}</Typography>
                <img src={selectedFile} width='200px' className='h-[135px]' />
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </Paper>
  )
}

export default PostDetails