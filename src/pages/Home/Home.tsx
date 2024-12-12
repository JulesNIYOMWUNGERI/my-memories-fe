import { AppBar, Button, Container, Grid, Grow, Pagination, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import { MuiChipsInput, MuiChipsInputChip } from 'mui-chips-input'
import { apis } from '../../store/apis';

function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [ search, setSearch ] = useState('');
  const [ tags, setTags ] = useState<any>([]);

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  const page = Number(query.get('page')) || 1;
  const searchQuery = query.get('searchQuery');

  const searchPost = () => {
    if(search.trim() || tags) {
       dispatch(apis.getPostBySearch({ search, tags: tags.join(',') }) as any);
       history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history('/')
    }
  }

  const handleKeyPress = (e: any) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAdd = (value: MuiChipsInputChip[]) => setTags(value);

  return (
    <Grow in>
        <Container maxWidth='xl' sx={{ paddingBottom: '40px' }}>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className='flex xs:flex-col-reverse'>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar
                      sx={{
                        borderRadius: 4,
                        marginBottom: '1rem',
                        diplay:'flex',
                        gap: '10px',
                        padding: '16px'
                      }}
                      position='static' 
                      color='inherit'
                    >
                        <TextField 
                            name='search' 
                            variant='outlined' 
                            label='Search Memories'
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}
                        />
                        <MuiChipsInput 
                            style={{margin: '10px 0'}}
                            value={tags}
                            onChange={handleAdd}
                            label='Search Tags'
                            variant='outlined'
                        />
                        <Button 
                            onClick={searchPost}
                            variant='contained' color='primary'
                        >
                            Search
                        </Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6} className='rounded-[4px] mt-[1rem] p-[16px]'>
                            <Pagination page={page}/>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home
