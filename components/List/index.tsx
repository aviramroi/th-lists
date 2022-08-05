import { Fragment, useContext } from "react";
import { MdDataSaverOff, MdSearch } from "react-icons/md";
import { MainContext } from "../../context";
import { i18n } from "../../lib/labels";
import { IBusiness } from "../../types";
import { Card } from "../Card";

export const List = ({
  business,
  loading = false,
}: {
  business: IBusiness[];
  loading?: boolean;
}) => {
  const { handleFavoritePressed, favorites } = useContext(MainContext);

  return (
    <Fragment>
      {loading && (
        <Fragment>
          <div className=" bg-gray-700 opacity-40 h-full w-full z-50 absolute" />
          <div className=" x z-50 text-white absolute text-5xl  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            {/* loading ... */}
            <MdDataSaverOff className=" animate-spin" />
          </div>
        </Fragment>
      )}
      {business.length == 0 && (
        <h2 className=" w-full text-center ">{i18n.emptyList}</h2>
      )}
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 mx-auto pb-4 px-5 ">
        {business.map((b) => (
          <Card
            key={b.id}
            state={b}
            isFavorite={favorites.includes(b.id)}
            handleFavoritePressed={() => handleFavoritePressed(b.id)}
          />
        ))}
      </div>
    </Fragment>
  );
};
