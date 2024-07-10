$(document).ready(function () {
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
    $(".card").each(function () {
        let description = $(this).find(".card-content");
        if (description.height() > 50) {
            // Cut off the text
            let title = $(this).find(".card-title").text();
            let text = description.text();
            let cutOff = text.substring(0, 200);
            description.text(cutOff + "...");
            // Add the "Read More" button
            // TODO: Create a modal for the full description
            $(this).append(`<button class='read-more' data-title="${encodeURIComponent(title)}" data-text="${encodeURIComponent(text)}">Read More</button>`);
        }
    });
});
$(document).on('click', '.read-more', function () {
    let title = decodeURIComponent($(this).data('title'));
    let text = decodeURIComponent($(this).data('text'));
    createModal(title, text);
});
function createModal(title, text) {
    // Create the modal
    let modal = $("#modal");
    modal.removeClass("is-hidden");
    let modalContent = modal.find(".modal-content");
    modalContent.find(".modal-title").text(title);
    modalContent.find(".modal-text").text(text);
}

function closeModal() {
    let modal = $("#modal");
    modal.addClass("is-hidden");
    modal.find(".modal-content .modal-title").text("");
    modal.find(".modal-content .modal-text").text("");
}
