$(document).ready(function(){
  const imgResult = document.querySelector(".img-result");
  const imgResult1 = document.querySelector(".img-result1");
  const appOption = document.querySelector(".app-option"),
    imgArea = appOption.querySelector(".img-area"),
    nameArea = appOption.querySelector(".name-area"),
    close = appOption.querySelector(".close"),
    imgAll = appOption.querySelector(".img-all");
  const appLoad = document.querySelector(".app-load"),
    iconLoad = appLoad.querySelector(".icon-load"),
    iconDrop = appLoad.querySelector(".icon-drop"),
    dropArea = appLoad.querySelector(".drag-area"),
    textOr = appLoad.querySelector("p"),
    dragText = appLoad.querySelector("span"),
    button = appLoad.querySelector("button"),
    input = appLoad.querySelector("input");
  let file;
  let type;
  let filebase64;
  let base64;
  let base64finish;
  let system;
  



  $('#btn').click(function(event){
    $("#preloader").fadeTo(300, 1, function () {
      $("#preloader").removeClass("hide");
    });
    event.stopPropagation(); 
    event.preventDefault();
    type = $('input[name="selector"]:checked').val();

    $.ajax({
      url: '/cgi-bin/getajax.py',
      method: 'post',
      data: {option:type, img:base64[1]},
      success: function(option){
        let tag1 = `<img src="${base64[0]},${option}" alt="">`; 
        let tag = `<img src="${base64[0]},${base64[1]}" alt="">`; 
        base64finish = `${base64[0]},${option}`;
        imgResult.innerHTML = tag;
        imgResult1.innerHTML = tag1;
        system = $('input[name="selector"]:checked + label').text();
        $("#name-system").html(system);
        $("#theory").load(`theory/${system}.html`);
        $("#title").hide();
        $("#other").hide();
        $("#preloader").hide();
        $("#result").removeClass("hide");

      }
    });
  });


  
  button.onclick = () => {
    input.click();
  }

  input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
    textOr.classList.remove("hide");
    iconLoad.classList.remove("hide");
    iconDrop.classList.add("hide");
    button.classList.remove("hidden");
    showOption(); 
  });


  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Загрузить изображение";
    textOr.classList.add("hide");
    iconLoad.classList.add("hide");
    iconDrop.classList.remove("hide");
    button.classList.add("hidden");

  });


  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
    textOr.classList.remove("hide");
    iconLoad.classList.remove("hide");
    iconDrop.classList.add("hide");
    button.classList.remove("hidden");
  });


  dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); 
    file = event.dataTransfer.files[0];
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
    textOr.classList.remove("hide");
    iconLoad.classList.remove("hide");
    iconDrop.classList.add("hide");
    button.classList.remove("hidden");
    showOption(); 
  });

  function showOption() {
    let fileType = file.type; 
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) { 
      appOption.classList.remove("hide");
      appLoad.classList.add("hide");
      let fileReader = new FileReader();
      fileReader.onloadend = () => {
        filebase64 = fileReader.result;
        console.log('IMAGE BASE64', filebase64);
        base64 = filebase64.split(",");
        console.log('base64', base64);
        let imgTag = `<img src="${filebase64}" alt="">`;
        imgArea.innerHTML = imgTag;
        nameArea.innerHTML = file.name;
       
      }
      fileReader.readAsDataURL(file);
    } else {
      $('#errorType').modal('show');
    }
  };
  imgAll.addEventListener("mouseenter", function () {
    $("#close").fadeTo(100, 1, function () {
      close.classList.remove("hidden");
    });
  });
  imgAll.addEventListener("mouseleave", function () {
    $("#close").fadeTo(100, 0);
  });
  close.onclick = () => {
    appOption.classList.add("hide");
    appLoad.classList.remove("hide");
    imgArea.innerHTML = "";
    nameArea.innerHTML = "";
  }
 
  $('#repeat').click(function() {
       location.reload();
    });

    $('#download').click(function() {
    const a = document.createElement("a");
    a.href = base64finish;
    a.download = "img.jpg"
    a.click();
   });
});

