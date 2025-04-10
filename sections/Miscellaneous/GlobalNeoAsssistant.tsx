import { Head } from "$fresh/runtime.ts";

interface NeoAssistTag {
  querystring: boolean;
  pageid: string;
  clientdomain: string;
  initialize: Record<string, unknown>;
}

declare global {
  interface Window {
    NeoAssistTag: NeoAssistTag;
  }
}
const scriptStr = `
(function() {
window.NeoAssistTag = {};
NeoAssistTag.querystring = true;
NeoAssistTag.pageid = '';
NeoAssistTag.clientdomain = 'aleatory.neoassist.com';
NeoAssistTag.initialize = {};
var na = document.createElement('script');
na.type = 'text/javascript';
na.async = true;
na.src = 'https://cdn.atendimen.to/n.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(na, s);
})();
`;
export default function GlobalNeoAsssistant() {
  return (
    <Head>
      <script dangerouslySetInnerHTML={{ __html: scriptStr }} />
    </Head>
  );
}
