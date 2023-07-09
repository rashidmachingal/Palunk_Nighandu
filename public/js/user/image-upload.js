// function for upload user profile picture to firebase storage
function profilePicutureUpload() {
    return new Promise((resolve, reject) => {
      const file = profilePicture.files[0]; // get the first selected file
  
      // if user has not selected an image, return default URL
      if (file === undefined) {
        resolve("/img/avatar.png");
        return;
      }
  
      // create a storage reference to the Firebase Storage bucket
      const storageRef = firebase.storage().ref();
  
      // create a new child reference with a unique name
      const uniqid = Date.now();
      const photoRef = storageRef.child('profile/' + uniqid);
  
      // upload the file to the storage reference
      const uploadTask = photoRef.put(file);
  
      // listen for state changes, errors, and completion of the upload
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // handle progress, such as showing a progress bar
        },
        (error) => {
          // handle any errors during the upload
          reject("/img/avatar.png");
        },
        () => {
          // return the download URL of the uploaded photo
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  