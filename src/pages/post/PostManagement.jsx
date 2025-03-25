import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

const posts = [
  {
    id: "01",
    postId: "#PostID001",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    username: "@melissa",
    likes: 23,
    publishDate: "12/23/2003",
  },
  {
    id: "02",
    postId: "#PostID002",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    username: "@melissa",
    likes: 23,
    publishDate: "12/23/2003",
  },
  {
    id: "03",
    postId: "#PostID003",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    username: "@melissa",
    likes: 23,
    publishDate: "12/23/2003",
  },
  {
    id: "04",
    postId: "#PostID004",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    username: "@melissa",
    likes: 23,
    publishDate: "12/23/2003",
  },
  {
    id: "05",
    postId: "#PostID005",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    username: "@melissa",
    likes: 23,
    publishDate: "12/23/2003",
  },
];

const PostManagement = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="p-8">
          {/* Column Headers */}
          <div className="grid grid-cols-6 gap-x-6  text-gray-400 text-sm font-semibold p-4 rounded-lg mb-4">
            <div></div>
            <div>Post ID</div>
            <div>Content</div>
            <div>Username</div>
            <div>Likes</div>
            <div>Publish Date</div>
          </div>

          {/* Post Cards */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-6 gap-x-4 bg-gray-200 shadow-md rounded-lg p-2 items-center"
              >
                {/* ID */}
                <div className="text-gray-700">{post.id}</div>

                {/* Post ID */}
                <div className="text-gray-700 ">{post.postId}</div>

                {/* Content */}
                <div className="text-gray-900 truncate max-w-sm p-2">{post.content}</div>

                {/* Username */}
                <div className="text-gray-600 p-2">{post.username}</div>

                {/* Likes */}
                <div className="text-600 ">{post.likes}</div>

                {/* Publish Date */}
                <div className="text-gray-600">{post.publishDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
