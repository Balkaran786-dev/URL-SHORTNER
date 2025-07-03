import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice"; //This is an action that updates your Redux store with the user’s info. //This is an action that updates your Redux store with the user’s info.

//Purpose: This function checks if the user is authenticated.
export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

// Checks if ["currentUser"] is already in the cache and still fresh.
//  If yes: Return it directly — no API call.
//  If no (missing or stale): Run getCurrentUser() to fetch it again from the server.
    const user = await queryClient.ensureQueryData({  //Uses TanStack’s ensureQueryData for caching
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    if (!user) return false;

    store.dispatch(login(user));//Dispatches a Redux action to store the user data in your global state.
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;

    return true;
  } catch (error) {
    return redirect({ to: "/auth" });
  }
};
