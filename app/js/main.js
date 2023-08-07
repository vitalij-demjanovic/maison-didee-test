const mobileMenuBtn  = document.querySelector('.mobile-btn')
const mobileMenu = document.querySelector('.mobile-menu')
const closeMobileMenu = document.querySelector('.mobile-menu-close')
const mobileLink = document.querySelectorAll('.mobile__link-item')
const modal = document.querySelector('.modal')
const sendBtn = document.querySelector('.form-btn')
const thanksWindow = document.querySelector('.thanks-modal')

mobileMenuBtn.addEventListener('click', () => {
    modal.classList.add('active')
    mobileMenu.classList.add('active')
})

closeMobileMenu.addEventListener('click', () => {
    modal.classList.remove('active')
    mobileMenu.classList.remove('active')
})


mobileLink.forEach(link => {
    link.addEventListener('click', () => {
        modal.classList.remove('active')
        mobileMenu.classList.remove('active')
    })
})


function thanksFeedback(e) {
    modal.classList.add('active')
    thanksWindow.classList.add('active')
     setTimeout(() => {
         modal.classList.remove('active')
         thanksWindow.classList.remove('active')
         location.reload()
         window.scrollTo(0, 0);
     }, 2000)
}



const email = document.feedback.email
const namePerson = document.feedback.name
const text = document.feedback.comments

function sendFeedback(e) {
    e.preventDefault()
    if (email.value !== "" && namePerson.value !== '' && text.value !== '') {
        thanksFeedback()
    } else {
        alert('Please fill in all fields!!')
    }
}

sendBtn.addEventListener('click', sendFeedback)