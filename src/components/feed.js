import React,{useState,useEffect} from 'react';
import StoriesThumbnails from './storiesThumbnails';
import CreatePost from './createPost';
import Post from './post';
import getPost from '../api.js/getAllPost';
import {useSelector} from 'react-redux';

function Feed() {
  const refresh=useSelector(state=>state.refresh.refresh)
  const [post, setPost] = useState([]);
  useEffect(() => {
    getPost(false).then(data => {
      console.log(data,'post')
        setPost(data)
    })
}, [refresh])

  return (
    <div className="flex flex-col justify-center mx-auto md:max-w-[690px] w-full z-10 ">
      {/* <StoriesThumbnails /> */}
      <CreatePost />
     { post.map((post)=><Post key={post._id} curr={post} />)}
    </div>


  )
}

export default Feed