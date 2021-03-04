import Link from "next/link";
import Image from "next/image";

import { API_URL, fromImageToUrl } from "../../utils/urls";

const Listing = ({ listing }) => {
  if (!listing) return <div>404</div>;

  return (
    <>
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
          width: "80%",
          margin: "3rem auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ width: 1024, height: 720 }}>
          <Image
            src={fromImageToUrl(listing.featured_image.formats.large)}
            layout="responsive"
            width={listing.featured_image.formats.large.width}
            height={listing.featured_image.formats.large.height}
          />
        </div>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <span>
            <strong style={{ textTransform: "uppercase" }}>Name:</strong>
            <h1
              style={{
                padding: "0.5rem 0",
                color: "gray",
                textTransform: "capitalize",
              }}
            >
              {listing.title}
            </h1>
          </span>
          <span>
            <strong style={{ textTransform: "uppercase" }}>description:</strong>
            <h3
              style={{
                padding: "0.5rem 0",
                color: "gray",
                textTransform: "capitalize",
              }}
            >
              {listing.description}
            </h3>
          </span>
          <span>
            <strong style={{ textTransform: "uppercase" }}>Category:</strong>
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
            <strong style={{ textTransform: "uppercase" }}>Location:</strong>
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
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/listings`);
  const listings = await res.json();

  return {
    paths: listings.map((listing) => ({
      params: { slug: listing.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/listings?slug=${slug}`);
  const listings = await res.json();

  return {
    props: {
      listing: listings[0],
    },
    revalidate: 1,
  };
}

export default Listing;
