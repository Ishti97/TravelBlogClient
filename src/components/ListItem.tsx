import "../css/listItem.css";
const ListItem = ({
  content,
  handleRead,
  handleEdit,
  handleDelete,
  handleBookmark,
  id,
}) => {
  const userId = parseInt(id);
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
