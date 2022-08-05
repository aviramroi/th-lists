import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Tab } from "../components/Tab";
import { MainContext } from "../context";
import { i18n } from "../lib/labels";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { favorites, isFavorite, viewToggle } = useContext(MainContext);
  const [newRecordsLength, setNewRecordsLength] = useState(0);
  const favoritesLength = useRef<number>(0);

  useEffect(() => {
    if (favorites.length >= favoritesLength.current) {
      setNewRecordsLength(favorites.length - favoritesLength.current);
    } else {
      favoritesLength.current = favorites.length;
    }
  }, [favorites]);

  useEffect(() => {
    if (isFavorite) {
      favoritesLength.current = favorites.length;
      setNewRecordsLength(favorites.length - favoritesLength.current);
    }
  }, [favorites.length, isFavorite]);

  return (
    <div className="h-full flex flex-col">
      <header className=" bg-white flex justify-center gap-3 shadow-md z-40">
        <Tab onClick={viewToggle} isActive={!isFavorite}>
          {i18n.tabs.search}
        </Tab>
        <Tab onClick={viewToggle} isActive={isFavorite}>
          {i18n.tabs.saved}
          {newRecordsLength > 0 && (
            <span className=" ml-2 bg-green-400 text-white px-2 rounded-full ">
              {newRecordsLength}
            </span>
          )}
        </Tab>
      </header>

      <main className=" flex-grow overflow-y-scroll">{children}</main>
    </div>
  );
};
