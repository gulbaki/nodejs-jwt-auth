
module.exports = {
    isEmail:   (email) => {
        let  emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(email !== '' &&  email.match(emailFormat)){
            return true;
        }
        else{
            return false;
        }

    }

}