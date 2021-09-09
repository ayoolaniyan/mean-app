import { Subscription } from "rxjs";
import { AuthService } from "./../services/auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "signup.component.html",
  styleUrls: ["signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthServiceListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
