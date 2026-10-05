import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/* =========================================
   FIREBASE
========================================= */

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


/* =========================================
   ELEMENTS
========================================= */

const contactsList = document.getElementById("contactsList");

const nameInput = document.getElementById("contactName");
const designationInput = document.getElementById("contactDesignation");
const phoneInput = document.getElementById("contactPhone");

const saveBtn = document.getElementById("saveContact");
const statusMsg = document.getElementById("statusMsg");


/* =========================================
   FIREBASE CONTACTS PATH
========================================= */

const contactsRef = ref(db, "important contacts");


/* =========================================
   LOAD CONTACTS
========================================= */

onValue(
    contactsRef,

    (snapshot) => {

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

                    <div class="admin-contact-info">

                        <h3>${contact.Name || ""}</h3>

                        <p>
                            ${contact.Designation || ""}
                        </p>

                        <strong>
                            📞 ${contact.Phone || ""}
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

    },

    (error) => {

        console.error("Firebase read error:", error);

        contactsList.innerHTML = `
            <p style="color:red;">
                Unable to load contacts.
            </p>
        `;

    }
);


/* =========================================
   ADD CONTACT
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


        await push(
            contactsRef,
            {
                Name: name,
                Designation: designation,
                Phone: phone
            }
        );


        nameInput.value = "";
        designationInput.value = "";
        phoneInput.value = "";


        statusMsg.textContent =
            "Contact saved successfully.";

        statusMsg.style.color = "green";


    } catch (error) {

        console.error("Add contact error:", error);

        statusMsg.textContent =
            "Unable to save contact.";

        statusMsg.style.color = "red";

    }


    saveBtn.disabled = false;
    saveBtn.textContent = "💾 Save Contact";

});


/* =========================================
   DELETE CONTACT
========================================= */

document.addEventListener("click", async (event) => {

    const deleteButton =
        event.target.closest(".delete-contact-btn");


    if (!deleteButton) {
        return;
    }


    const id = deleteButton.dataset.id;


    const confirmed = confirm(
        "Are you sure you want to delete this contact?"
    );


    if (!confirmed) {
        return;
    }


    try {

        await remove(
            ref(db, `important contacts/${id}`)
        );


        statusMsg.textContent =
            "Contact deleted successfully.";

        statusMsg.style.color = "green";


    } catch (error) {

        console.error("Delete contact error:", error);

        statusMsg.textContent =
            "Unable to delete contact.";

        statusMsg.style.color = "red";

    }

});


/* =========================================
   EDIT CONTACT
========================================= */

document.addEventListener("click", async (event) => {

    const editButton =
        event.target.closest(".edit-contact-btn");


    if (!editButton) {
        return;
    }


    const id = editButton.dataset.id;


    const contactRef =
        ref(db, `important contacts/${id}`);


    try {

        /*
         * Get the contact from the existing
         * displayed card.
         */

        const card =
            editButton.closest(".admin-contact-item");


        const currentName =
            card.querySelector("h3").textContent.trim();


        const currentDesignation =
            card.querySelector("p").textContent.trim();


        const currentPhone =
            card.querySelector("strong").textContent
                .replace("📞", "")
                .trim();


        const newName =
            prompt("Name:", currentName);


        if (newName === null) {
            return;
        }


        const newDesignation =
            prompt(
                "Designation:",
                currentDesignation
            );


        if (newDesignation === null) {
            return;
        }


        const newPhone =
            prompt(
                "Phone Number:",
                currentPhone
            );


        if (newPhone === null) {
            return;
        }


        if (
            !newName.trim() ||
            !newDesignation.trim() ||
            !newPhone.trim()
        ) {

            alert(
                "All three fields are required."
            );

            return;
        }


        await update(
            contactRef,
            {
                Name: newName.trim(),
                Designation: newDesignation.trim(),
                Phone: newPhone.trim()
            }
        );


        statusMsg.textContent =
            "Contact updated successfully.";

        statusMsg.style.color = "green";


    } catch (error) {

        console.error("Edit contact error:", error);

        statusMsg.textContent =
            "Unable to edit contact.";

        statusMsg.style.color = "red";

    }

});
