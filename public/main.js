// main.js
// const update = document.querySelector('#update-button')
const deleteForm = document.querySelector('#delete-form')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

// update.addEventListener('click', _ => {
//     fetch('/quotes', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'Darth Vadar',
//         quote: 'I find your lack of faith disturbing.'
//       })
//     }).then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(response => {
//         window.location.reload()
//         console.log(response)
//     })
// })

deleteButton.addEventListener('click', _ => {
    console.log(JSON.stringify(deleteForm.value))
    console.log("Delete")
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
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
            window.location.reload()
        }
    })
    .catch(error => console.error(error))
})