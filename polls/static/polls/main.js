let keptInputValsArr = []
let minFormNum = parseInt($("#id_choice_set-MIN_NUM_FORMS").val());
let checkErrsArr = []

function giveCurrentFormNum() {
    return parseInt($("#id_choice_set-TOTAL_FORMS").val());
}

function decreaseTotalFormNum() {
    let currentFormNum = giveCurrentFormNum()
    $("#id_choice_set-TOTAL_FORMS").val(currentFormNum - 1)
}

function increaseTotalFormNum() {
    let currentFormNum = giveCurrentFormNum()
    $("#id_choice_set-TOTAL_FORMS").val(currentFormNum + 1)
}

function saveCreatedInputsVals() {
    $(".choice-wrapper div.multiField div.created-input-wrapper").find('input').each(function () {
        keptInputValsArr.push([$(this).val(), $(this.hasClass("submitted"))])
    })

}

function deleteCreatedInputs() {
    $(".choice-wrapper").find('div.created-choice-field-wrapper').each(function () {
        $(this).remove();
    });
}

function resetCreatedInputVals() {
    $(".choice-wrapper div.multiField div.created-input-wrapper").find('input').each(function (j) {
        $(this).val(keptInputValsArr[j])
        if (keptInputValsArr[j][1] && $.trim(keptInputValsArr[j][0]) === "") {
            let inputId = $(this).attr('id');
            let elNum = parseInt(inputId.match(/\d+/)[0]);
            $(this).addClass('is-invalid')
            $(this).after(`<p id="error_1_id_choice_set-${elNum}-choice_text" class="invalid-feedback"><strong>This field is required.</strong></p>`)
        }
    });
}

function deleteCreatedInput(item) {

    $(item).closest(".multiField").remove();

    decreaseTotalFormNum();

    saveCreatedInputsVals();

    deleteCreatedInputs();

    rerenderChoiceFields();
}

function generateChoiceFields(createdInputNum) {
    let choiceField =
        `<div class="multiField created-choice-field-wrapper">
        <div id="div_id_choice_set-${createdInputNum}-choice_text" class="form-group">
            <label for="id_choice_set--${createdInputNum}-choice_text" class=" requiredField">
                Choice text<span class="asteriskField">*</span>
            </label>
            <div class="created-input-wrapper">
                <input type="text" name="choice_set-${createdInputNum}-choice_text" maxlength="100" class="textinput textInput unsubmitted form-control" id="id_choice_set-${createdInputNum}-choice_text"> 
                <span onclick="deleteCreatedInput(this)" class="delete-choice-input">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </div>
        </div>
        <input type="hidden" name="choice_set-${createdInputNum}-id" id="id_choice_set-${createdInputNum}-id">
        <input type="hidden" name="choice_set-${createdInputNum}-question" id="id_choice_set-${createdInputNum}-question">
    </div>`;

    $(".choice-wrapper").append(choiceField);
}

function createdChoiceFieldNum() {
    let lastInputId = $(".choice-wrapper div.multiField:last div:first").attr('id');
    let findNum = parseInt(lastInputId.match(/\d+/)[0]);
    return findNum + 1;
}

function rerenderChoiceFields() {
    let formsToRerender = giveCurrentFormNum() - minFormNum;

    let i = 0;

    while (i < formsToRerender) {
        generateChoiceFields(createdChoiceFieldNum())
        i++
    }

    resetCreatedInputVals()

    keptInputValsArr = [];
}


$("#add-choice").click(function () {
    generateChoiceFields(createdChoiceFieldNum());

    increaseTotalFormNum();
});

$('.md-form').submit(function (e) {
    e.preventDefault();
    checkErrsArr = []

    $(".choice-wrapper div.multiField div.created-input-wrapper").find('input').each(function () {
        $(this).removeClass("unsubmitted").addClass("submitted")
    })

    $('.md-form').find('input[type=text]').each(function (i) {
        currentIndex = i;
        if ($.trim($(this).val()) === "") {
            $(this).addClass("is-invalid")
            checkErrsArr.push(true)
            if ($(`#error_1_id_choice_set-${currentIndex}-choice_text`).length == 0) {
                $(this).after(`<p id="error_1_id_choice_set-${currentIndex}-choice_text" class="invalid-feedback"><strong>This field is required.</strong></p>`)
            }
        } else {
            $(this).removeClass("is-invalid")
            $(`#error_1_id_choice_set-${currentIndex}-choice_text`).remove()
            checkErrsArr.push(false)
        }
    })

    if (checkErrsArr.indexOf(true) === -1) {
        $(this).unbind('submit').submit()
    }
})


