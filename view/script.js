

function handleSelection() {
    $('.create').on('click', function(e) {console.log('create!')})
    $('.read').on('click', function(e) {console.log('read!')})
    $('.update').on('click', function(e) {console.log('update!')})
    $('.delete').on('click', function(e) {console.log('delete!')})
}

$(document).ready(function(e) {
    handleSelection()
})