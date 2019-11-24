import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RescueService } from '../rescue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rescue-post',
  templateUrl: './add-rescue-post.component.html',
  styleUrls: ['./add-rescue-post.component.css']
})
export class AddRescuePostComponent implements OnInit {

  postForm = new FormGroup({
    description: new FormControl('', [Validators.required , Validators.maxLength(50)]),
    image: new FormControl(null, {
      validators: [Validators.required],
    }),
    mobileNo: new FormControl('', [Validators.required , Validators.minLength(10) , Validators.maxLength(10)])
  });

  imageSrc = '';
  loaded = false;
  constructor(private postService: RescueService , private router: Router) { }

  ngOnInit() {
  }

  handleInputChange(e) {
    console.log('input change');
    const file = (e.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image').updateValueAndValidity();
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
}

_handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
}

onSubmit() {

  const post = {
    description : this.postForm.value.description,
    image : this.postForm.value.image,
    mobileNo : this.postForm.value.mobileNo
  };
  console.log(post);
  this.postService.addPost(post);
  this.router.navigate(['rescue']);
}

onCancel() {
  this.router.navigate(['rescue']);
}


}
