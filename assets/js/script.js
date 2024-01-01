
// ========== link elemnts from HTML
var loginMassage = document.getElementById('loginMassage')
var userName = document.getElementById('userName')
var userEmail = document.getElementById('userEmail')
var validationAlarm = document.getElementById('validationAlarm')
var password = document.getElementById('password')

var loginUserEmail = document.getElementById('loginUserEmail')
var loginPassword = document.getElementById('loginPassword')

var regDialog = document.getElementById('regDialog')
var loginDialog = document.getElementById('loginDialog')

var registerBtn = document.getElementById("register")
var loginBtn = document.getElementById("login")
var LogoutBtn = document.getElementById("Logout")

var regAlarm = document.getElementById('regAlarm')
var loginAlarm = document.getElementById('loginAlarm')

var reglink = document.getElementById("regLink")
var loginLink = document.getElementById("loginLink")

var welcomeHome = document.getElementById('welcomeHome')
var welcomeMassage = document.getElementById('welcomeMassage')

// ============ make array to push element 

var users = []

if (localStorage.getItem('userslist') == null) {
    users = []
} else {
    users = JSON.parse(localStorage.getItem('userslist'))
}

// loginUsers = []

// if (localStorage.getItem('login') == null) {
//     loginUsers = []
// } else {
//     loginUsers = JSON.parse(localStorage.getItem('login'))
// }

loginUsers = []

if (localStorage.getItem('login') == null) {
    loginUsers = []

} else {
    loginUsers = JSON.parse(localStorage.getItem('login'))
    openHome()
}

// =================== events

registerBtn.addEventListener('click', addUser)
loginBtn.addEventListener('click', login)
LogoutBtn.addEventListener('click', logout)
reglink.addEventListener('click', displaydialog)
loginLink.addEventListener('click', displaydialog)


//~===================  add New user (Register)

function addUser() {
    if (isEmpty() == false) {
        regAlarm.innerHTML = `All inputs is required`
    } else {
        var user = {
            uName: userName.value,
            uEmail: userEmail.value,
            uPassword: password.value,
        }
        if (isValidEmail() == true) {
            if (isEmailExist() != false) {
                users.push(user)
                localStorage.setItem('userslist', JSON.stringify(users))
                regAlarm.innerHTML = `Succes`
                regAlarm.classList.add('text-success')
                regAlarm.classList.remove('text-danger')
            } else {
                regAlarm.innerHTML = `email already exists`
                regAlarm.classList.remove('text-success')
                regAlarm.classList.add('text-danger')
            }
        } else {
            valAlarm()
        }

    }
}


// !============check data 1-empty 2-email (for Register)

// 1-check data if empty
function isEmpty() {
    if (userName.value == "" || userEmail.value == "" || password.value == "") {
        return false
    } else {
        return true
    }
}

// 2-check email to add user
function isEmailExist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].uEmail.toLowerCase() == userEmail.value.toLowerCase()) {
            return false
        }
    }
}

//^============== change login to register 
function displaydialog() {
    regDialog.classList.toggle('d-none')
    loginDialog.classList.toggle('d-none')
}
//^============== view welcome
function openHome() {
    loginMassage.classList.add('d-none')
    welcomeHome.classList.remove('d-none')
    for (var i = 0; i < users.length; i++) {
        welcomeMassage.innerHTML = `Welcome  ${users[i].uName}`
    }
}
//^ =============== logout
function logout() {
    loginMassage.classList.remove('d-none')
    welcomeHome.classList.add('d-none')
    loginUsers.pop()
    localStorage.removeItem('login')
}

// ^=============== validation Alarm
function valAlarm() {
    validationAlarm.classList.remove('d-none')
}

// !====================== login


function login() {
    if (isLoginEmpty() == true) {
        loginAlarm.innerHTML = `All inputs is required`
    } else {
        var loginUser = {
            logEmail: loginUserEmail.value,
            logPassword: loginPassword.value
        }

        // var logEmail = loginUserEmail.value
        // var logPassword = loginPassword.value

        for (var i = 0; i < users.length; i++) {
            if (users[i].uEmail.toLowerCase() == loginUser.logEmail.toLowerCase() && users[i].uPassword == loginUser.logPassword) {
                loginUsers.splice(0, 1, loginUser)
                localStorage.setItem('login', JSON.stringify(loginUsers))
                openHome()

            } else {
                loginAlarm.innerHTML = `inputs is incorrect`
            }
        }
    }

}


// 1-check data if empty
function isLoginEmpty() {
    if (loginUserEmail.value == "" || loginPassword.value == "") {
        return true
    }
}

//  ========== validation Email
function isValidEmail() {
    var valEmail = userEmail.value
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (regexEmail.test(valEmail) == true) {
        return true
    } else {
        return false
    }
}
