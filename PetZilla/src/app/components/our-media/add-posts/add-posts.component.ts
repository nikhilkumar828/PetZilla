import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent implements OnInit {

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required , Validators.maxLength(50)]),
  });

  imageSrc = '';
  loaded = false;
  constructor(private postService: PostsService) { }

  ngOnInit() {
  }

  handleInputChange(e) {
    console.log('input change');
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

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
    console.log('_handleReaderLoaded');
    const reader = e.target;
    this.imageSrc = reader.result;

    this.loaded = true;
}

onSubmit() {

  const post = {
    title : this.postForm.value.title,
    description : this.postForm.value.description,
    imgSrc : this.imageSrc
  };
  this.postService.addPost(post);
}

onCancel() {
  // this.router.navigate(['body', 'cnn']);
}

}
