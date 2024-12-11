import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThumbUpAlt, Delete, MoreHoriz } from '@mui/icons-material';
import moment from 'moment';
import { apis } from '../../../store/apis';
import { RootState } from '../../../store/store';

const Post = ({ post, setCurrentId }: any) => {
  console.log("Post prop:", post);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [likes, setLikes] = useState(post?.likes || []);
  
  const { 
    deleting,
    data
  } = useSelector((state: RootState) =>  ({
    deleting: state.deletePost.deleting,
    data: state.signin.data,
  }));

  const [user, setUser] = useState(data);
  const [deletingId, setDeletingId] = useState('')

  useEffect(()=>{
    setUser(data);
  },[data])

  const userId = user?.userInfo?.id;
  const hasLikedThePost = likes?.includes(userId) ?? false;

  const handleLike = async () => {
    if (!post) return;
  
    const currentLikes = post.likes || [];
  
    if (hasLikedThePost) {
      setLikes(currentLikes.filter((id: any) => id !== userId));
      const data = {
        postId: post?.id,
        token: user?.access_token
      }
      await dispatch(apis?.likePost(data) as any);
    } else {
      setLikes([...currentLikes, userId]);
      const data = {
        postId: post?.id,
        token: user?.access_token
      }
      await dispatch(apis?.likePost(data) as any);
    }
  };

  const Likes = () => {
    if (!likes || likes.length === 0) {
      return (
        <>
          <ThumbUpAlt fontSize="small" sx={{ fontSize: '16px' }} />
          &nbsp;Like
        </>
      );
    }
    return likes.includes(userId) ? (
      <>
        <ThumbUpAlt color='primary' fontSize="small" sx={{ fontSize: '16px' }} />
        &nbsp;{likes.length > 1 ? `You and ${likes.length - 1} others` : '1 Like'}
      </>
    ) : (
      <>
        <ThumbUpAlt fontSize="small" sx={{ fontSize: '16px' }} />
        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  };

  const openPost = () => history(`/posts/${post.id}`);

  const handleDeletePost = async (id: string) => {
    setDeletingId(id);

    await dispatch(apis?.deletePost(id) as any);
    await dispatch(apis?.getPosts('1') as any)
  }

  return (
    <Card
      raised
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        borderRadius: '15px',
        height: '100%',
      }}
    >
      <ButtonBase
        component="span"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
        onClick={openPost}
      >
        <CardMedia
          component="img"
          image={post.selectedFile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIz4qZKTOplGKCIt860B8HP3mTBMZGACNFg&s'}
          alt="Paella dish"
          sx={{
            filter: 'brightness(50%)',
          }}
          title={post?.title || 'Default Title'}
        />
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          <Typography variant="h6">{post?.name?.split(' ')[0]}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {user?.userInfo?.id === post?.creator.id ? (
          <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>
            <Button
              sx={{
                color: 'white',
                padding: 0,
              }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post.id);
              }}
            >
              <MoreHoriz fontSize="medium" />
            </Button>
          </div>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <Typography sx={{ paddingX: '3px' }} variant="body2" color="textSecondary" component="h2">
            {post?.tags?.length > 0 ? post.tags.map((tag: string) => `#${tag} `) : ''}
          </Typography>
        </div>
        <Typography sx={{ paddingX: '15px' }} gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
            }}
          >
            {post.description}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 0,
          paddingBottom: 1,
          paddingX: 2,
        }}
      >
        <Button sx={{ fontSize: '10px' }} size="small" color="primary" disabled={!user?.userInfo} onClick={handleLike}>
          <Likes />
        </Button>
        {user?.userInfo?.id === post?.creator?.id ? (
          <Button sx={{ fontSize: '10px' }} size="small" color="error" onClick={() => handleDeletePost(post?.id)}>
            {deleting && deletingId === post.id ? (
              <>
                <CircularProgress size={10} sx={{ color: 'red' }} /> 
                <span className='lowercase pl-1'>Deleting...</span>
              </>
            ) : (
              <>
                <Delete fontSize="small" sx={{ fontSize: '16px' }} /> Delete
              </>
            )}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
