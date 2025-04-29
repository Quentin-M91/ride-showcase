import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RequeteApiService } from '../../services/requete-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
  currentUserId: any;

  constructor(private postService: RequeteApiService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.currentUserId = decodedToken.id; // ou decodedToken.userId selon ton payload

      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }

    this.loadFeed();
  }

  loadFeed() {
    this.postService.getFeed().subscribe({
      next: (posts) => {
        console.log('Posts:', posts);
        this.posts = posts.map((post: any) => ({
          ...post,
          likes: post.Likers?.map((liker: any) => ({ utilisateurId: liker.id })) || []
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement du fil d\'actualité :', err);
      }
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
    this.postService.likePost(postId).subscribe({
      next: (response) => {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          if (!post.likes) {
            post.likes = [];
          }

          // Vérifier si l'utilisateur a déjà liké
          const likeIndex = post.likes.findIndex((like: { utilisateurId: number }) => like.utilisateurId === this.currentUserId);

          if (likeIndex === -1) {
            // Si l'utilisateur n'a pas encore liké, on ajoute son like
            post.likes.push({ utilisateurId: this.currentUserId });
          } else {
            // Si l'utilisateur a déjà liké, on retire son like
            post.likes.splice(likeIndex, 1);
          }
        }
      },
      error: (error) => {
        console.error('Erreur lors du like :', error);
      }
    });
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

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.loadFeed(); // recharge les posts après suppression
    });
  }

  deleteComment(postId: number, commentId: number) {
    this.postService.deleteComment(postId, commentId).subscribe(() => {
      this.toggleComments(postId); // recharge les commentaires
    });
  }

  hasUserLiked(post: any): boolean {
    return post.likes?.some((like: { utilisateurId: number }) => like.utilisateurId === this.currentUserId);
  }
}
