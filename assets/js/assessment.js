/* =====================================================
   MSEC SECURITY ASSESSMENT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       BIOMETRIC LOADER
    ================================================= */

    const loader =
        document.getElementById("assessment-loader");

    const loaderProgress =
        document.getElementById("loader-progress-bar");

    const loaderStatus =
        document.getElementById("loader-status-text");


    if (loader) {

        const statusMessages = [

            "INITIALIZING ASSESSMENT",

            "ESTABLISHING SECURE SESSION",

            "ANALYZING SECURITY REQUIREMENTS",

            "PREPARING ASSESSMENT"

        ];


        let progress = 0;

        let messageIndex = 0;


        const progressInterval =
            setInterval(() => {

                progress += Math.random() * 8 + 4;


                if (progress >= 100) {

                    progress = 100;

                    clearInterval(progressInterval);

                }


                if (loaderProgress) {

                    loaderProgress.style.width =
                        `${progress}%`;

                }

            }, 150);


        const messageInterval =
            setInterval(() => {

                messageIndex++;


                if (
                    messageIndex <
                    statusMessages.length
                ) {

                    loaderStatus.textContent =
                        statusMessages[messageIndex];

                }

            }, 700);


        setTimeout(() => {

            clearInterval(messageInterval);


            if (loaderProgress) {

                loaderProgress.style.width =
                    "100%";

            }


            if (loaderStatus) {

                loaderStatus.textContent =
                    "ASSESSMENT READY";

            }


            setTimeout(() => {

                loader.classList.add(
                    "loader-complete"
                );

            }, 500);


        }, 3000);

    }


    /* =================================================
       ASSESSMENT SETUP
    ================================================= */

    const assessment =
        document.getElementById(
            "security-assessment"
        );


    if (!assessment) return;


    const steps =
        document.querySelectorAll(
            ".assessment-step"
        );


    const options =
        document.querySelectorAll(
            ".assessment-option"
        );


    const nextButton =
        document.getElementById(
            "assessment-next"
        );


    const backButton =
        document.getElementById(
            "assessment-back"
        );


    const currentStepDisplay =
        document.getElementById(
            "current-step"
        );


    const progressBar =
        document.getElementById(
            "progress-bar"
        );


    const dynamicQuestion =
        document.getElementById(
            "dynamic-question"
        );


    const dynamicDescription =
        document.getElementById(
            "dynamic-description"
        );


    const dynamicFields =
        document.getElementById(
            "dynamic-fields"
        );


    let currentStep = 1;

    const totalSteps = steps.length;


    const answers = {};


    /* =================================================
       DYNAMIC STEP 4 DATA
    ================================================= */

    const dynamicQuestions = {

        "Executive / Individual": {

            title:
                "Tell us about the protection requirement.",

            description:
                "These details help us understand the scope of the protective assignment.",

            fields: [

                {
                    name: "individualCount",
                    label: "Number of individuals",
                    type: "number",
                    placeholder: "How many individuals need protection?"
                },

                {
                    name: "travelRequired",
                    label: "Travel involved?",
                    type: "select",
                    options: [
                        "No",
                        "Yes — Local Travel",
                        "Yes — Domestic Travel",
                        "Yes — International Travel"
                    ]
                },

                {
                    name: "protectionDuration",
                    label: "Protection duration",
                    type: "select",
                    options: [
                        "Single Assignment",
                        "Several Days",
                        "Ongoing",
                        "Not Sure"
                    ]
                }

            ]

        },


        "Business / Facility": {

            title:
                "Tell us about the facility.",

            description:
                "Understanding the environment helps us determine the appropriate security approach.",

            fields: [

                {
                    name: "facilityType",
                    label: "Facility type",
                    type: "text",
                    placeholder: "Example: Office, warehouse, retail, manufacturing..."
                },

                {
                    name: "locationCount",
                    label: "Number of locations",
                    type: "number",
                    placeholder: "How many locations?"
                },

                {
                    name: "operatingHours",
                    label: "Operating hours",
                    type: "select",
                    options: [
                        "Daytime Only",
                        "24/7",
                        "Evenings / Nights",
                        "Varies"
                    ]
                }

            ]

        },


        "Event": {

            title:
                "Tell us about the event.",

            description:
                "Event details help us understand staffing, planning, and operational requirements.",

            fields: [

                {
                    name: "eventType",
                    label: "Event type",
                    type: "text",
                    placeholder: "Example: Concert, corporate event, festival..."
                },

                {
                    name: "attendance",
                    label: "Expected attendance",
                    type: "number",
                    placeholder: "Approximate number of attendees"
                },

                {
                    name: "eventDate",
                    label: "Event date",
                    type: "date",
                    placeholder: ""
                },

                {
                    name: "eventDuration",
                    label: "Event duration",
                    type: "text",
                    placeholder: "Example: 6 hours"
                }

            ]

        },


        "Property / Assets": {

            title:
                "Tell us about the property or assets.",

            description:
                "This information helps us understand what needs to be protected and the level of exposure involved.",

            fields: [

                {
                    name: "propertyType",
                    label: "Property type",
                    type: "text",
                    placeholder: "Example: Commercial property, residence, equipment..."
                },

                {
                    name: "assetValue",
                    label: "Approximate value",
                    type: "select",
                    options: [
                        "Under $100,000",
                        "$100,000 – $500,000",
                        "$500,000 – $1 Million",
                        "$1 Million+",
                        "Prefer Not to Say"
                    ]
                },

                {
                    name: "currentSecurity",
                    label: "Current security",
                    type: "select",
                    options: [
                        "None",
                        "Alarm / Surveillance",
                        "Security Officers",
                        "Multiple Security Measures",
                        "Not Sure"
                    ]
                }

            ]

        },


        "Something Else": {

            title:
                "Tell us more about what you need.",

            description:
                "Give us a brief description so we can better understand your situation.",

            fields: [

                {
                    name: "generalNeed",
                    label: "Security requirement",
                    type: "textarea",
                    placeholder: "Describe what you need protected and what you're looking for..."
                }

            ]

        }

    };


    /* =================================================
       CREATE DYNAMIC FIELDS
    ================================================= */

    function createDynamicFields(selection) {

        if (!dynamicFields) return;


        const configuration =
            dynamicQuestions[selection] ||
            dynamicQuestions["Something Else"];


        dynamicQuestion.textContent =
            configuration.title;


        dynamicDescription.textContent =
            configuration.description;


        dynamicFields.innerHTML = "";


        configuration.fields.forEach(field => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "assessment-dynamic-field";


            let element;


            if (field.type === "select") {

                element =
                    document.createElement("select");


                const defaultOption =
                    document.createElement("option");

                defaultOption.value = "";

                defaultOption.textContent =
                    field.label;

                defaultOption.disabled = true;

                defaultOption.selected = true;

                element.appendChild(
                    defaultOption
                );


                field.options.forEach(option => {

                    const optionElement =
                        document.createElement(
                            "option"
                        );

                    optionElement.value =
                        option;

                    optionElement.textContent =
                        option;

                    element.appendChild(
                        optionElement
                    );

                });

            }

            else if (field.type === "textarea") {

                element =
                    document.createElement(
                        "textarea"
                    );

                element.rows = 6;

                element.placeholder =
                    field.placeholder;

            }

            else {

                element =
                    document.createElement(
                        "input"
                    );

                element.type =
                    field.type;

                element.placeholder =
                    field.placeholder;

            }


            element.name =
                field.name;

            element.dataset.dynamic =
                "true";


            wrapper.appendChild(element);

            dynamicFields.appendChild(wrapper);

        });

    }


    /* =================================================
       COLLECT DYNAMIC ANSWERS
    ================================================= */

    function collectDynamicAnswers() {

        const dynamicInputs =
            dynamicFields.querySelectorAll(
                "[data-dynamic]"
            );


        let valid = true;


        dynamicInputs.forEach(input => {

            const value =
                input.value.trim();


            if (!value) {

                input.classList.add(
                    "assessment-field-error"
                );

                valid = false;

            }

            else {

                input.classList.remove(
                    "assessment-field-error"
                );

                answers[input.name] =
                    value;

            }

        });


        return valid;

    }


    /* =================================================
       SHOW STEP
    ================================================= */

    function showStep(stepNumber) {

        steps.forEach(step => {

            const stepValue =
                Number(step.dataset.step);


            step.classList.toggle(
                "active",
                stepValue === stepNumber
            );

        });


        if (currentStepDisplay) {

            currentStepDisplay.textContent =
                stepNumber;

        }


        if (progressBar) {

            const progress =
                (stepNumber / totalSteps) * 100;


            progressBar.style.width =
                `${progress}%`;

        }


        if (backButton) {

            backButton.style.visibility =
                stepNumber === 1
                    ? "hidden"
                    : "visible";

        }


        if (nextButton) {

            nextButton.textContent =
                stepNumber === totalSteps
                    ? "Submit Assessment"
                    : "Continue";

        }

    }


    /* =================================================
       OPTION SELECTION
    ================================================= */

    options.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const step =
                    option.closest(
                        ".assessment-step"
                    );


                const stepNumber =
                    Number(
                        step.dataset.step
                    );


                step
                    .querySelectorAll(
                        ".assessment-option"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                option.classList.add(
                    "selected"
                );


                answers[
                    `step${stepNumber}`
                ] =
                    option.dataset.value;


                /* STEP 1 CONTROLS DYNAMIC QUESTIONS */

                if (stepNumber === 1) {

                    createDynamicFields(
                        option.dataset.value
                    );

                }

            }
        );

    });


    /* =================================================
       NEXT BUTTON
    ================================================= */

    nextButton.addEventListener(
        "click",
        () => {

            const currentStepElement =
                document.querySelector(
                    `.assessment-step[data-step="${currentStep}"]`
                );


            /* STEPS 1–3 */

            if (currentStep <= 3) {

                const selectedOption =
                    currentStepElement.querySelector(
                        ".assessment-option.selected"
                    );


                if (!selectedOption) {

                    currentStepElement.classList.add(
                        "assessment-error"
                    );


                    setTimeout(() => {

                        currentStepElement.classList.remove(
                            "assessment-error"
                        );

                    }, 500);


                    return;

                }

            }


            /* STEP 4 */

            if (currentStep === 4) {

                if (!collectDynamicAnswers()) {

                    alert(
                        "Please complete the assessment fields."
                    );

                    return;

                }

            }


            /* STEP 5 */

            if (currentStep === 5) {

                const city =
                    assessment.elements.city.value.trim();

                const state =
                    assessment.elements.state.value.trim();

                const zip =
                    assessment.elements.zip.value.trim();


                if (!city || !state || !zip) {

                    alert(
                        "Please complete the location fields."
                    );

                    return;

                }


                answers.location = {

                    city,
                    state,
                    zip

                };

            }


            /* STEP 6 */

            if (currentStep === 6) {

                const details =
                    assessment.elements.details.value.trim();


                if (!details) {

                    alert(
                        "Please tell us a little about your security needs."
                    );

                    return;

                }


                answers.details =
                    details;

            }


            /* STEP 7 */

            if (currentStep === 7) {

                const name =
                    assessment.elements.name.value.trim();

                const company =
                    assessment.elements.company.value.trim();

                const email =
                    assessment.elements.email.value.trim();

                const phone =
                    assessment.elements.phone.value.trim();


                if (
                    !name ||
                    !email ||
                    !phone
                ) {

                    alert(
                        "Please complete your contact information."
                    );

                    return;

                }


                answers.contact = {

                    name,
                    company,
                    email,
                    phone

                };


                submitAssessment();

                return;

            }


            currentStep++;

            showStep(currentStep);

        }
    );


    /* =================================================
       BACK BUTTON
    ================================================= */

    backButton.addEventListener(
        "click",
        () => {

            if (currentStep <= 1) return;


            currentStep--;

            showStep(currentStep);

        }
    );


    /* =================================================
       SUBMISSION
    ================================================= */

    function submitAssessment() {

        console.log(
            "MSEC Security Assessment:",
            answers
        );


        assessment.innerHTML = `

            <div class="assessment-complete">

                <span class="service-detail-section-tag">

                    ASSESSMENT RECEIVED

                </span>


                <h2>

                    Thank You.

                    <span>
                        MSEC Has Your Request.
                    </span>

                </h2>


                <p>

                    Your security assessment has been
                    completed successfully. An MSEC
                    representative can review your
                    requirements and follow up regarding
                    the next steps.

                </p>

            </div>

        `;

    }


    /* =================================================
       INITIAL STATE
    ================================================= */

    showStep(currentStep);

});
