import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
// @ts-nocheck
//@ts-ignore
function Location({ data }) {
  const router = useRouter();
  // const { magicValue } = router.query;
  const { locationsData } = data;
  const [searchValue, setSearchValue] = useState(data.magicValue);
  const [locations, setLocations] = useState(locationsData);
  // console.log(locations);
  // console.log(data);
  // console.log(router.query);
  // console.log(magic);

  // Render data...

  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      `https://exposure-events.develop.tracing.tmp19.net/current-exposure-locations.json`
    );
    const locations = await res.json();
    setLocations(locations.items);
    console.log(locations);
  };

  return (
    <div>
      <h2>Location page</h2>
      <a href="/">Go home</a>
      <ul>
        <li>
          <Link href="/location/abc">
            <a>Go to /location/abc</a>
          </Link>
        </li>
        <li>
          <Link href="/location/abc?foo=bar">
            <a>Also goes to /location/abc?foo=bar</a>
          </Link>
        </li>
        <li>
          <a
            href="/location/abcde"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Do nothing
          </a>
        </li>
      </ul>
      <form action="/location/ddd" method="GET" onSubmit={handleSubmit}>
        <input
          type="text"
          name="region"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <input type="submit" name="search" />
      </form>

      <table>
        <tbody>
          {
            //@ts-ignore
            locations &&
              locations.map((location: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{location.eventId}</td>
                    <td>{location.eventName}</td>
                    <td>{location.startDateTime}</td>
                    <td>{location.endDateTime}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>

      <noscript>
        <span>Your js is disabled</span>
      </noscript>
    </div>
  );
}

// This gets called on every request
//@ts-ignore
export async function getServerSideProps(context) {
  // Fetch data from external API
  // const res = await fetch(
  //   `https://exposure-events.develop.tracing.tmp19.net/current-exposure-locations.json`
  // );
  // const locations = await res.json();
  // console.log(locations);
  const data = {
    magicValue: context.query?.region || "",
    locationsData: [],
  };

  // Pass data to the page via props
  return { props: { data } };
}

export default Location;
