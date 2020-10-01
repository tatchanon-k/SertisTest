// main.js
const editForm = document.querySelector('#edit-form')
const editButton = document.querySelector('#edit-button')
const deleteForm = document.querySelector('#delete-form')
const deleteButton = document.querySelector('#delete-button')
const editMessage = document.querySelector('#editMessage')
const deleteMessage = document.querySelector('#deleteMessage')

//Send edit request
editButton.addEventListener('click', _ => {
    fetch('/editCards', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: editForm[0].value,
            status: editForm[1].value,
            content: editForm[2].value,
            category: editForm[3].value,
            author: editForm[4].value
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No Card to Edit') {
            editMessage.textContent = 'No Card to Edit'
        }
        else if (response === 'Edited Card'){
            editMessage.textContent = 'Edited Card'
            window.location.reload()
        }
    })
})

//Send delete request
deleteButton.addEventListener('click', _ => {
    fetch('/deleteCards', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: deleteForm[0].value,
            status: deleteForm[1].value,
            content: deleteForm[2].value,
            category: deleteForm[3].value,
            author: deleteForm[4].value
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No Card to Delete') {
            deleteMessage.textContent = 'No Card to Delete'
        }
        else if (response === 'Deleted Card'){
            deleteMessage.textContent = 'Deleted Card'
            window.location.reload()
        }
    })
    .catch(error => console.error(error))
})