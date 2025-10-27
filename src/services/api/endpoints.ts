export const Endpoints = {
  Me: {
    BaseVersion: "v1",
    Base: "/me",
    Profile: "/profile",
    Followers: "/followers",
    Following: "/following",
    Email: "/update-email",
    UploadBannerImage: "/upload-banner-image",
    DeleteBannerImage: "/delete-banner-image",
    UploadProfilePicture: "/upload-profile-picture",
    DeleteProfilePicture: "/delete-profile-picture",
    Reactivate: "/reactivate",
  },
  Users: {
    BaseVersion: "v1",
    Base: "/users",
    UserByUsername: (username: string) => `/@${username}`,
  },
  Navbar: {
    BaseVersion: "v1",
    Base: "/navbar",
    Routes: "/items",
  },
  Watchlists: {
    BaseVersion: "v1",
    Base: "/watchlists",
    ById: (id: number) => `/watchlists/${id}`,
  },
  FavouriteStocks: {
    BaseVersion: "v1",
    Base: "/favourite-stocks",
    ById: (id: number) => `/${id}`,
  },
};
