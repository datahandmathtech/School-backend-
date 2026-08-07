import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, type = 'website', schema }) => {
  const siteName = "Hand Math IT Solutions";
  const defaultDesc = "India's leading IT company providing Custom Software Development, Digital Marketing, SEO, App Development, and Cloud Services. Transform your business with smart technology.";
  
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDesc} />
      {url && <link rel="canonical" href={`https://handmathtechnologiesindia.com${url}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta property="og:description" content={description || defaultDesc} />
      {url && <meta property="og:url" content={`https://handmathtechnologiesindia.com${url}`} />}
      <meta property="og:image" content="https://handmathtechnologiesindia.com/logo.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content="https://handmathtechnologiesindia.com/logo.png" />

      {/* Dynamic JSON-LD Structured Data for AI & Search Engines */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
