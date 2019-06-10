function renderTable() {
    const head = createTableHead();
    const body = createTableBody();
    $("#excel").append(head);
    $("#excel").append(body);
}

function createTableHead() {
    var head = "<thead><tr><th></th>"
    for (var c = 65; c <= 90; c++) {
        head += "<th>&#" + c + "</th>"
    }
    head += "</tr></thead>"
    return head;
}

function createTableBody() {
    var body = "<tbody>"
    for (var i = 1; i < 45; i++) {
        body += "<tr>";
        for (var c = 0; c < 27; c++) {
            if (c == 0) {
                body += "<td>" + ("" + i) + "</td>";
            } else {
                body += `<td>
                    <input class="editable-cell" id='${c + "x" + i}' type="text" size="10" disabled onClick='blockCell("${c + "x" + i}", this)' onfocusout="triggerEdit(this)"/>
                </td>`
            }
        }
        body += "</tr>"
    }
    body += "</tbody>"
    return body;
}

function fillTable(data) {
    $(".editable-cell").attr("disabled", false);
    $(".editable-cell").val("");// Clean ALL THE FIELDS!
    for (const key in data) {
        $("#" + key).val(data[key]);
    }
}

function triggerEdit(element) {
    const id = $(element).attr("id");
    const value = $(element).val();
    if (value != "")
        editFile(id, value);
    releaseCell(id);
}

function blockSelfCell(cell, color) {
    console.log("BLOCKING: ", cell);
    $("#" + cell).attr("disabled", true);
    // HERE YOU COULD CHANGE THE COLOR OF THE CELL WITH JQUERY
}

function releaseSelfCell(cell) {
    console.log("RELEASING: ", cell);
    $("#" + cell).attr("disabled", false);
}

function editSelfCell(cell, value) {
    console.log("EDITING: ", cell, "WITH VALUE: ", value);
    $("#" + cell).attr("disabled", false);
    $("#" + cell).val(value);
}

renderTable();