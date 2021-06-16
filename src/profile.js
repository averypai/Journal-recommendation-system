import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
  <div id = "team"
  className="flourish-embed flourish-cards" data-src="visualisation/6414211" style={{
    // display:"flex",
          width: "70%",
          flexDirection:"row",
          height: "30%",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
        <HelmetProvider>
          <Helmet>
            <script src="https://public.flourish.studio/resources/embed.js"></script>
          </Helmet>
        </HelmetProvider>
    </div>
  );
}