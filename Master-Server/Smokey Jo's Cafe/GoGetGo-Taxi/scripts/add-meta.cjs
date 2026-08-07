const fs = require('fs');
const path = require('path');

const routes = {
  'about': { title: 'About Us', description: "Learn about Yatree Destination, Udaipur's most trusted taxi service..." },
  'airport-taxi-udaipur': { title: 'Airport Taxi Udaipur', description: 'Reliable and punctual airport taxi transfers in Udaipur.' },
  'cab-service-in-udaipur': { title: 'Cab Service in Udaipur', description: 'Premium cab service in Udaipur for local sightseeing and outstation trips.' },
  'contact': { title: 'Contact Us', description: 'Get in touch with Yatree Destination for all your travel needs.' },
  'corporate-travel-udaipur': { title: 'Corporate Travel in Udaipur', description: 'B2B corporate travel solutions in Udaipur. Premium fleet, GST billing.' },
  'event-transportation-udaipur': { title: 'Event Transportation Udaipur', description: 'Reliable event and conference transportation in Udaipur.' },
  'explore-udaipur': { title: 'Explore Udaipur', description: 'Discover the magic of the City of Lakes with local expert guides.' },
  'innova-crysta-rental-udaipur': { title: 'Innova Crysta Rental Udaipur', description: 'Rent a luxury Toyota Innova Crysta in Udaipur.' },
  'rajasthan-tour-packages': { title: 'Rajasthan Tour Packages', description: 'Curated Rajasthan tour packages starting from Udaipur.' },
  'taxi-service-in-udaipur': { title: 'Taxi Service in Udaipur', description: "Udaipur's #1 Taxi Service. Book reliable cabs for local sightseeing." },
  'tempo-traveller-udaipur': { title: 'Tempo Traveller in Udaipur', description: 'Rent luxury Tempo Travellers in Udaipur for group tours.' },
  'wedding-car-rental-udaipur': { title: 'Wedding Car Rental Udaipur', description: 'Luxury wedding car rentals and complete guest transportation logistics.' }
};

const baseDir = path.join(__dirname, '..', 'client', 'src', 'app');

for (const [route, meta] of Object.entries(routes)) {
  const dirPath = path.join(baseDir, route);
  const layoutPath = path.join(dirPath, 'layout.tsx');
  
  if (fs.existsSync(dirPath)) {
    const isService = !['about', 'contact', 'explore-udaipur'].includes(route);
    const imports = isService ? 'import { constructMetadata, getServiceSchema } from "@/lib/seo";' : 'import { constructMetadata } from "@/lib/seo";';
    const schemaRender = isService ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("${meta.title}", "${meta.description}", "800")) }} />` : '';

    const content = `${imports}

export const metadata = constructMetadata({
  title: "${meta.title}",
  description: "${meta.description}",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}${schemaRender}
    </>
  );
}
`;
    fs.writeFileSync(layoutPath, content);
    console.log(`Created schema-injected layout.tsx for /${route}`);
  }
}
