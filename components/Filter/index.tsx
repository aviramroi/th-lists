import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { IGetBusinessRequest } from "../../lib/api/query";
import { defaultSearch } from "../../lib/constants";
import { Input } from "./input";
import { QtyInput } from "./QtyInput";

export const Filter = ({
  refetch,
}: {
  refetch: (val: IGetBusinessRequest) => Promise<void>;
}) => {
  const {
    query,
  }: {
    query: {
      t?: string;
      p?: string;
      l?: string;
    };
  } = useRouter();

  const [searchTerm, setSearchTerm] = useState(query.t ?? defaultSearch.term);
  const [searchLocation, setSearchLocation] = useState(
    query.p ?? defaultSearch.location
  );
  const [searchLimit, setSearchLimit] = useState(
    query.l ? +query.l : defaultSearch.limit
  );
  const [isEnabled, setEnabled] = useState(false);

  const delay = 500;

  const term = useDebounce(searchTerm, delay);
  const location = useDebounce(searchLocation, delay);
  const limit = useDebounce(searchLimit, delay);

  useEffect(() => {
    if (isEnabled) {
      refetch({
        limit,
        term,
        location,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, location, limit]);

  return (
    <div
      className="flex flex-col gap-3 bg-white py-3 px-5 sticky top-0 z-30 md:flex-row"
      onClick={() => setEnabled(true)}
    >
      <Input
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
      />
      <Input
        value={searchLocation}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchLocation(e.target.value);
        }}
      />
      <QtyInput value={searchLimit} setValue={setSearchLimit} />
    </div>
  );
};
