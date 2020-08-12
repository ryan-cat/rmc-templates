import { auth } from 'firebase-admin';
import { AuthenticationError } from 'rmc-backend-tools';

export class Viewer {
  private _authId: string;
  private _userId: number;

  public token: auth.DecodedIdToken | void;
  public rawToken: string;

  constructor(payload: auth.DecodedIdToken | void) {
    this.token = payload;

    if (payload) {
      this._authId = payload.uid;
      this._userId = payload.custom_id;
    }
  }

  get authId() {
    if (this.authenticationStatus === 'badToken') {
      throw new AuthenticationError();
    }

    return this._authId;
  }

  get userId() {
    if (this.authenticationStatus !== 'authenticated') {
      throw new AuthenticationError();
    }

    return this._userId;
  }

  get authenticationStatus(): 'authenticated' | 'missingUserId' | 'badToken' {
    if (!this.token) {
      return 'badToken';
    } else if (!this._userId) {
      return 'missingUserId';
    }

    return 'authenticated';
  }

  isUser(userId: number): boolean {
    return userId === this.userId;
  }

  isAuthUser(userId: string): boolean {
    return userId === this.authId;
  }
}
