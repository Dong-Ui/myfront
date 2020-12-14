export default function Model (){
    this.userName = "";
    this.fullName = "";
    this.passWord = "";
    this.gender = true;
    this.phone = "";
    this.bankNumber = "";
    this.birthDay = "";
    this.identityCard = "";
    this.nationality = "";
    this.address = "";


    this.setModel = function (userName, fullName, passWord, gender, phone, bankNumber, birthDay, identityCard, nationality, address) {
        this.userName = userName;
        this.fullName = fullName;
        this.passWord = passWord;
        this.gender = gender;
        this.phone = phone;
        this.bankNumber = bankNumber;
        this.birthDay = birthDay;
        this.identityCard = identityCard;
        this.nationality = nationality;
        this.address = address;
    };

    return this;
}