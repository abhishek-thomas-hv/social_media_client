const initialState = []

const PostReducer = (posts=initialState,action) =>
{
    switch(action.type)
    {
        case "GET_ALL":
        return action.payload.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });

        case "ADD_POST":
        return [...posts, action.payload].sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });

        case "ADD_COMMENT_FOR_POST":
        return posts.map((post) => post._id === action.payload._id?action.payload:post).sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });

        case "ADD_LIKE_FOR_POST":
            return posts.map((post) => post._id === action.payload._id?action.payload:post).sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
              });

        case "REMOVE_LIKE_FOR_POST":
          return posts.map((post) => post._id === action.payload._id?action.payload:post).sort(function(a,b){
              return new Date(b.date) - new Date(a.date);
            });

        case "EDIT_POST":
          return posts.map((post) => post._id === action.payload._id?action.payload:post).sort(function(a,b){
              return new Date(b.date) - new Date(a.date);
                  });

        case "DELETE_POST":
          return posts.filter((post) => post._id !== action.payload).sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
                });

        default:
            return posts.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
              });
        
    }
}

export default PostReducer