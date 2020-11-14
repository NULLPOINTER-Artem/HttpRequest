//const { delete } = require("../../server/routes/users");

class User {
    constructor({name, email, password}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
// get & post - users
// put & delete - users/idUSer
class UserApi {
    static baseUrl = 'users';

    static getUsers() {
        return fetch(UserApi.baseUrl);
    }

    static sendUser(user) {
        return fetch(UserApi.baseUrl, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
    }

    static deleteUser(usersId) {
        return fetch(UserApi.baseUrl, {
            method: 'delete',
            body: JSON.stringify({usersId: usersId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let form = document.querySelector('#regForm');
    let usersContainer = document.querySelector('#users');
    let inputForDelete = document.querySelector('#deleteInput');
    let deleteBtn = document.querySelector('#deleteBtn');
    // console.dir(form.elements);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let { name, email, password } = form.elements;
        let user = new User({
            name: name.value,
            email: email.value,
            password: password.value
        });
        console.log(user);

        UserApi.sendUser(user)
                .then( response => {
                    console.log(response);
                    form.style.display = "none";
                    usersContainer.style.display = "block";
                })
    })

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let id = inputForDelete.value;

        try {
            UserApi.deleteUser(id).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
            });
        } catch(error) {
            console.log(error);
        }
    })

    let controls = document.querySelector('#controls');
    controls.addEventListener('click', (e) => {
        if(e.target.id == "add") {
            form.style.display = "block";
            usersContainer.style.display = "none";

            inputForDelete.style.display = "none";
            deleteBtn.style.display = "none";
        }
        if(e.target.id == "get") {
            usersContainer.style.display = "block";
            form.style.display = "none";

            inputForDelete.style.display = "none";
            deleteBtn.style.display = "none";
            
            renderUserList()
        }
        if(e.target.id == "delete") {
            form.style.display = "none";
            usersContainer.style.display = "none";
            inputForDelete.style.display = "block";
            deleteBtn.style.display = "block";
        }
    })

    function renderUserList() {
        UserApi.getUsers()
                .then( res => res.json())
                .then( data => data.data)
                .then( users => {
                    usersContainer.innerHTML = '';
                    users.forEach( user => {
                        usersContainer.innerHTML += `
                            <h1 class="name">${user.name}</h1>
                            <p class="email">${user.email}</p>
                        `
                    })
                })
    }
})

