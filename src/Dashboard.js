import { Helmet, HelmetProvider } from "react-helmet-async";
import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["Indie Flower", "Kalam"]
  }
});

export default function App() {
  return (
    <div
      id="dashboard"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        height: "70%",
        width: "auto",
        backgroundColor: "white", 
      }}
    >
      <div
        className="flourish-embed flourish-bar-chart-race"
        data-src="visualisation/6362310"
        style={{
          width: "50%",
          height: "20%",
          marginTop: "40px",
          marginLeft: "40px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2
          style={{
            display: "fixed",
            fontFamily: "Indie Flower",
            fontWeight: "bold"
          }}
        >
          Motivation
        </h2>
        <p
          style={{
            fontFamily: "Kalam"
            // fontWeight: "bold"
          }}
        >
          We aim to build a search engine for journals. It can help researchers
          easier to find the most relevant journals based on the paper about
          Covid-19 they’re publishing. It can help them to find papers for
          reference more efficiently or they may have a better shot at
          publishing in these recommended journals.
        </p>
        <HelmetProvider>
          <Helmet>
            <script src="https://public.flourish.studio/resources/embed.js"></script>
          </Helmet>
        </HelmetProvider>
      </div>
      <div
        className="flourish-embed flourish-table"
        data-src="story/230195"
        style={{
          width: "50%",
          height: "20%",
          marginTop: "40px",
          marginRight: "40px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <HelmetProvider>
          <Helmet>
            <script src="https://public.flourish.studio/resources/embed.js"></script>
          </Helmet>
        </HelmetProvider>
      </div>
    </div>
  );
}
