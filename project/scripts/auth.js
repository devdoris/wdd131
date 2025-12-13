const loginBtn=document.querySelector('#loginBtn');
const logoutBtn=document.querySelector('#logoutBtn');
const usernameField=document.createElement('input');
usernameField.type='text';
usernameField.placeholder='Enter username';
const saveUserBtn=document.createElement('button');
saveUserBtn.textContent='Submit';
const authModal=document.createElement('div');
authModal.id='authModal';
authModal.classList.add('hidden');
authModal.appendChild(usernameField);
authModal.appendChild(saveUserBtn);
document.body.appendChild(authModal);
const currentUser=localStorage.getItem('blogUser');
function checkUser(){
  if(currentUser){
    loginBtn.style.display='none';
    logoutBtn.style.display='inline-block';
  }
}
loginBtn.addEventListener('click',()=>{authModal.classList.remove('hidden');usernameField.focus();});
saveUserBtn.addEventListener('click',()=>{
  const username=usernameField.value.trim();
  if(username){
    localStorage.setItem('blogUser',username);
    authModal.classList.add('hidden');
    location.reload();
  }
});
logoutBtn.addEventListener('click',()=>{
  localStorage.removeItem('blogUser');
  location.reload();
});
checkUser();