declare namespace Express {
  /**
   * Middleware verify the access token & assign more information to the Request params.
   */
  interface Request {
    accessToken?: string;
    userId?: string;
    permissions?: {
      name?: string;
      actions?: string[];
    }[];
  }
}
