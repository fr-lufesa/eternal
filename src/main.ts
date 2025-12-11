import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import AppComponent from "./app/app.component";

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const minTime = 1500; // 1.5s como antes

    setTimeout(() => {
      loader.classList.add("hidden");

      // esperar el fade-out (1s) y quitarlo del DOM
      setTimeout(() => loader.remove(), 1000);
    }, minTime);
  })
  .catch((err) => console.error(err));
