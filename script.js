$(document).ready(function () {
    var intervalId;

    // Function to calculate age and remaining life
    function calculateAgeAndRemainingLife() {
        var dobInput = $("#dob-input").val();
        var lifetimeInput = $("#lifetime-input").val();

        if (!dobInput || !lifetimeInput) {
            return; // Exit if input fields are empty
        }

        var dob = new Date(dobInput);
        var expectedLifetime = parseInt(lifetimeInput);

        if (isNaN(expectedLifetime)) {
            return; // Exit if expected lifetime is not a number
        }

        var now = new Date();
        var ageDuration = now - dob;
        var remainingDuration = (expectedLifetime * 31556900000) - ageDuration;

        var age = getAge(ageDuration);
        var remaining = getAge(remainingDuration);

        $("#age").html(age.year + " years and " + age.ms + " milliseconds");
        $("#remaining").html(remaining.year + " years and " + remaining.ms + " milliseconds");
    }

    function getAge(duration) {
        var years = duration / 31556900000;
        var majorMinor = years.toFixed(9).toString().split(".");
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    }

    // Event listener for the "Calculate" button
    $("#submit").click(function (e) {
        e.preventDefault();
        calculateAgeAndRemainingLife();
        
        // Clear the previous interval, if any
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Start a new interval for continuous update
        intervalId = setInterval(calculateAgeAndRemainingLife, 100);
    });
});
