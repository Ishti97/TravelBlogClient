import "../css/listItem.css";

// Assuming Post has a categoryId as a number
type Post = {
  id: string | number,
  title: string,
  image: string,
  authorId: string | number,
  detail: string,
  // Add other properties if you remember them later
};

type ListItemProps = {
  content: Post;
  handleRead: Function;
  handleEdit: Function;
  handleDelete: Function;
  handleBookmark: Function;
  id: string | number;
};


const ListItem: React.FC<ListItemProps> = ({
  content,
  handleRead,
  handleEdit,
  handleDelete,
  handleBookmark,
  id,
}) => {
  // const userId = parseInt(id);
  const userId = id;
  return (
    <li>
      <h2>{content.title}</h2>
      <div>
        {" "}
        {content.image && (
          <img src={`http://localhost:3000/${content.image.slice(6)}`} />
        )}
      </div>

      <div>
        <button onClick={() => handleRead(content.id)}>
          Continue reading...
        </button>
        <button onClick={() => handleBookmark(content.id, userId)}>
          Bookmark
        </button>
        {id == content.authorId && (
          <>
            <button onClick={() => handleEdit(content.id, content.detail)}>
              Edit
            </button>
            <button onClick={() => handleDelete(content.id)}>Delete</button>
          </>
        )}
      </div>
      <p>
        <b>{content.detail}</b>
      </p>
    </li>
  );
};

export default ListItem;
