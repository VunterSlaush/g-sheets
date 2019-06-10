
var files;
var selected;


function loadFiles() {
    $.get("/api/files", (data, status) => {
        files = data;
        renderFiles(files);
    })
}

function renderFiles(files) {
    $("#fileList").empty();
    for (i = 0; i < files.length; i++) {
        list = "<li class='file-element' onClick='selectFile(this);' id='"+files[i]+"'>" + files[i] + "</li>";
        $("#fileList").append(list);
    }
}

function renderUsersOnRoom(userList) {
    $("#userList").empty();
    for (i = 0; i < userList.length; i++) {
        list = "<li id='"+userList[i]+"'>" + userList[i] + "</li>";
        $("#userList").append(list);
    }
}

function selectFile(element){
    const id = $(element).attr("id");
    $("#openButton").prop("disabled", true);
    $(".selectedFileElement").removeClass("selectedFileElement")
    if(id != selected){
        selected = id
        $(element).addClass("selectedFileElement")
        $("#openButton").prop("disabled", false);
    } else {
        selected = null;
    }
    
}

function uploadFile(event){
    event.preventDefault();
    var file = document.getElementById("uploadFile").files[0];
    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      successs: function() {
        console.log('success');
      },
      error: function() {
          //TODO ADD ALERT ERROR
      }
    })
    
}

function openFile(){
    $.ajax({
        url: '/storage/'+selected,
        type: 'GET',
        success: function(data) {
          startEdit(selected);
          fillTable(data);
        },
        error: function() {
          //TODO ADD ALERT ERROR
        }
      })
}

$("#uploadForm").submit(uploadFile);

loadFiles();