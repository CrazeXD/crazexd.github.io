$(document).ready(function() {
    $(".tilt-wrapper").tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: true,
        maxGlare: 0.2,
        scale: 1.04
    });
    // Go through each project and if the description is too long, add a "Read More" button
    $(".card").each(function() {
        let description = $(this).find(".card-content");
        if (description.height() > 50) {
            // Cut off the text
            let text = description.text();
            let cutOff = text.substring(0, 200);
            description.text(cutOff + "...");
            // Add the "Read More" button
            // TODO: Create a modal for the full description
            $(this).append("<button class='read-more'>Read More</button>");
        }
    });
});