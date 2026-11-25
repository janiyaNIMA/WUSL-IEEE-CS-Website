// Authentic event assets
import ieeextreme from "../../assets/events/ieeextreme19-1.jpeg";
import techx from "../../assets/events/techx.jpg";
import innova from "../../assets/events/innova.png";
import spectrum from "../../assets/events/spectrum.jpg";
import byteAndBuild from "../../assets/events/byte-and-build-2.jpeg";
import ignitron from "../../assets/events/ignitron-1.jpeg";

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  link: string;
  alt: string;
}

export const EVENT_DATA: EventItem[] = [
  {
    id: "ieeextreme19",
    title: "IEEEXtreme 19.0 Coding Competition",
    category: "Coding Competition",
    date: "October 25, 2025",
    image: ieeextreme,
    link: "/events",
    alt: "Participants solving algorithmic challenges during IEEEXtreme 19.0 Coding Competition",
  },
  {
    id: "techx-2025",
    title: "TechX Sri Lanka 2025",
    category: "Annual Conference",
    date: "July 26, 2025",
    image: techx,
    link: "/events",
    alt: "TechX Sri Lanka annual technology conference banner and keynotes",
  },
  {
    id: "innova-2025",
    title: "Innova Innovation Summit",
    category: "Innovation Summit",
    date: "July 17, 2025",
    image: innova,
    link: "/events",
    alt: "Innova Innovation Summit showcasing student ideation and tech projects",
  },
  {
    id: "spectrum-2025",
    title: "Spectrum of Light 2025 – Vesak Photography Competition",
    category: "Photography Competition",
    date: "May 10, 2025",
    image: spectrum,
    link: "/events",
    alt: "Spectrum of Light Vesak photography competition celebration and gallery",
  },
  {
    id: "byte-and-build",
    title: "“Byte & Build” Game Development Workshop",
    category: "Technical Workshop",
    date: "April 30 – May 1, 2025",
    image: byteAndBuild,
    link: "/events",
    alt: "Hands-on prototype development during the Byte & Build workshop",
  },
  {
    id: "ignitron",
    title: "IGNITRON Awareness Session",
    category: "Awareness Session",
    date: "March 22, 2025",
    image: ignitron,
    link: "/events",
    alt: "Students attending the IGNITRON robotics and engineering awareness session",
  },
];
