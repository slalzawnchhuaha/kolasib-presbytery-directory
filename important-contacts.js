import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const contactsList = document.getElementById("contactsList");

const contactsRef = ref(db, "importantContacts");

onValue(contactsRef, (snapshot) => {

    const data = snapshot.val() || {};

    contactsList.innerHTML = "";

    const contacts = Object.values(data);

    contacts.forEach(contact => {

        contactsList.innerHTML += `
            <div class="contact-card">

                <h2>${contact.Name}</h2>

                <p class="contact-Designation">
                    ${contact.designation}
                </p>

                <div class="contact-Phone">
                    📞 ${contact.phone}
                </div>

                <a
                    href="tel:${contact.Phone}"
                    class="call-btn"
                >
                    📞 CALL
                </a>

            </div>
        `;

    });

    if (contacts.length === 0) {

        contactsList.innerHTML = `
            <div class="theme-card">
                <p>No important contacts have been added yet.</p>
            </div>
        `;

    }

});
