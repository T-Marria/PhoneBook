// TODO: заменить все "onclick" на "AddEventListener"
const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal");
const btnSave = document.querySelector("#btn-save");
let btnsDelete = document.querySelectorAll(".btn-delete");
let checkFavs = document.querySelectorAll(".isFavorite");
const inputSearch = document.querySelector("#input-search");

btnOpen.addEventListener("click", () => modal.showModal());
btnClose.addEventListener("click", () => modal.close());
btnSave.addEventListener("click", onClickSave);
inputSearch.addEventListener("keyup", SearchContact);

function Contact(name, phone, isFavorite = false) {
    this.name = name;
    this.phone = phone;
    this.isFavorite = isFavorite;
}

const contactList = {
    list: [],
    SortList() {
        this.list.sort((a, b) => ((!a.isFavorite && b.isFavorite) || ((a.isFavorite == b.isFavorite) && (a.name > b.name))) ? 1 : -1);
    },
    AddContact(newContact) {
        this.list.push(newContact);
        this.SortList();
    },
    DeleteByPosition(position) {
        this.list = this.list.filter((contact, ind) => ind !== position);
        contactList.Print();
    },
    Print() {
        document.querySelector('.content').innerHTML = `<table class="contactList"></table>`
        for (let i = 0; i < contactList.list.length; i++) {
            let row1 = document.createElement('tr');
            let row2 = document.createElement('tr');
            row1.className = `contact-${i}`;
            row2.className = `contact-${i}`;
            row1.innerHTML = `
                <td rowspan="2">
                    <img src="../dist/contact.svg" alt="contact img width="40" height="40"">
                </td>
                <td>
                    ${contactList.list[i].name}
                </td>
                <td>
                    <button class="btn-delete">Delete</button>
                </td>
                `;

            let isChecked;
            contactList.list[i].isFavorite ? isChecked = "checked" : isChecked = ""
            row2.innerHTML = `
                <td>
                    ${contactList.list[i].phone}
                </td>
                <td>
                    <input class="isFavorite" id="isFavorite-${i}" type="checkbox" ${isChecked}>
                    <label for="isFavorite-${i}">Fav</label>
                </td>
                `;

            document.querySelector('.contactList').appendChild(row1);
            document.querySelector('.contactList').appendChild(row2);
        }
        console.log(contactList.list);

        btnsDelete = document.querySelectorAll(".btn-delete");
        checkFavs = document.querySelectorAll(".isFavorite");

        for (let i = 0; i < contactList.list.length; i++) {
            btnsDelete[i].addEventListener("click", () => contactList.DeleteByPosition(i));
        }

        for (let i = 0; i < contactList.list.length; i++) {
            checkFavs[i].addEventListener("change", function(event) {
                if (event.target.checked) {
                    contactList.list[i].isFavorite = true;
                    console.log(`${contactList.list[i].name} is in favorites now`);
                }
                else {
                    contactList.list[i].isFavorite = false;
                    console.log(`${contactList.list[i].name} removed from favorites`);
                }
                contactList.SortList();
                contactList.Print();
            }); 
        }
    }
};

contactList.AddContact(new Contact("Marie", "89608091515", true));
contactList.AddContact(new Contact("Leshenka", "89878171323", true));
contactList.AddContact(new Contact("Alice", "89277125279"));
contactList.AddContact(new Contact("Sam", "89878171320", true));
contactList.Print()


function onClickSave() {
    let newName = document.querySelector("#Name").value;
    let newPhone = document.querySelector("#Phone").value;
    let newIsFavorite = document.querySelector("#isFavorite").checked;

    contactList.AddContact(new Contact(newName, newPhone, newIsFavorite));
    contactList.Print();

    modal.close();
}

function SearchContact() {
    let inputValue = inputSearch.value.toUpperCase();

    for (let i = 0; i < contactList.list.length; i++) {
        let contact = document.querySelectorAll(`.contact-${i}`)
        if (contactList.list[i].name.toUpperCase().indexOf(inputValue) == 0) {
            contact[0].style.display = "";
            contact[1].style.display = "";
        }
        else {

            contact[0].style.display = "none";
            contact[1].style.display = "none";
        }
    }
}