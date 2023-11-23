const fileslist=document.getElementById("fileslist");
const input=document.getElementById("images");

let currentimage=0;
let totalimages=0;
input.addEventListener('change',(e)=>{
    const uploadedimages=e.target.files;

    // Creating the imagetitles, imagenumbers and images of uploaded file to display
    const imagetitlelist=document.getElementById("imagetitlelist");
    const imagetitles=createImagesTitleList_ImagesList_ImageNumberList(uploadedimages);
    imagetitlelist.innerHTML="";
    imagetitlelist.append(imagetitles);
    
    // Make slider visible
    const slider=document.querySelector('.imageslider');
    slider.classList.remove('d-none');
    slider.classList.add('d-active');
})

function createImagesTitleList_ImagesList_ImageNumberList(images){
    const imagebox=document.getElementsByClassName("imagebox")[0];
    const imagenumberbox=document.getElementsByClassName("imagenumbers")[0];
    const ul=document.createElement('ul');
    imagebox.innerHTML="";
    imagenumberbox.innerHTML="";
    for(let i=0;i<images.length;i++){
        

        // Creating the Image
        const image=document.createElement('img');
        image.src=URL.createObjectURL(images[i]);
        
        image.setAttribute('id',`image-${i}`)
        imagebox.appendChild(image);

        // Creating the ImageNumbers
        const numberli=document.createElement('li');
        numberli.innerText=i+1;
        numberli.setAttribute('id',`imagenumber-${i}`)
        imagenumberbox.appendChild(numberli)

        if(i==0){
            image.classList.add("d-active");
            numberli.classList.add("numberactive");
        }
        else{
            image.classList.add('d-none');
        }

        // Creating the ImageNames
        const li=document.createElement('li');
        // li.innerText=`${i+1}. ${images[i].name.length>30?images[i].name.slice(0,30):images[i].name}`;
        li.innerText=`${i+1}. ${images[i].name}`;
        ul.appendChild(li);
        
        // Counting number of images
        totalimages++;
        
    }
    return ul;
}


function handlePrevious(){
    const curr=currentimage;
    if(currentimage==0){
        currentimage=totalimages-1;
    }
    else{
        currentimage=currentimage-1;
    }
    updateImage(curr,currentimage);
    updateImageNumber(curr,currentimage);
}
function handleNext(){
    const curr=currentimage;
    currentimage=(currentimage+1)%totalimages;
    updateImage(curr,currentimage);
    updateImageNumber(curr,currentimage);
}

function updateImage(curr,next){
    const currimg=document.getElementById(`image-${curr}`);
    const nextimg=document.getElementById(`image-${next}`);
    currimg.classList.add('d-none');
    currimg.classList.remove('d-active');
    nextimg.classList.add('d-active');
    nextimg.classList.remove('d-none');
}
function updateImageNumber(curr,next){
    const currimgnumber=document.getElementById(`imagenumber-${curr}`);
    const nextimgnumber=document.getElementById(`imagenumber-${next}`);
    currimgnumber.classList.remove('numberactive');
    nextimgnumber.classList.add('numberactive');
}