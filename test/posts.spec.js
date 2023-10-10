// import { async } from 'regenerator-runtime';
// import { deletePost } from '../src/firebase/firebaseConfig';
import addPost from '../src/routes/posts';

describe('addPost', () => {
  it('Agrega un post', async () => {
    const mockPostData = {
      content: 'Este es un nuevo post',
    };

    const postId = addPost(mockPostData);

    expect(postId).toBeDefined();
  });
});
