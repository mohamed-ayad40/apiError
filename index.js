setupUI();
let baseURL = "https://tarmeezacademy.com/api/v1";
fetch(`${baseURL}/posts`)
.then((response) => {
    let data = response.json();
    return data;
}).then((data) => {
    data = data.data;

    document.getElementById("posts").innerHTML = "";
    for (post of data) {
        let author = post.author;
        let postTitle = "";
        if (post.title != null) {
            postTitle = post.title;
        }
        let content = `
            <div class="card shadow my-5">
            <div class="card-header">
            <img src="${author.profile_image}" alt="" style="width: 40px; height: 40px;" class="rounded-circle border border-2">
            <b>${author.username}</b>
            </div>
            <div class="card-body">
            <img class="w-100" src="${post.image}" alt="">
            <h6 class="mt-1" style="color: rgb(193, 193, 193)">${post.created_at}</h6>
            <h5>${postTitle}</h5>
            <p>${post.body}</p>
            <hr>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
                <span>${post.comments_count} Comments
                <span id="post-tag-${post.id}"></span>
                </span>
            </div>
            </div>
        </div>`;
        document.getElementById("posts").innerHTML += content;
        // const currentPostTagsId = `post-tags-${post.id}`;
        // document.getElementById(currentPostTagsId).innerHTML = "";
        // for (tag of post.tags) {
        //     let tagsContent = 
        //     `
        //     <button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">
        //         ${tag.name}
        //     </button>
        //     `;
        //     document.getElementById(currentPostTagsId).innerHTML += tagsContent;
        // }
    }
})
//  function loginBtnClicked() {
//     const username =document.getElementById("username-input").value;
//     const password =document.getElementById("password-input").value;
//     console.log(username, password);
//     const params = {
//         "username": username,
//         "password": password
//     }
//     const url = `${baseURL}/login`
//      fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(params)
//     }).then((response) => {
//         console.log(response)
//         let data = response.json();
//         return data;
//     }).then((data) => {
//         console.log(data)
//     })
// }
async function loginBtnClicked() {
    const username =document.getElementById("username-input").value;
    const password =document.getElementById("password-input").value;
    console.log(username, password);
    const params = {
        "username": username,
        "password": password
    }
    const url = `${baseURL}/login`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    let user = await response.json();
    console.log(user)
    window.localStorage.setItem("token", user.token);
    window.localStorage.setItem("user", JSON.stringify(user.user));
    const modal = document.getElementById("login-modal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    showAlert("Logged In Successfully", "success");
    setupUI();
}

async function registerBtnClicked() {
    const name =document.getElementById("register-name-input").value;
    const username =document.getElementById("register-username-input").value;
    const password =document.getElementById("register-password-input").value;
    console.log(username, password);
    const params = {
        "username": username,
        "password": password,
        "name": name
    }
    console.log(username, password, name)
    const url = `${baseURL}/register`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    let user = await response.json();
    // if (fault) {
    //     console.log("ssssss")
    // }
    console.log(user)
    window.localStorage.setItem("token", user.token);
    window.localStorage.setItem("user", JSON.stringify(user.user));
    const modal = document.getElementById("register-modal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    showAlert("New User Registered Successfully", "success");
    setupUI();
}





function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showAlert("Logged Out Successfully", "success")
    setupUI()}

function showAlert (message1, type) {
    const alertPlaceholder = document.getElementById('success-alert')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" style="position: fixed; z-index: 99999; bottom: 20px;" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
console.log(message1)
    alertPlaceholder.append(wrapper)
}



        appendAlert(message1, type);

}

function setupUI() {
    const token = localStorage.getItem("token");
    const loginDiv = document.getElementById("logged-in-div");
    const logoutDiv = document.getElementById("logout-div");
    if (token == null) {
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
    } else {
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
    }
}