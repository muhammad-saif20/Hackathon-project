let storage = firebase.storage();
let auth = firebase.auth();
let db = firebase.firestore();



let userNameEl = document.getElementById('user_name');
let emailEl = document.getElementById('email');
let passwordEl = document.getElementById('password');
// let passwordRepeatEl = document.getElementById('psw-repeat');
// let userRoleEl = document.getElementsByName('user-type');
// let userImageEl = document.getElementById('image_upload');
// let avatarCustomEl = document.getElementById('avatar');

// function imageSelected() {
//     let image = userImageEl.files[0];
//     avatarCustomEl.src = `./images/${image.name}`;
// }


async function regiserUser() {

    let userCreated = await auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value);
    let UID = userCreated.user.uid;
    // let imageURL = await uploadImageToStorage(UID);

    let user = {
        userName: userNameEl.value,
        email: emailEl.value,
        // userImage: imageURL,
        // userRole: giveCheckedRadio(),
        uid: UID
    }
    console.log(user);
     db.collection('users').doc(UID).set(user);
    

}

// function giveCheckedRadio() {
//     let checkedProp;
//     for (var i = 0; i < userRoleEl.length; i++) {
//         if (userRoleEl[i].checked) {
//             checkedProp = userRoleEl[i].value;
//         }
//     }
//     return checkedProp;
// }

// function uploadImageToStorage(UID) {
//     return new Promise(async (resolve, reject) => {
//         let image = userImageEl.files[0];
//         let storageRef = storage.ref();
//         let imageRef = storageRef.child(`avatar/${UID}/${image.name}`);
//         await imageRef.put(image);
//         let url = await imageRef.getDownloadURL();
//         resolve(url);
//     })
// }

auth.onAuthStateChanged((user) => {
    let pageLocArr = window.location.href.split('/');
    let pageName = pageLocArr[pageLocArr.length - 1];
    let authenticatedPages = ['userHomePage.html', 'Resturant.html'];

    if (user && authenticatedPages.indexOf(pageName) === -1) {
        window.location = './userHomePage.html';
    }
    else if (!user && pageName === 'userHomePage.html') {
        window.location = './SignUp.html';
    }
});

// async function signout() {
//     await auth.signOut();

// }
async function signout() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
    console.log(user)
  });
    await auth.signOut();
  }

  


function resturantReg() {
    window.location = './Resturant.html'
}



async function signinUser() {
    await auth.signInWithEmailAndPassword(emailEl.value, passwordEl.value);
}




// function addDish() {
//     b = document.getElementById('item_name').value;
//     document.getElementById('fdata').innerHTML = 'b';
//     return b;
    
//     return addDish
// }

// let imgElement = document.getElementById("img")
let fileElement = document.getElementById("img")
let firebaseStorage = firebase.storage() 
let img_url;
let item_name = document.getElementById('item_name');
let price = document.getElementById('price');
let categories = document.getElementById('categories');

const dishData = () =>{
    uploadFileInStorage();
    let data = {
        itemName: item_name.value,
        price: price.value,
        categories: categories.value,
        url: img_url.value,
    }
    console.log(data);
     db.collection('dishes').doc("dish").set(data);
}

function uploadFileInStorage(){
    console.log(fileElement.files[0].name);
    let fileExtension = fileElement.files[0]

    let uploadPicRef = firebaseStorage.ref().child("dishes/" + fileExtension.name)
    

    uploadPicRef.put(fileExtension)
        .then(()=>{
            uploadPicRef.getDownloadURL()
                .then((url)=>{
                    
                    img_url = url;
                    console.log(img_url)
                    
                    // imgElement.src = url
    //                 var xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   var blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
                })
        })
}
