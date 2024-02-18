import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    builder: FormBuilder,
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly tokenService: TokenService
  ) {
    this.form = builder.nonNullable.group({
      passcode: builder.nonNullable.control('', [Validators.minLength(4), Validators.maxLength(16)])
    });
    this.returnUrl = route.snapshot.queryParamMap.get('returnUrl') ?? '/';
  }

  form: FormGroup<{
    passcode: FormControl<string>
  }>;

  returnUrl: string;

  ngOnSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.tokenService.login(this.form.value.passcode!).subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: () => this.snackBar.open('Passcode is incorrect.', 'Dismiss', {
        duration: 5000
      })
    });
  }
}
