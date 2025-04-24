import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RequeteApiService } from '../../services/requete-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualite',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule, FooterComponent],
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css'
})
export class ActualiteComponent implements OnInit {

  posts: any[] = [];
  newContent: string = '';
  comments: { [postId: number]: any[] } = {};
  newComment: { [postId: number]: string } = {};
  showingComments: { [postId: number]: boolean } = {};
  post: any;
  router: any;

  constructor(private postService: RequeteApiService) { }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.postService.getFeed().subscribe(data => {
      this.posts = data;
    });
  }

  publish() {
    if (!this.newContent) return;
    this.postService.createPost({ content: this.newContent }).subscribe(() => {
      this.newContent = '';
      this.loadFeed(); // recharger les posts
    });
  }

  goToProfile(userId: number) {
    // redirection vers le profil public
    this.router.navigate(['/profil', userId]);
  }

  like(postId: number) {
    this.postService.likePost(postId).subscribe();
  }

  toggleComments(postId: number) {
    this.showingComments[postId] = !this.showingComments[postId];
    if (this.showingComments[postId]) {
      this.postService.getComments(postId).subscribe(data => {
        this.comments[postId] = data;
      });
    }
  }

  addComment(postId: number) {
    const contenu = this.newComment[postId];
    if (!contenu) return;
    this.postService.addComment(postId, contenu).subscribe(() => {
      this.newComment[postId] = '';
      this.toggleComments(postId);
    });
  }
}
