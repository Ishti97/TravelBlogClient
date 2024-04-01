import { useEffect, useState } from "react";
import { getBookmark } from "../axiosApi/handleAPI";
const Bookmark = () => {
  const [authorId, setauthorId] = useState();
  const [data, setData] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setauthorId(userId);
    } else {
      setauthorId(null);
    }
  }, []);

  const fetchData = async () => {
    const data = await getBookmark(authorId);
    const dt = data.data.data;
    console.log(dt);
    setData(data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   const fetchPost = async () => {
  //     const data = await getBookmark(authorId);

  //     setPost(data.data.data);
  //   };

  //   useEffect(() => {
  //     fetchPost();
  //   }, []);

  return (
    //     <table>
    //     <thead>
    //       <tr>
    //         <th>Title</th>
    //         <th>Detail</th>
    //         <th>Image</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {posts.map((post) => (
    //         <tr key={post.id}>
    //           <td><b>{post.title}</b></td>
    //           <td><b>{post.detail}</b></td>
    //           <td>
    //           <img style={{height:50, width:50}}  src={`http://localhost:3000/${post.image.slice(6)}`} />
    //           </td>
    //           <td>
    //             {!showApproved && (
    //               <>
    //                 <button onClick={() => handleDelete(post.id)}>
    //                   Delete
    //                 </button>
    //                 <button onClick={() => handleApprove(post.id)}>
    //                   Approve
    //                 </button>
    //               </>
    //             )}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    <></>
  );
};

export default Bookmark;
