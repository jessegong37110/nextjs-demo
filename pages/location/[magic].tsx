import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import fetch from "node-fetch";
// @ts-nocheck
//@ts-ignore
function Location({ data }) {
  try {
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
      //@ts-ignore
      setLocations(locations.items);
      console.log(locations);
    };
    if (data.error) {
      return <div>{data.error}</div>;
    } else {
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
  } catch (e: any) {
    return <div>{e.message}</div>;
  }
}

// This gets called on every request
//@ts-ignore
export async function getServerSideProps(context) {
  try {
    // Fetch data from external API
    const res = await fetch(
      `https://exposure-events.develop.tracing.tmp19.net/current-exposure-locations.json`
    );
    const locations = await res.json();
    // const locations = {
    //   items: [
    //     {
    //       eventId: "a0l2N000000SptcQAC",
    //       eventName: "McDonald UPDATE",
    //       startDateTime: "2021-09-14T00:00:00.000Z",
    //       endDateTime: "2021-09-14T01:30:00.000Z",
    //       publicAdvice: "Add Update for McDonald",
    //       location: [Object],
    //     },
    //     {
    //       eventId: "a0l2N000000SptDQAS",
    //       eventName: "Queensgate",
    //       startDateTime: "2021-09-15T19:00:00.000Z",
    //       endDateTime: "2021-09-15T20:03:00.000Z",
    //       publicAdvice: null,
    //       location: [Object],
    //     },
    //     {
    //       eventId: "a0l2N000000Tbt5QAC",
    //       eventName: "Sammy Travel Event updated",
    //       startDateTime: "2021-10-05T20:15:00.000Z",
    //       endDateTime: "2021-10-06T04:45:00.000Z",
    //       publicAdvice: "Sammy Travel added",
    //       location: [Object],
    //     },
    //   ],
    // };
    console.log(locations);
    //@ts-ignore
    const data = {
      magicValue: context.query?.region || "",
      //@ts-ignore
      locationsData: locations.items,
      error: null,
    };

    // Pass data to the page via props
    return { props: { data } };
  } catch (e: any) {
    const data = {
      magicValue: context.query?.region || "",
      locationsData: [],
      error: e.message,
    };
  }
}

export default Location;
