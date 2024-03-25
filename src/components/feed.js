import React, { useState, useEffect } from 'react';
import StoriesThumbnails from './storiesThumbnails';
import CreatePost from './createPost';
import Post from './post';
import getPost, { getPostChunk } from '../api.js/getAllPost';
import { useSelector } from 'react-redux';

function Feed() {
  const refresh = useSelector(state => state.refresh.refresh)
  const limit = 5
  const [page, setPage] = useState(1);
  const [pageStack, setPageStack] = useState({})
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [refresh, page])

  const fetchPost = async () => {
    setLoading(true)
    console.log(pageStack,"page stack",page)
    const data = await getPostChunk(false, page,limit);
    console.log(data)
    if (data?.length < limit) {
      setLastPage(true)
    } 
    if (data && !pageStack[page]) {
      setPost([...post, ...data])
      setPageStack({ [page]:page })
    }
    setLoading(false)
  }
  const loadMore = () => {
    setPage(page + 1)
  }

  return (
    <div className="flex flex-col justify-center mx-auto md:max-w-[690px] w-full z-10 pb-14">
      {/* <StoriesThumbnails /> */}
      <CreatePost />
      {post.map((post) => <Post key={post._id} curr={post} />)}
      {!lastPage ? <div className='max-w-[690px] shadow my-1 bg-white rounded-sm flex justify-center cursor-pointer'
        onClick={!loading ? loadMore : null}>
        {loading ? 'Loading' : 'Load More posts'}
      </div> : null}
    </div>


  )
}

export default Feed