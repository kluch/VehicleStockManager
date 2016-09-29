import { Component } from '@angular/core';
import { Hero } from './hero';
import { Car } from './car';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})

export class HeroesComponent implements OnInit {
    cars: Car[];
    filesToUpload: Array<File>;
    files: Array<File> = [];
    uploadedFileDetails: Object;

    constructor(
        private router: Router,
        private heroService: HeroService) { 
            this.filesToUpload = [];
        }

    upload() {
        console.log("this.filesToUpload",this.filesToUpload);
       
        this.makeFileRequest("http://localhost:4000/upload", [], this.filesToUpload).then((result) => {
            console.log("RESULTS:",result);
            this.uploadedFileDetails = result;
        }, (error) => {
            console.error("EEEEEEEEEEE:",error);
        });
    }

  onChange(event:any) {
    var files = event.srcElement.files;
    this.filesToUpload.push(files);
    console.log(files);
  }

     makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log("files", files);
            console.log("files.length", files.length);
            for(var i = 0; i < files.length; i++) {
                // console.log("appending: ",files[i][i], files[i][i].name);
                formData.append("uploads[]", files[i][i], files[i][i].name);
                formData.append("buttbutt", "butt");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            // formData = this.resize(formData, 75, 75);
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    ngOnInit(): void {
        // this.getHeroes();
    }

    add(make: string, model: string, year: string, km: string, dealername: string, stockno: string): void{
        console.log("hi",  this.uploadedFileDetails);
        make = make.trim();
        model = model.trim();
        year = year.trim();
        km = km.trim();
        dealername = dealername.trim();
        stockno = stockno.trim();

        let newCar = {
            make: make,
            model: model,
            year: year,
            km: km,
            dealername: dealername,
            stockno: stockno,
            image: this.uploadedFileDetails.originalname
        }
        console.log("newCar");
        this.heroService.create(newCar)
        .then(car => {
            //indicate the the car has been saved.
            // this.cars.push(car);
        });
    }

    ////file upload
    file_srcs: string[] = [];

    // This is called when the user selects new files from the upload button
    fileChange(input){
        var parentThis = this;
        // Loop through each picture file
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);

            // Create an img element and add the image file data to it
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            console.log("1:", input.files[i]);
            // Create a FileReader
            var reader = new FileReader();
            var filename = input.files[i].name;
            var filetype = input.files[i].type;
            // Add an event listener to deal with the file when the reader is complete
            reader.addEventListener("load", (event) => {
                // Get the event.target.result from the reader (base64 of the image)
                img.src = event.target.result;

                // Resize the image
                var resized_img = this.resize(img, 75,75);

                srcToFile(
                    resized_img,
                    filename,
                    filetype
                )
                .then(function(file){
                    console.log(file);
                    var filesToUpload2 = [];
                    filesToUpload2.push(file);      
                    //
                    var url = "http://localhost:4000/upload";
                    var params = [];
                    var files = filesToUpload2;
                        return new Promise((resolve, reject) => {
                        var formData: any = new FormData();
                        var xhr = new XMLHttpRequest();
                        console.log("files", files);
                        console.log("files.length", files.length);
                        for(var i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i].name);
                            formData.append("buttbutt", "butt");
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.response));
                                } else {
                                    reject(xhr.response);
                                }
                            }
                        }
                        // formData = this.resize(formData, 75, 75);
                        xhr.open("POST", url, true);
                        xhr.send(formData);
                    }).then(function(result){
                        parentThis.uploadedFileDetails = result;
                    });
                })
                // Push the img src (base64 string) into our array that we display in our html template
                this.file_srcs.push(resized_img);
            }, false);
            // console.log(input.files[i]);
            reader.readAsDataURL(input.files[i]);
        }
    }


    resize (img, MAX_WIDTH:number = 900, MAX_HEIGHT:number = 900){
        var canvas = document.createElement("canvas");

        console.log("Size Before: " + img.src.length + " bytes");

        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  
        // IMPORTANT: 'jpeg' NOT 'jpg'
        console.log("Size After:  " + dataUrl.length  + " bytes");
        return dataUrl
    }
}


//load src and convert to a File instance object
//work for any type of src, not only image src.
//return a promise that resolves with a File instance

function srcToFile(src, fileName, mimeType){
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
}

    ////
}