const uploadBox = document.querySelector(".upload_box") , 
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox. querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];  //getting first user selected file
    if(!file) return ; // return if user hasn't selected any image
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load" , () => { //once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".content").classList.add("active");

    });
}

widthInput.addEventListener("keyup" , () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value  = Math.floor (height);
});

heightInput.addEventListener("keyup" ,() => {
    // getting width according to the ratio checked status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor (width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");
    
    // if quality checkbox is checked , pass 0.7 to imageQuality else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total you can pass from 0.1 - 1.0
    const imageQuality = qualityInput.checked ? 0.7 : 1.0;
    
    // setting canvas height and width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg , 0 , 0 , canvas.width , canvas.height);
   
    //  passing canvas data url as href value of <a> element
    a.href = canvas.toDataURL("image/png" , imageQuality);
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); // clicking <a> element so the file can download
    // document.body.appendChild(canvas);
}
downloadBtn.addEventListener("click" , resizeAndDownload)

fileInput.addEventListener("change", loadFile );
uploadBox.addEventListener("click" , () => fileInput.click());
