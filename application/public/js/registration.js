
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          registerUser();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

function registerUser() {
  $.ajax(
    {
      url: "http://100.26.92.104:3000/registerUser",
      type: "POST",
      crossDomain : true,
      headers: {  'Access-Control-Allow-Origin': 'http://100.26.92.104:3000' },
      data: {
        phone: $("#phone").val(),
        zip_code: $("#zip_code").val(),
        activity_type: $("#passions").val(),
        email_id: $("#email_id").val(),
        password: $("#password").val()
      },
      success: function (response) {
        alert(response.message);
      },
      error: function () {
        alert("Error!");
      }

    });
}

