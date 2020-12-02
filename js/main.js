/*********************
 Name: Mia Ehrlich
 Coding 06
 Purpose: This is a main.js file using jquery for client-side validation and ajax submission on a contact form
 **********************/
"use strict";

$(document).ready(function() {
    function validEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function clearForm() {
        //clear inputs by setting values to empty strings
        $('#name').val("");
        $('#email1').val("");
        $('#email2').val("");
        $('#subject').val("");
        $('#message').val("");

        //clear msg above form
        $('#user-msg').html("<p>Fill out your information and we'll be in touch shortly.</p>");
    }

    function validate(){
        var errorMsg = "";

        //trim input values and save to new variables
        var name = $('#name').val().trim();
        var email1 = $('#email1').val().trim();
        var email2 = $('#email2').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();

        //update values in dom with trimmed values
        $('#name').val(name);
        $('#email1').val(email1);
        $('#email2').val(email2);
        $('#subject').val(subject);
        $('#message').val(message);

        //test inputs for errors
        if (name === "") {
            errorMsg += "Please enter your name.<br>";
        }
        if (subject === "") {
            errorMsg += "Please enter a subject.<br>";
        }
        if (message === "") {
            errorMsg += "Please enter your message.<br>";
        }
        if (!validEmail(email1)) {
            errorMsg += "Email must be valid.<br>";
        }
        if (!validEmail(email2)) {
            errorMsg += "Confirmation email must be valid.<br>";
        }
        if (email1 !== email2) {
            errorMsg += "Emails must match.<br>";
        }
        return errorMsg;
    }

//Function to send form
    function sendForm() {
        var form = $('#contactForm');
        var form_data = $('#contactForm').serialize();

        $.ajax({
            url: form.attr("action"),
            type: 'POST',
            data: form_data
        })

            .done(function(response) {
                //If request loads successfully and email is sent
                if (response = 'okay') {
                    clearForm();
                    $('#user-msg').html('Sent!');
                    //If request fails php validation
                } else {
                    $('#user-msg').html("Uh oh! Looks like something went wrong. Please try again.");
                }
            })
            // Code to run if the request fails
            .fail(function(response) {
                $('#user-msg').html('Uh oh! Looks like something went wrong. Please try again.');
            });
    }

//add event handler to send btn
    $('#btn__send').click(function (){
        var msg = validate();
        //Decision structure to report errors or send form if validate function returns w/o errors
        if (msg === "") {
            // clearForm();
            $('#user-msg').html("<p>Sending...</p>");
            sendForm();
            return true;
        } else {
            $('#user-msg').html(msg);
            return false;
        }
    });

//add event handler to clear btn
    $('#btn__clear').click(function () {
        clearForm();
        return false;
    });

    /* Remove focus from buttons after click event */

    $('button').mouseup(function() {
        this.blur();
    });
});