function passwordConfirmation() {
    var password = document.getElementById("pwd").value;
    var confirmPassword = document.getElementById("co-pwd").value;
    var userName = document.getElementById("user-name").value;

   
    if (password == "") {
        alert("Error: The password field is Empty.");
    }else if (password != confirmPassword){
        alert("Please make sure your passwords match.");
    }
    
}


