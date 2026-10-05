import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCSzp3WT1U8S-_1zlxP1xEE0sSX5ssrv-E",
    authDomain: "kolasib-presbytery-vawi-12-na.firebaseapp.com",
    databaseURL: "https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kolasib-presbytery-vawi-12-na",
    storageBucket: "kolasib-presbytery-vawi-12-na.firebasestorage.app",
    messagingSenderId: "515741204477",
    appId: "1:515741204477:web:995e01bfffdb1c553a2394"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const contactsRef = ref(db, "important contacts");

const nameInput = document.getElementById("contactName");
const designationInput = document.getElementById("contactDesignation");
const phoneInput = document.getElementById("contactPhone");

const saveBtn = document.getElementById("saveContact");
const statusMsg = document.getElementById("statusMsg");

const contactsList = document.getElementById("contactsList");


/* =========================================
   LOAD EXISTING CONTACTS
========================================= */

onValue(contactsRef, (snapshot) => {

    const data = snapshot.val() || {};

    contactsList.innerHTML = "";

    const contacts = Object.entries(data);

    if (contacts.length === 0) {

        contactsList.innerHTML = `
            <p>No contacts found.</p>
        `;

        return;
    }


    contacts.forEach(([id, contact]) => {

        contactsList.innerHTML += `

    <div class="admin-contact-item">

        <div>

            <h3>${contact.Name}</h3>

            <p>
                ${contact.Designation}
            </p>

            <strong>
                📞 ${contact.Phone}
            </strong>

        </div>

        <div class="admin-contact-actions">

            <button
                class="edit-contact-btn"
                data-id="${id}"
            >
                ✏️ Edit
            </button>

            <button
                class="delete-contact-btn"
                data-id="${id}"
            >
                🗑️ Delete
            </button>

        </div>

    </div>

`;

    });

});


/* =========================================
   ADD NEW CONTACT
========================================= */

saveBtn.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const designation = designationInput.value.trim();
    const phone = phoneInput.value.trim();


    if (!name || !designation || !phone) {

        statusMsg.textContent =
            "Please fill in all three fields.";

        statusMsg.style.color = "red";

        return;
    }


    try {

        saveBtn.disabled = true;

        saveBtn.textContent = "Saving...";


        await push(contactsRef, {

            Name: name,
            Designation: designation,
            Phone: phone

        });


        nameInput.value = "";
        designationInput.value = "";
        phoneInput.value = "";


        statusMsg.textContent =
            "Contact saved successfully.";

        statusMsg.style.color = "green";


    } catch (error) {

        console.error(error);

        statusMsg.textContent =
            "Unable to save contact.";

        statusMsg.style.color = "red";

    }


    saveBtn.disabled = false;

    saveBtn.textContent = "💾 Save Contact";

});
