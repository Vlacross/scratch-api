function buildListing(post, num) {
                        
    let listing = 
    `<li id="${post._id}">
    <h1>${post.title}</h1>
    <div>
        <p>By: ${post ? post.fullname : ''}</p>
        <p>Date Posted: ${post.created}</p>
        <p>${post.content}</p>
      </div>`
    if(!num){
        listing +=
      `<div>
    <input class="update" type="submit" value="update">
    <input class="delete" type="submit" value ="delete">
    </div>
    </li>`
    
    return listing;
    
    }
}

function buildForm(num, post) {
    if(post){
    let {firstName, lastName} = post.author
    let name = firstName + ' ' + lastName 
    }
    if(num === 2){
        var banner = `<h3>Enter all fields for new posting</h3>`
    } else if (num === 3) {
        var banner = `<h3>Make your adjustments for this posting</h3>`
    }

    const updateForm = 
    `<form class="post-form">
      <fieldset>
      ${banner}
      <div class="form-inputs">
        <label for="title-input">Title: 
          <input id="title-input" class="form-data1" name="title" type="text" value="${post ? post.title : ''}" required>
        </label>

        <label for="author-first-input">Author First: 
          <input id="author-input" class="form-data1" name="author" type="text" value="${post ? name : ''}" required>
        </label>

        <label for="post-id-input">Post ID: 
        <input id="post-id-input" class="form-data1" name="id" type="text" value="${post ? post._id : ''}">
      </label>

        <input class="put" type ="submit">

      </div>

      <div class="content-input">
        <label for="content-input">Content: 
          <textarea id="content-input" class="form-textbox" cols="40" rows="10" type="text" name="content">${post ? post.content : ''}</textarea>
        </label>
      </div>

        
      </fieldset>
    </form>`
    return updateForm;
}

function buildPost() {
    let formBody = buildForm(2);
    $('.wrapper').addClass('row') 
    $('.js-results').empty().append(formBody)
    $('.js-results').submit('form', function(e) {
        e.preventDefault();

        let form = $('form').serializeArray()
        function format(form) {
        
        return form.reduce(function(acc, obj) {
            if(obj.name === 'author') { 
                let {value} = obj
                let name = value.split(' ')
                obj.value = {firstName: name[0],
                             lastName: name[1]}
            }
            acc[obj.name] = obj.value
            return acc
        }, {}) 
    }

    const head = format(form)
    
        fetch('../posts', 
        {method: 'post',
         headers: {accept: 'application/json',
                  'content-type': 'application/json'},
        body: JSON.stringify(head)
        })
         .then(resj => console.log(resj))
         .catch(err => console.log(err))
    });
}

function updatePost(postId) {
    console.log('updatePoster')

    fetch(`../posts/${postId}`)
    .then(res => res.json())
    .then(function(resj) {

    const updateForm = buildForm(3, resj)

    
    $('.js-results').empty().append(updateForm)})

    $('.js-results').submit('.post-form', function(e) {
        e.preventDefault();
        
        const form = $(event.target);
        let formData = form.serializeArray()
        
        function buildHead(formData) {
            return formData.reduce(function(acc, obj) {

                acc[obj.name] = obj.value
                return acc
            }, {method: "PUT",})
        }
        
        let head = JSON.stringify(buildHead(formData));
        console.log(head)
      
        fetch(`../posts/${postId}`, {method: 'post', body: head})
        .then(res => console.log(res))
        .catch(err => console.log(err))
        })
    
}

function updateById() {
    const findForm = 
    `<div>
    <h3Enter the ID of post you'd like to update</h3>
    <label for="post-id-input">Post ID: 
       <input id="post-id-input" class="update-one" name="id" type="text" required>
    </label>
      <input class="findUpdate" type ="submit">
    </div>`

    $('.wrapper').addClass('row')  
    $('.js-results').empty().append(`${findForm}`)
    $('.js-results').one('click', '.findUpdate', function(e) {
        let postId = $('.update-one').val();
        fetch(`../posts/${postId}`)
        .then(res => res.json())
        .then(function(resj) {
            console.log(resj)
            let updateOne = buildForm(resj)
            $('.js-results').empty().append(`${updateOne}`)

            $('.js-results').one('click', '.update', function(e) {
                e.preventDefault();
                 currentPost = $(this).closest('li').attr('id')
                 console.log(currentPost)
                 updatePost(currentPost)
            })
        })
    })
}

function deletePost(postId) {
    fetch(`../posts/${postId}`, {method: 'delete'})
    .then(res => console.log(res))
    
    showPosts()
}

function deleteById() {

    
        const removalListing = 
        `<div>
        <h3>Delete a posting by it's ID</h3>
        <label for="post-id-input">Post ID: 
            <input id="post-id-input" class="delete-one" name="id" type="text" required>
        </label>
            <input class="remove" type ="submit">
        </div>`

        $('.wrapper').addClass('row')  
        $('.js-results').empty().append(`${removalListing}`)
        $('.js-results').one('click', '.remove', function(e) {
          let postId = $('.delete-one').val()
          $('.js-results').off('click', '.remove')
            
        
     
    
        console.log(postId)
        fetch(`../posts/${postId}`)
        .then(res => res.json())
        .then(function(resj) {
            console.log(resj)
            let deleteOne = buildListing(resj)
            $('.js-results').empty().append(`${deleteOne}`)           


            $('.js-results').one('click', '.delete', function(e) {
                e.preventDefault();
                $('.js-results').off('click', '.delete');
                 currentPost = $(this).closest('li').attr('id')
                 console.log(currentPost, 'lastStep')
                 deletePost(currentPost)
            })
        })
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
    $('.wrapper').addClass('row')  
    $('.js-results').empty().append(`<div><ul>${blogPosts}</ul></div>`);
   })

   $('.js-results').one('click', '.update', function(e) {
       e.preventDefault();
        currentPost = $(this).closest('li').attr('id')
        console.log(currentPost)
        updatePost(currentPost)
   })

   $('.js-results').one('click', '.delete', function(e) {
    e.preventDefault();
     currentPost = $(this).closest('li').attr('id')
     console.log(currentPost)
     deletePost(currentPost)
})
    
}

function buildCreate() {
buildPost()
};

function buildRead() {
showPosts();
};

function buildUpdate() {
updateById()
};

function buildDelete() {
deleteById();
};

function handleSelection() {
    $('.c').on('click', function(e) {
        
        console.log('create!')
        $('.intro').remove();
        buildCreate();
    });

    $('.r').one('click', function(e) {
        console.log('reader!')
        $('.intro').remove();
        buildRead();
    });

    $('.u').one('click', function(e) {
        console.log('update!')
        $('.intro').remove();
        buildUpdate();
    })

    $('.d').one('click', function(e) {
        console.log('delete!')
        $('.intro').remove();
        buildDelete();
    })

}

$(document).ready(function(e) {
    handleSelection()
})