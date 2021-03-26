console.log('This is a js file ')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#messageOne')
const message2 = document.querySelector('#messageTwo')

// message1.textContent = ''


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    message1.textContent = ''

    fetch('http://localhost:2000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message2.textContent=data.error
        }else{
            message2.textContent=' ' + data.location + '.  ' + data.forecast

        }
    })
})
})