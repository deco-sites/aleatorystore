import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import { useScript } from "deco/hooks/useScript.ts";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />

        <link
          rel="preconnect"
          href={asset("/fonts/Northwell.ttf")}
          as="font"
          type="font/woff2"
        />

        <link
          rel="preconnect"
          href={asset("/fonts/RedHatDisplayRegular.ttf")}
          as="font"
          type="font/woff2"
        />

        <link
          rel="preconnect"
          href={asset("/fonts/RedHatDisplayMedium.ttf")}
          as="font"
          type="font/woff2"
        />

        <link
          rel="preconnect"
          href={asset("/fonts/RedHatDisplaySemiBold.ttf")}
          as="font"
          type="font/woff2"
        />

        <link
          rel="preconnect"
          href={asset("/fonts/RedHatDisplayBold.ttf")}
          as="font"
          type="font/woff2"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `

          @font-face{
              font-family: 'Red Hat Display Regular';
              src: url(${
            asset("/fonts/RedHatDiplayRegular.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            } 

            @font-face{
              font-family: 'Northwell';
              src: url(${asset("/fonts/Northwell.ttf")}) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            }

            
            @font-face{
              font-family: 'Red Hat Display';
              src: url(${
            asset("/fonts/RedHatDiplayMedium.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            }

            @font-face{
              font-family: 'Red Hat Display';
              src: url(${
            asset("/fonts/RedHatDiplaySemiBold.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            }

            @font-face{
              font-family: 'Red Hat Display';
              src: url(${
            asset("/fonts/RedHatDiplaySemiBold.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            }
          `,
        }}
      />
    </>
  );
});
