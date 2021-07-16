import { EmailValidator } from '@angular/forms';
import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(1, "David", "Trombello", new Date(1995-12-25), "myemail@EmailValidator.com", "password")).toBeTruthy();
  });
});
