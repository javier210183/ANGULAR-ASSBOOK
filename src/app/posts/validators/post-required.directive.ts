import { Directive } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[postRequired]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: PostRequiredDirective, multi: true },
  ],
})
export class PostRequiredDirective implements Validator {
  validate(postForm: FormGroup): ValidationErrors | null {
    if (
      !postForm.get('title')?.value &&
      !postForm.get('description')?.value &&
      !postForm.get('image')?.value
    ) {
      return { postRequired: true };
    }

    return null;
  }
}
