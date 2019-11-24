import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent implements OnInit {

  postForm = new FormGroup({
    description: new FormControl('', [Validators.required , Validators.maxLength(50)]),
    image: new FormControl(null, {
      validators: [Validators.required],
    })
  });

  imageSrc = '';
  loaded = false;
  constructor(private postService: PostsService , private router: Router) { }

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
    image : this.postForm.value.image
  };
  console.log(post);
  this.postService.addPost(post);
  this.router.navigate(['ourmedia']);
}

onCancel() {
  this.router.navigate(['ourmedia']);
}

}
