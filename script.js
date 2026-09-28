// =========================================
// HEALTHCARE APPOINTMENT & PATIENT PORTAL
// JavaScript
// =========================================


// Get the registration form
const form = document.getElementById("patientForm");

// Get the appointment table body
const appointmentTable =
    document.querySelector("#appointments tbody");


// Appointment ID counter
let appointmentNumber = 5;


// =========================================
// FORM SUBMISSION
// =========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Check HTML5 validation
    if (!form.checkValidity()) {

        event.stopPropagation();

        form.classList.add("was-validated");

        return;
    }


    // Get form values

    const patientName =
        document.getElementById("patientName").value;

    const department =
        document.getElementById("department").value;

    const doctor =
        document.getElementById("doctor").value;

    const appointmentDate =
        document.getElementById("appointmentDate").value;

    const appointmentTime =
        document.getElementById("appointmentTime").value;


    // Convert date to DD-MM-YYYY

    const dateObject =
        new Date(appointmentDate);

    const formattedDate =
        String(dateObject.getDate()).padStart(2, "0")
        + "-" +
        String(dateObject.getMonth() + 1).padStart(2, "0")
        + "-" +
        dateObject.getFullYear();


    // Convert time to 12-hour format

    const timeParts =
        appointmentTime.split(":");

    let hours =
        parseInt(timeParts[0]);

    const minutes =
        timeParts[1];

    let period = "AM";

    if (hours >= 12) {

        period = "PM";

    }

    if (hours > 12) {

        hours = hours - 12;

    }

    if (hours === 0) {

        hours = 12;

    }

    const formattedTime =
        hours + ":" + minutes + " " + period;


    // Create Appointment ID

    const appointmentID =
        "APT" +
        String(appointmentNumber).padStart(3, "0");


    appointmentNumber++;


    // Create new table row

    const newRow =
        document.createElement("tr");


    newRow.innerHTML = `

        <td>${appointmentID}</td>

        <td>${patientName}</td>

        <td>${department}</td>

        <td>${doctor}</td>

        <td>${formattedDate}</td>

        <td>${formattedTime}</td>

        <td>
            <span class="badge bg-success">
                Confirmed
            </span>
        </td>

    `;


    // Add new row to table

    appointmentTable.appendChild(newRow);


    // Success message

    alert(
        "Patient registered successfully!\n\n" +
        "Appointment ID: " + appointmentID
    );


    // Reset form

    form.reset();

    form.classList.remove("was-validated");


    // Go to appointments section

    document
        .getElementById("appointments")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// =========================================
// RESET BUTTON
// =========================================

form.addEventListener("reset", function () {

    form.classList.remove("was-validated");

});


// =========================================
// APPOINTMENT DATE VALIDATION
// =========================================

// Appointment cannot be before today

const appointmentDate =
    document.getElementById("appointmentDate");

if (appointmentDate) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");

    const currentDate =
        `${year}-${month}-${day}`;

    appointmentDate.min = currentDate;

}


// =========================================
// DATE OF BIRTH VALIDATION
// =========================================

// DOB cannot be a future date

const dob =
    document.getElementById("dob");

if (dob) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");

    const currentDate =
        `${year}-${month}-${day}`;

    dob.max = currentDate;

}