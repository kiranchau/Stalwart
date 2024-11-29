import React, { createContext, useContext, useState, useEffect } from "react";

const SplashScreenContext = createContext();

export function SplashScreenProvider({ children }) {
  const [count, setCount] = useState(0);
  let visible = count > 0;

  // console.log("visible1>>", visible, "  count>>", count);


  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");
    const splashScreen_logo = document.getElementById("kt_body");

    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");
      // console.log("entered if method in spashIF");


      return () => {
        splashScreen.classList.add("hidden");
        // console.log("return method in spash1");

      };
    }

    // Hide SplashScreen
    let timeout;


    if (splashScreen && !visible) {
      // console.log("entered else method in spash ELSE");

      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
        splashScreen_logo.classList.remove("unique-splash");
      }, 1100);
    }

    return () => {
      clearTimeout(timeout);
      // console.log("return method in spash2");

    };
  }, [visible]);

  return (
    <SplashScreenContext.Provider value={setCount}>
      {children}
    </SplashScreenContext.Provider>
  );
}

export function LayoutSplashScreen({ visible = true }) {
  // Everything are ready - remove splashscreen
  const setCount = useContext(SplashScreenContext);
  // console.log("visible2>>", visible, "");

  //   useEffect(() => {
  //     if (!visible) {
  //       return;
  //     }

  //     setCount(prev => {
  //       return prev + 1;

  //     });

  //     return () => {
  //       setCount(prev => {
  //         return prev - 1;
  //       });
  //       console.log("return called>>");

  //     };
  //   }, [setCount, visible]);

  return null;
}
