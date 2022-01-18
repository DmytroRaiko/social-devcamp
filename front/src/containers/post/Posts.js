import './Post.css';
import { useQuery } from 'react-query';
import { getPosts } from './api/crud';
import PostComponent from './PostComponent';

const Posts = () => {
  const {
    isFetching,
    /* refetch, */
    data,
  } = useQuery(
    'posts',
    () => getPosts(),
  );
  const posts = data?.data.data;

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <PostComponent posts={posts} />
    </>
  );
};

export default Posts;
