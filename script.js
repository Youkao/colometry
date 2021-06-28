$(document).ready(function(){
  const in3 = document.querySelector(".in3");
  const appOption = document.querySelector(".app-option"),
    imgArea = appOption.querySelector(".img-area"),
    nameArea = appOption.querySelector(".name-area"),
    close = appOption.querySelector(".close"),
    imgAll = appOption.querySelector(".img-all");
  const appLoad = document.querySelector(".app-load"),
    iconLoad = appLoad.querySelector(".icon-load"),
    iconDrop = appLoad.querySelector(".icon-drop"),
    dropArea = appLoad.querySelector(".drag-area"),
    dragText = appLoad.querySelector("span"),
    button = appLoad.querySelector("button"),
    input = appLoad.querySelector("input");
  let file;
  let type;
  let filebase64;


  $('#btn').click(function(event){
    event.stopPropagation(); 
    event.preventDefault();
    type = $('input[name="selector"]:checked').val();

    $.post("/cgi-bin/getajax.py",{option:type, img:filebase64},onResponse);
    return false;
})
function onResponse(option){
    let imgTag1 = `<img src="${option}" alt="">`; 
        in3.innerHTML = imgTag1;
}
  
  button.onclick = () => {
    input.click();
  }

  input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
    iconLoad.classList.remove("hide");
    iconDrop.classList.add("hide");
    button.classList.remove("hidden");
    showOption(); 
  });


  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Загрузить изображение";
    iconLoad.classList.add("hide");
    iconDrop.classList.remove("hide");
    button.classList.add("hidden");

  });


  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
    iconLoad.classList.remove("hide");
    iconDrop.classList.add("hide");
    button.classList.remove("hidden");
  });


  dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); 
    file = event.dataTransfer.files[0];
    dropArea.classList.remove("active");
    dragText.textContent = "Перетащите файл сюда";
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
 



});

