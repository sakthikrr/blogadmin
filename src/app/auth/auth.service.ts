import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient,AuthResponse } from '@supabase/supabase-js'
import { Observable,from,BehaviorSubject,tap } from 'rxjs';
export interface AuthSession {
  isAuthenticated: boolean;
  useremail: string | null;
  token: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInKey = 'local_auth_logged_in';
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    private authStateSubject = new BehaviorSubject<AuthSession>(this.loadInitialSession());
  authState$ = this.authStateSubject.asObservable();

    private loadInitialSession(): AuthSession {
    const isAuth = localStorage.getItem(this.loggedInKey) === 'true';
    const token = localStorage.getItem('token');
    const useremail = localStorage.getItem('useremail');
    return {
      isAuthenticated: isAuth,
      token: token ?? null,
      useremail: useremail ?? null
    };
  }



  login(username: string, password: string): Observable<AuthResponse> {
   const promise =  this.supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    return from(promise).pipe(
          tap(res => {
        const token = res.data?.session?.access_token ?? null;
        if (res.data?.user) {
          this.setAuthenticated(token, username);
        }
      })
    );
  }
  setAuthenticated(token: string | null , useremail: string | null): void {
  localStorage.setItem(this.loggedInKey, 'true');
   if( token && useremail){
     localStorage.setItem('token', token);
      localStorage.setItem('useremail', useremail);
        this.authStateSubject.next({
          isAuthenticated: true,
          token: token ?? null,
          useremail: useremail ?? null
      });
   }else{
      this.authStateSubject.next({
          isAuthenticated: false,
          token: token ?? null,
          useremail: useremail ?? null
      });

   }
  
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem('token');
    localStorage.removeItem('useremail');

    this.authStateSubject.next({
      isAuthenticated: false,
      token: null,
      useremail: null
    });
  }
   
}
