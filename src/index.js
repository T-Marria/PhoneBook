const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal");
const btnSave = document.querySelector("#btn-save");

btnOpen.onclick = () => {
    modal.showModal()
}

btnClose.onclick = () => {
    modal.close()
}

btnSave.onclick = onClickSave;

function onClickSave() {
    let newName = document.querySelector("#Name").value;
    let newPhone = document.querySelector("#Phone").value;
    let newIsFavorite = document.querySelector("#Favorite");

    console.log(newName, newPhone);
    // TODO: checking checkbox value

    contactList.AddContact(new Contact(newName, newPhone));
    console.log(contactList.list);
    contactList.PrintContactList();
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
AddContact(newContact) {
    this.list.push(newContact);
    this.SortByName();
},
PrintContactList() {
    document.querySelector('.content').innerHTML = `<table class="contactList"></table>`
    for (let i = 0; i < contactList.list.length; i++) {
        let row1 = document.createElement('tr');
        let row2 = document.createElement('tr');
        row1.innerHTML = `
        <td rowspan="2">
            <img src="../dist/contact.svg" alt="contact img width="40" height="40"">
        </td>
        <td>
            ${contactList.list[i].name}
        </td>
        <td>
            <button>Delete</button>
        </td>
        `;
        row2.innerHTML = `
        <td>
            ${contactList.list[i].phone}
        </td>
        <td>
            <input id="Favorite" type="checkbox" name="Favorite" value="Favorite">
            <label for="Favorite">Fav</label>
        </td>
        `;

        document.querySelector('.contactList').appendChild(row1);
        document.querySelector('.contactList').appendChild(row2);
    }
}
//TODO: DeleteContact()
};

contactList.AddContact(new Contact("Marie", "89608091515", true));
contactList.AddContact(new Contact("Leshenka", "89878171323", true));
contactList.AddContact(new Contact("Alice", "89277125279"));

console.log(contactList.list);

contactList.PrintContactList()