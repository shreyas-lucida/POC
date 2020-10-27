import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormValidatorDirective } from './directives';
import { SharedService } from './shared.service';

@NgModule({
  imports: [CommonModule],
  exports: [FormValidatorDirective],
  declarations: [FormValidatorDirective],
  providers: [SharedService]
})
export class SharedModule {}
