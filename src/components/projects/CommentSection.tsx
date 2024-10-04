import React, { useState } from 'react';

interface Comment {
  id: number;
  name: string;
  message: string;
}

const CommentSection: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: comments.length + 1,
      name,
      message,
    };
    setComments([...comments, newComment]);
    setName('');
    setMessage('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comentarios</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tu comentario"
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Enviar comentario
        </button>
      </form>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b pb-2">
            <h4 className="font-semibold">{comment.name}</h4>
            <p>{comment.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
