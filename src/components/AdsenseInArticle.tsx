import React, { useEffect, useRef } from "react";

const AdsenseInArticle: React.FC = () => {
  const insRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carrega o script AdSense apenas uma vez
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8354217353620660";
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
    try {
      // @ts-expect-error: adsbygoogle não está tipado em window, mas é fornecido pelo AdSense
      if (window.adsbygoogle) {
        // @ts-expect-error: push é método do objeto adsbygoogle do AdSense
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // Silencia erros do AdSense
    }
  }, []);

  return (
    <div ref={insRef} className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8354217353620660"
        data-ad-slot="8828413523"
      ></ins>
    </div>
  );
};

export default AdsenseInArticle;
