import { Component } from '@angular/core';
import { PostService, Survey } from '../../services/postservice/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  survey: Survey = {
    title: '',
    description: '',
    createdAt: '',
  };
  constructor(private postService: PostService, private router: Router) {}

  onSubmit() {
    console.log(this.survey)
    if (this.survey.title && this.survey.description && this.survey.createdAt) {
      this.postService.createSurvey(this.survey).subscribe(
        (survey) => {
          console.log('Post creado:', survey);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear el post:', error);
        }
      );
    } else {
      console.error('Formulario no válido:', this.survey);
    }
  }
}
