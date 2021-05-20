import React, { useEffect, useState } from 'react';

import './styles.css';

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
}

export default function App() {
  // 
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [post, setPost] = useState('');

  const handleIndex = () => {
    setIndex((prevIdx) => prevIdx === postIds.length - 1 ? prevIdx : prevIdx + 1 )
  }

  useEffect(() => {
    setLoading(true)
    fetchPost(postIds[index])
    .then((post) => {
      setPost(post);
      setError(null);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err.message)
      setError('Error fetching data')})
  },[index])

  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return (<React.Fragment>
      <p>{error}</p>
      <button onClick={handleIndex}>Generate Post</button>
      </React.Fragment>)
  }

  return (
    <div className="App">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleIndex}>Generate Post</button>
    </div>
  );
}
