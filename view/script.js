function buildListing(post, num) {
    let listing = 
    `<li id="${post._id}">
    <h1>${post.title}</h1>
    <div>
        <p>By:${post.author}</p>
        <p>Date Posted: ${post.created}</p>
      </div>`
    if(!num){
        listing +=
      `<div>
    <input class="update" type="submit" value="update">
    <input class="delete" type="submit" value ="delete">
    </div>
    </li>`}
    return listing;
}


function updatePost(postId) {
    console.log('updatePoster')

    fetch(`../posts/${postId}`)
    .then(res => res.json())
    .then(function(resj) {
        const currentListing = buildListing(resj, 2)
        
    


    const updateForm = 
    `<form>
      <fieldset>
        <label>
          <input class="form-data1" type="text">
          <input class="formdata-sudmit" type ="submit">
        </label>
      </fieldset>
    </form>`

    $('.js-results').empty().append(currentListing + updateForm)
    })
}



function showPosts() {

    fetch('../posts')
    .then(res => res.json())
    .then(function(resj) {

    let blogPosts = ``;
    resj.forEach(post =>{
   let listing = buildListing(post)

    blogPosts += listing

    })
        
    $('.js-results').append(`<div><ul>${blogPosts}</ul></div>`);
   })
   $('.js-results').on('click', '.delete', function(e) {
       e.preventDefault();
        currentPost = $(this).closest('li').attr('id')
        console.log(currentPost)
        updatePost(currentPost)
   })
    
}

function buildCreate() {
const createDiv = 
` <form class="create-form"><p class="1">reate</p> <input class="create-input 2" type="text"><input class="create-submit 3" type="submit"></form>`

if(createState === 1) {
    createState -= 1;
$('.create-form').remove();
}
else if(createState === 0) {
    createState += 1;
$('.create-div').append(createDiv);
    } 
};

function buildRead() {
showPosts();
};

function buildUpdate() {
    const updateDiv = 
    `<form class="update-form"><p class="1">pdate</p> <input class="update-input 2" type="text"><input class="update-submit 3" type="submit"></form>`
    
    if(updateState === 1) {
        updateState -= 1;
    $('.update-form').remove();
    }
    else if(updateState === 0) {
        updateState += 1;
    $('.update-div').append(updateDiv);
        } 
    };

function buildDelete() {
    const deleteDiv = 
    `<form class="delete-form"><p class="1">elete</p> <input class="delete-input 2" type="text"><input class="delete-submit 3" type="submit"></form>`
    
    if(deleteState === 1) {
        deleteState -= 1;
    $('.delete-form').remove();
    }
    else if(deleteState === 0) {
        deleteState += 1;
    $('.delete-div').append(deleteDiv);
        } 
    };


function handleSelection() {
    $('.c').on('click', function(e) {
        console.log('create!')
        buildCreate();
    });

    $('.r').on('click', function(e) {
        console.log('reader!')
        buildRead();
    });

    $('.u').on('click', function(e) {
        console.log('update!')
        buildUpdate();
    })

    $('.d').on('click', function(e) {
        console.log('delete!')
        buildDelete();
    })

}

$(document).ready(function(e) {
    handleSelection()
})