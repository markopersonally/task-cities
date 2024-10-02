import { useState, useEffect } from "react";
import Cites from "./Cities";

interface City {
  id: string;
  name: {
    common: string;
  };
}

export default function ContainerList() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => {
        setCities(data);
        console.log(data)
      });
  }, []);

  return <Cites cities={cities} />;
}
