const loadGT = (callback) => {
    const existingScript = document.getElementsByClassName('goog-te-combo');
    console.log(existingScript);
    if (existingScript.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.className = 'goog-te-combo';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };
  export default loadGT;