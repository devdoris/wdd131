import { posts } from './data.js';
const container=document.querySelector('#postsContainer');
const user=localStorage.getItem('blogUser');
function renderPosts(){
  container.innerHTML=posts.map(post=>{
    const likes=JSON.parse(localStorage.getItem(`likes-${post.id}`))||[];
    const saved=JSON.parse(localStorage.getItem(`saved-${post.id}`))||[];
    const comments=JSON.parse(localStorage.getItem(`comments-${post.id}`))||[];
    const userLiked=user&&likes.includes(user);
    const userSaved=user&&saved.includes(user);
    return `<article class="post">
      <img src="${post.image}" alt="${post.title}" loading="lazy">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="toggleLike(${post.id})">❤️ ${likes.length} ${userLiked?'(Liked)':''}</button>
        <button onclick="toggleSave(${post.id})">📌 ${userSaved?'Saved':'Save'}</button>
        ${post.link ? `<a href="${post.link}" target="_blank" rel="noopener" class="music-link">🎧 Listen on Spotify</a>` : ''}
      </div>
      <div class="comments">
        <h4>Comments (${comments.length})</h4>
        <ul>${comments.map(c=>`<li><strong>${c.user}</strong>: ${c.text}</li>`).join('')}</ul>
        ${user?`<textarea id="comment-${post.id}" placeholder="Write a comment..."></textarea><button onclick="addComment(${post.id})">Post Comment</button>`:'<p>Login to comment.</p>'}
      </div>
    </article>`;
  }).join('');
}
window.toggleLike=function(id){
  if(!user) return alert('Login required.');
  let likes=JSON.parse(localStorage.getItem(`likes-${id}`))||[];
  if(likes.includes(user)){likes=likes.filter(u=>u!==user);}else{likes.push(user);}
  localStorage.setItem(`likes-${id}`,JSON.stringify(likes));
  renderPosts();
};
window.toggleSave=function(id){
  if(!user) return alert('Login required.');
  let saved=JSON.parse(localStorage.getItem(`saved-${id}`))||[];
  if(saved.includes(user)){saved=saved.filter(u=>u!==user);}else{saved.push(user);}
  localStorage.setItem(`saved-${id}`,JSON.stringify(saved));
  renderPosts();
};
window.addComment=function(id){
  const commentBox=document.querySelector(`#comment-${id}`);
  const text=commentBox.value.trim();
  if(!text) return;
  const comments=JSON.parse(localStorage.getItem(`comments-${id}`))||[];
  comments.push({user,text});
  localStorage.setItem(`comments-${id}`,JSON.stringify(comments));
  commentBox.value='';
  renderPosts();
};
renderPosts();