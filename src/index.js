const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal");

btnOpen.onclick = () => {
    modal.showModal()
}

btnClose.onclick = () => {
    modal.close()
}


function Contact(name, phone, isFavorite = false) {
    this.name = name;
    this.phone = phone;
    this.isFavorite = isFavorite;
}

const contactList = {
list: [],
SortByName() {
    this.list.sort((a, b) => a.name > b.name ? 1 : -1);
},
AddContact(newContact){
    this.list.push(newContact);
    this.SortByName();
},
//TODO: DeleteContact()
};

contactList.AddContact(new Contact("Marie", "89608091515", true))
contactList.AddContact(new Contact("Leshenka", "89878171323", true))
contactList.AddContact(new Contact("Alice", "89277125279"))

console.log(contactList.list)

