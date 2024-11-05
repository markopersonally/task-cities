import { useState, useEffect } from "react";
import { URL } from "../data/data";

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
  };
}

export default function CountrySearch() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await URL;
        if (!res.ok) throw new Error("Failed to fetch countries");

        const data: Country[] = await res.json();
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Country Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="country-list">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div key={country.name.common} className="country-card">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="country-flag"
                />
                <div className="country-info">
                  <h2>{country.name.common}</h2>
                  <p>Capital: {country.capital?.[0] || "N/A"}</p>
                  <p>Population: {country.population.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No countries found</p>
          )}
        </div>
      )}
    </div>
  );
}
