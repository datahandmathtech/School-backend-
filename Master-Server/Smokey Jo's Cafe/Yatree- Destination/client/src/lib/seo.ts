import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Yatree Destination",
  description: "Yatree Destination is Udaipur's premier Taxi Service & Rajasthan Tour Agency. We provide professional Airport Taxi, Luxury Innova Crysta Rental, and Tempo Traveller in Udaipur. Explore Rajasthan with our curated expert tour packages.",
  url: "https://www.yatreedestination.com",
  ogImage: "/logo.png",
  twitterHandle: "@yatreedestination",
  address: "97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3, UDAIPUR, Udaipur, Rajasthan, 313001",
  phone: "+91 76270 13579",
  email: "Kavishjain@yatreedestination.com",
  keywords: [
    "Taxi Service in Udaipur",
    "Cab Service in Udaipur",
    "Udaipur Sightseeing Taxi",
    "Corporate Travel Udaipur",
    "Wedding Car Rental Udaipur",
    "Rajasthan Tour Packages",
    "Tempo Traveller in Udaipur",
    "Airport Taxi Udaipur",
    "Innova Crysta Rental Udaipur",
    "Luxury Car Rental Udaipur"
  ]
};

export function constructMetadata({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  icons = "/logo.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`
    },
    description,
    keywords: SITE_CONFIG.keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ],
      type: "website",
      siteName: SITE_CONFIG.name
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle
    },
    icons,
    verification: {
      google: "REPLACE_THIS_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
    },
    metadataBase: new URL(SITE_CONFIG.url),
    ...(noIndex && {
      robots: {
        index: true,
        follow: true
      }
    })
  };
}

// Structured Data (JSON-LD) Helpers
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency", "TaxiService"],
    "name": SITE_CONFIG.name,
    "image": `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    "@id": SITE_CONFIG.url,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.5764,
      "longitude": 73.6835
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/yatreedestination",
      "https://www.instagram.com/yatreedestination"
    ]
  };
}

export function getServiceSchema(serviceName: string, description: string, priceStartsAt: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name
    },
    "areaServed": {
      "@type": "City",
      "name": "Udaipur"
    },
    "offers": {
      "@type": "Offer",
      "price": priceStartsAt,
      "priceCurrency": "INR"
    }
  };
}

export function getFAQSchema(faqs: { q: string, a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}
