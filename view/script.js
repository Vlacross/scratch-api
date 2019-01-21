let createState = 0;
let readState = 0;
let updateState = 0;
let deleteState = 0;

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
    const readDiv = 
    `<form class="read-form"><p class="1">ead</p> <input class="read-input 2" type="text"><input class="read-submit 3" type="submit"></form>`
    
if(readState === 1) {
    readState -= 1;
$('.read-form').remove();
}
else if(readState === 0) {
    readState += 1;
$('.read-div').append(readDiv);
    } 
};

function buildUpdate() {
    const updateDiv = 
    `<form class="update-form"><p class="1">pdate</p> <input class="update-input 2" type="text"><input class="update-submit 3" type="submit"></form>`
    
    if(updateState === 0) {
        updateState++;
    $('.update-div').append(updateDiv);
        } 
}

function buildDelete() {
    const deleteDiv = 
    `<form class="delete-form"><p class="1">elete</p> <input class="delete-input 2" type="text"><input class="delete-submit 3" type="submit"></form>`
    
    if(deleteState === 0) {
        deleteState++;
    $('.delete-div').append(deleteDiv);
        } 
}


function handleSelection() {
    $('.create').on('click', function(e) {
        console.log('create!')
        buildCreate();
    });

    $('.read').on('click', function(e) {
        console.log('read!')
        buildRead();
    })

    $('.update').on('click', function(e) {
        console.log('update!')
        buildUpdate();
    })

    $('.delete').on('click', function(e) {
        console.log('delete!')
        buildDelete();
    })

}

$(document).ready(function(e) {
    handleSelection()
})