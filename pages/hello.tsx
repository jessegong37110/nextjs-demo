//@ts-ignore
function Hello({ data }) {
  // Render data...
  return (
    <div>
      <h2>Hello page</h2>
      <a href="/">Go home</a>
    </div>
  );
}

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default Hello;
