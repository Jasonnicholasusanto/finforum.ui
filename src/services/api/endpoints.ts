import { Search } from "lucide-react";
import { searchHistory } from "./modules/search";

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
  Yfinance: {
    BaseVersion: "v1",
    Base: "/yf",
    Stocks: {
      BaseVersion: "v1",
      Base: "/stocks",
      Info: (ticker: string) => `/get-ticker-info/${ticker}`,
      SearchQuotes: (
        query: string,
        maxResult: number,
        recommended: number,
        enableFuzzyQuery: boolean
      ) => {
        const params = new URLSearchParams({
          maxResult: maxResult.toString(),
          recommended: recommended.toString(),
          enableFuzzyQuery: enableFuzzyQuery.toString(),
        });
        return `/search-quotes/${encodeURIComponent(
          query
        )}?${params.toString()}`;
      },
    },
  },
  SearchHistory: {
    BaseVersion: "v1",
    Base: "/search-history",
  },
};
