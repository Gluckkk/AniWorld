import { useState, createContext } from "react";

export const StateContext = createContext<StateProviderType | null>(null);

interface State {
  loggedUser: string;
  email: string;
  password: string;
  bookmarks: Array<string>;
  watched: Array<string>;
  watchLater: Array<string>;
}

export interface StateProviderType {
  state: State;
  updateUser: (values: State) => void;
  logOut: () => void;
  addToArray: (newToArray: string, type: string) => void;
  removeFromArray: (remove: string, type: string) => void;
}
export const StateProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, setState] = useState<State>({
    loggedUser: "",
    email: "",
    password: "",
    bookmarks: [],
    watched: [],
    watchLater: [],
  });

  const updateUser = ({
    loggedUser,
    email,
    password,
    watched = [],
    watchLater = [],
    bookmarks = [],
  }: State) => {
    setState({
      loggedUser: loggedUser,
      email: email,
      password: password,
      bookmarks: bookmarks,
      watched: watched,
      watchLater: watchLater,
    });
  };

  const logOut = () => {
    setState({
      loggedUser: "",
      email: "",
      password: "",
      bookmarks: [],
      watched: [],
      watchLater: [],
    });
  };

  const addToArray = (newToArray: string, type: string) => {
    let bookmarks = state.bookmarks;
    let watched = state.watched;
    let watchLater = state.watchLater;
    if (type === "bookmarks") {
      bookmarks = [...state.bookmarks, newToArray];
    }
    if (type === "watched") {
      watched = [...state.watched, newToArray];
    }
    if (type === "watchLater") {
      watchLater = [...state.watchLater, newToArray];
    }
    setState({
      loggedUser: state.loggedUser,
      email: state.email,
      password: state.password,
      bookmarks: bookmarks,
      watched: watched,
      watchLater: watchLater,
    });
  };
  const removeFromArray = (remove: string, type: string) => {
    let bookmarks = state.bookmarks;
    let watched = state.watched;
    let watchLater = state.watchLater;
    if (type === "bookmarks") {
      const id = state.bookmarks.findIndex((obj) => obj === remove);
      bookmarks = state.bookmarks.toSpliced(id, 1);
    }
    if (type === "watched") {
      const id = state.watched.findIndex((obj) => obj === remove);
      watched = state.watched.toSpliced(id, 1);
    }
    if (type === "watchLater") {
      const id = state.watchLater.findIndex((obj) => obj === remove);
      watchLater = state.watchLater.toSpliced(id, 1);
    }
    setState({
      loggedUser: state.loggedUser,
      email: state.email,
      password: state.password,
      bookmarks: bookmarks,
      watched: watched,
      watchLater: watchLater,
    });
  };

  return (
    <StateContext.Provider
      value={{ state, updateUser, logOut, addToArray, removeFromArray }}
    >
      {children}
    </StateContext.Provider>
  );
};
