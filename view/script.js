function buildListing(post, num) {
    
    let listing = 
    `<li id="${post._id}">
    <h1>${post.title}</h1>
    <div>
        <p>By: ${post.author}</p>
        <p>Date Posted: ${post.created}</p>
        <p>${post.content}</p>
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

function buildForm(post) {
    let {firstName, lastName} = post.author;
    let name = firstName + ' ' + lastName;

    const updateForm = 
    `<form class="post-form">
      <fieldset>
      <h3>Make your adjustments for posting</h3>
      <div class="form-inputs">
        <label for="title-input">Title: 
          <input id="title-input" class="form-data1" name="title" type="text" value=${post.title}>
        </label>

        <label for="author-input">Author: 
          <input id="author-input" class="form-data1" name="author" type="text" value="${name}">
        </label>

        <input class="put" type ="submit">

      </div>

      <div class="content-input">
        <label for="content-input">Content: 
          <textarea id="content-input" class="form-textbox" cols="40" rows="10" type="text" name="content">${post.content}</textarea>
        </label>
      </div>

        
      </fieldset>
    </form>`
    return updateForm;
}


function updatePost(postId) {
    console.log('updatePoster')

    fetch(`../posts/${postId}`)
    .then(res => res.json())
    .then(function(resj) {

    const updateForm = buildForm(resj)

    $('.wrapper').addClass('row')
    $('.js-results').empty().append(updateForm)})

    $('.js-results').submit('.post-form', function(e) {
        e.preventDefault();
        
        const form = $(event.target);
        let formData = form.serializeArray()
        
        function buildHead(formData) {
            return formData.reduce(function(acc, obj) {

                acc[obj.name] = obj.value
                return acc
            }, {})
        }

        let head = buildHead(formData);
        console.log(JSON.stringify(head))
        // fetch(`../posts/${postId}`, {method: 'PUT'})
        
        // .then(resj => console.log(resj.status))
        })
    
}

function deletePost(postId) {
    fetch(`../posts/${postId}`, {method: 'delete'})
    .then(res => console.log(res.status))

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
        
    $('.js-results').empty().append(`<div><ul>${blogPosts}</ul></div>`);
   })

   $('.js-results').on('click', '.update', function(e) {
       e.preventDefault();
        currentPost = $(this).closest('li').attr('id')
        console.log(currentPost)
        updatePost(currentPost)
   })

   $('.js-results').on('click', '.delete', function(e) {
    e.preventDefault();
     currentPost = $(this).closest('li').attr('id')
     console.log(currentPost)
     deletePost(currentPost)
})
    
}

function buildCreate() {
};

function buildRead() {
showPosts();
};

function buildUpdate() {
};

function buildDelete() {
};

function handleSelection() {
    $('.c').on('click', function(e) {
        console.log('create!')
        $('.intro').remove();
        buildCreate();
    });

    $('.r').on('click', function(e) {
        console.log('reader!')
        $('.intro').remove();
        buildRead();
    });

    $('.u').on('click', function(e) {
        console.log('update!')
        $('.intro').remove();
        buildUpdate();
    })

    $('.d').on('click', function(e) {
        console.log('delete!')
        $('.intro').remove();
        buildDelete();
    })

}

$(document).ready(function(e) {
    handleSelection()
})