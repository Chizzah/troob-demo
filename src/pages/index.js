import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { API_URL, fromImageToUrl } from "../utils/urls";

export default function Index({ listings }) {
  return (
    <>
      <Head>
        <title>Home | Troob Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section style={{ width: "100%", background: "#000" }}>
        <Link href="/">
          <a
            style={{
              textDecoration: "none",
            }}
          >
            <h1
              style={{
                padding: "2rem",
                fontSize: "3.5rem",
                color: "salmon",
              }}
            >
              Troob Demo
            </h1>
          </a>
        </Link>
      </section>

      <section
        style={{
          height: "80vh",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {listings.map((listing) => {
          return (
            <div
              key={listing.id}
              style={{
                width: 360,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                border: "1px solid lightgray",
              }}
            >
              <div style={{ width: 360, height: 240 }}>
                <Link href={`/listings/${listing.slug}`}>
                  <a>
                    <Image
                      src={fromImageToUrl(listing.featured_image.formats.small)}
                      layout="responsive"
                      width={listing.featured_image.formats.small.width}
                      height={listing.featured_image.formats.small.height}
                    />
                  </a>
                </Link>
              </div>
              <div style={{ padding: "1rem" }}>
                <span>
                  <strong style={{ textTransform: "uppercase" }}>Name:</strong>
                  <h3
                    style={{
                      padding: "0.5rem 0",
                      color: "gray",
                      textTransform: "capitalize",
                    }}
                  >
                    {listing.title}
                  </h3>
                </span>
                <span>
                  <strong style={{ textTransform: "uppercase" }}>
                    Category:
                  </strong>
                  <h3
                    style={{
                      padding: "0.5rem 0",
                      color: "gray",
                      textTransform: "capitalize",
                    }}
                  >
                    {listing.listingType}
                  </h3>
                </span>
                <span>
                  <strong style={{ textTransform: "uppercase" }}>
                    Location:
                  </strong>
                  <h3
                    style={{
                      padding: "0.5rem 0",
                      color: "gray",
                      textTransform: "capitalize",
                    }}
                  >
                    {listing.location}
                  </h3>
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/listings/`);
  const listings = await res.json();

  return {
    props: {
      listings,
    },
    revalidate: 1,
  };
}
