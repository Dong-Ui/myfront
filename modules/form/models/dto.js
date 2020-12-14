export default function Model (){
    this.userName = "";
    this.fullName = "";
    this.passWord = "";
    this.email = "";

    this.setModel = function (userName, passWord) {
        this.userName = userName;
        this.passWord = passWord;
    };

    this.setModelRegist = function (userName, fullName, passWord, email) {
        this.userName = userName;
        this.fullName = fullName;
        this.passWord = passWord;
        this.email = email;
    };

    this.setForgot = function (userName, email) {
        this.userName = userName;
        this.email = email;
    };

    return this;
}