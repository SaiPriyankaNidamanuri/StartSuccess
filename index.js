document.getElementById('saveCommentBtn').style.display="none";
document.getElementById('replyForm').style.display="none";

if(localStorage.getItem('allComments') == null){
localStorage.setItem('allComments',JSON.stringify([]));
}
else{
    showComments();
}

function addComment(){
    event.preventDefault();

   var username= document.getElementById('username').value;
   var comment= document.getElementById('comment').value;

    if(username.length == 0){
        document.getElementById('u_msg').innerHTML="Username field cannot be empty";
        return;
    }
    if(comment.length == 0){
        document.getElementById('c_msg').innerHTML="comment field cannot be empty";
        return;
    }
    var usercomment= {
         commentId:getUniqueId(),
        uname: username,
        ucomment: comment,
        timestamp:getTimeStamp(),
        replies:[]
    }

     var comments_lc=JSON.parse(localStorage.getItem('allComments'));
     console.log(comments_lc);
     comments_lc.push(usercomment);
     console.log(comments_lc);
     localStorage.setItem('allComments',JSON.stringify(comments_lc));
     showComments();
    
}
function showComments(){
    var commentsList=document.getElementById('comments');
   var updatedcl=JSON.parse(localStorage.getItem('allComments'));
    clearList();
    for(var index=0; index < updatedcl.length ; index++){
        var uc=updatedcl[index];
       commentsList.innerHTML=commentsList.innerHTML+ "<li id="+uc.commentId+">"+ "<b>" + uc.uname + "</b>"+ "&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;" +  uc.ucomment + "&nbsp;&nbsp;&nbsp;&nbsp" +uc.timestamp + "&nbsp;&nbsp;&nbsp;&nbsp" +"<button onclick="+"deleteComment("+uc.commentId+")"+">Delete</button>" + "<button onclick="+"editComment("+uc.commentId+")"+">Edit</button>"+ "<button onclick="+"replyComment("+uc.commentId+")"+">Reply</button>"+"</li>";
           
             if(uc.replies.length > 0) {

                for(var index1=0;index1<uc.replies.length;index1++){

                    commentsList.innerHTML=commentsList.innerHTML + "<span>" + "<b>"+uc.replies[index1].r_username+ "</b>" + "&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;"+ uc.replies[index1].r_comment+"</span>" + "<br>";
                }
                commentsList.innerHTML=commentsList.innerHTML+ " <br><br><hr><br>";
             }
    }
}
function clearList(){
    document.getElementById('comments').innerHTML="";
}

function replyComment(commentId){

    event.preventDefault();

    var li=document.getElementById(commentId);
    document.getElementById('replyForm').style.display="block";
    var replyForm= document.getElementById('replyForm');
    li.appendChild(replyForm);
    console.log(li);
    document.getElementById('addReplyBtn').setAttribute('onclick',"addReply("+commentId+")");
}

function addReply(commentId){

    event.preventDefault();

    var r_username=document.getElementById('r_username').value;
    var r_comment=document.getElementById('r_comment').value;

    var reply= {
        replyId: getUniqueId(),
        r_username:r_username,
        r_comment:r_comment,
        timestamp:getTimeStamp()
    }

    var allComments=JSON.parse(localStorage.getItem('allComments'));

    for(var index=0; index < allComments.length ; index++){
            
          var comment= allComments[index];

          if(commentId == comment.commentId){
             var repliesArray=comment.replies;
             repliesArray.push(reply);
          }

        }
        localStorage.setItem('allComments',JSON.stringify(allComments));
        document.getElementById('replyForm').style.display="none";
        showComments();
}

function editComment(commentId){

    event.preventDefault();
    document.getElementById('username').disabled=true;
    document.getElementById('addCommentBtn').style.display="none";
    document.getElementById('saveCommentBtn').style.display="inline";
    document.getElementById('saveCommentBtn').setAttribute('onclick',"save("+commentId+")");

    var allComments=JSON.parse(localStorage.getItem('allComments'));

    for(var index=0; index < allComments.length ; index++){
            
          var comment= allComments[index];

          if(commentId == comment.commentId){

                document.getElementById('username').value=comment.uname;
                document.getElementById('comment').value=comment.ucomment;
                
          }
      
    }

    
}

function emptyFields(){
    document.getElementById('username').value="";
    document.getElementById('comment').value="";
}

function save(commentId){

    event.preventDefault();
    document.getElementById('username').disabled=false;
    document.getElementById('addCommentBtn').style.display="inline";
    document.getElementById('saveCommentBtn').style.display="none";
    var ucomment=document.getElementById('comment').value;
    var allComments=JSON.parse(localStorage.getItem('allComments'));

    for(var index=0; index < allComments.length ; index++){
            
          var comment= allComments[index];

          if(commentId == comment.commentId){

                comment.ucomment=ucomment;
          }
      
    }

    localStorage.setItem('allComments',JSON.stringify(allComments));
    showComments();
    emptyFields();
}

function getTimeStamp(){
    event.preventDefault();
     var date= new Date();
   return date.getDate() + "/" +(parseInt(date.getMonth())+1) + "/" + date.getFullYear() +"&nbsp&nbsp&nbsp&nbsp"+date.getHours() +":"+ date.getMinutes();
}

function getUniqueId(){
    if(localStorage.getItem('currentCommentId') == null){
        localStorage.setItem('currentCommentId',0);
       var id= parseInt(localStorage.getItem('currentCommentId'))+1;
       localStorage.setItem('currentCommentId',id);
       return id;
    }
    else
    {
        var id= parseInt(localStorage.getItem('currentCommentId'))+1;
        localStorage.setItem('currentCommentId',id);
        return id;
    }
}
function deleteComment(commentId){
    event.preventDefault();
    var updatedcl=JSON.parse(localStorage.getItem('allComments'));

    for(var index=0; index < updatedcl.length ; index++){
        var uc=updatedcl[index];
        if(commentId == uc.commentId){
               var indexOfComment=updatedcl.indexOf(uc);
               updatedcl.splice(indexOfComment,1);
               
        }
      
    }
    localStorage.setItem('allComments',JSON.stringify(updatedcl));
    showComments();
}

//Task:  Implement Edit functionality 



