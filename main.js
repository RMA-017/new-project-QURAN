let url__Data = `http://localhost:3000/users`
let data__innerHTML = document.querySelector(".data__innerHTML")
let data__block__edit = document.querySelectorAll(".data__block__edit")
let modal = document.querySelector(".modal")
let modal__form = document.querySelector(".modal__form")
let modal__input__login = document.querySelector(".modal__input__login")
let modal__input__password = document.querySelector(".modal__input__password")
let register__form = document.querySelector(".register__form")
let register__input = document.querySelector(".register__input")
let register__password__input = document.querySelector(".register__password__input")
let login__form = document.querySelector(".login__form")
let login__input = document.querySelector(".login__input")
let password__input = document.querySelector(".password__input")


////////////////////////////// BackEnd dan kelgan infoni HTML ga yuborish
const render = (data) => {
    if (data__innerHTML) {
        data__innerHTML.innerHTML = data.map(item => {
            return `<div class="data__block">
                <div class="data__block__login">
                <p class="data__block__login">login: ${item.login}</p>
                <p class="data__block__password">password: ${item.password}</p>  
                </div>      
                <div class="data__block__button">
                <button id="${item.id}" class="data__block__del">delete</button>
                <button id="${item.id}" class="data__block__edit">edit</button>
                </div>
                </div>`
        }).join("")
    }
}


////////////////////////////// register inputdan ma'lumot olish
if (register__form) {
    register__form.addEventListener("submit", (e) => {
        e.preventDefault()
        let new__data = {};
        if (register__input.value.trim().length == 9 && register__password__input.value.trim().length > 3) {
            new__data.login = register__input.value.trim()
            new__data.password = register__password__input.value.trim()
        } else {
            alert("Login yoki Parol xato kiritildi. Login 9 xonali telefon nomeri, parol kamida 4 ta belgi bo'lishi kerak !!!")
        }

        register__input.value = "";

        fetch(url__Data, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new__data)
        })
            .then(res => {
                return res.json()
            })
            .then(() => {
                dataBase()
            })
    })
}


////////////////////////////// delete vs edit
if (data__innerHTML) {
    data__innerHTML.addEventListener("click", (e) => {
        e.preventDefault()
        if (e.target.className === "data__block__del") {
            fetch(`${url__Data}/${e.target.id}`, {
                method: "DELETE",
            })
                .then(res => {
                    return res.json()
                })
                .then(() => {
                    dataBase()
                })
        }
        if (e.target.className === "data__block__edit") {
            modal.classList.add("modal__active")
            modal.id = e.target.id
        }
    })
}

if (modal__form) {
    modal__form.addEventListener("submit", (e) => {
        e.preventDefault();
        let new__data = {};
        if (modal__input__login.value.trim().length == 9 && modal__input__password.value.trim().length > 3) {
            new__data.login = modal__input__login.value.trim()
            new__data.password = modal__input__password.value.trim()
        } else {
            alert("Login yoki Parol xato kiritildi. Login 9 xonali telefon nomeri, parol kamida 4 ta belgi bo'lishi kerak !!!")
        }

        modal__input__login.value = "";

        fetch(`${url__Data}/${modal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new__data)
        })
            .then(res => {
                return res.json()
            })
            .then(() => {
                dataBase()
            })
    })
}

////////////////////////////// FrontEnd va BackEnd ni bir biriga ulash
const dataBase = () => {
    fetch(url__Data)
        .then(res => {
            return res.json()
        })
        .then(data => {
            render(data)
        })
}
dataBase()


////////////////////////////// KIRISH

if (login__form) {
    login__form.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginVal = login__input.value.trim();
        const passwordVal = password__input.value.trim();

        if (loginVal.length !== 9 || passwordVal.length <= 3) {
            alert("Login yoki Parol xato kiritildi. Login 9 xonali telefon nomeri, parol kamida 4 ta belgi bo'lishi kerak !!!");
            return;
        }

        fetch(url__Data)
            .then(res => res.json())
            .then(data => {
                const foundUser = data.find(item => item.login === loginVal && item.password === passwordVal);

                if (foundUser) {
                    alert("Sahifaga muvaffaqiyatli kirdingiz");
                } else {
                    alert("Login yoki parol topilmadi");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Tarmoq yoki server xatosi");
            });

        login__input.value = "";
        password__input.value = "";
    });
}
