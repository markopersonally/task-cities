interface City {
  id: string;
  name: {
    common: string;
  };
}

interface CitesProps {
  cities: City[];
}

const Cites: React.FC<CitesProps> = ({ cities }) => {
  return (
    <div>
      {cities.map((city) => (
        <ul key={city.id}>
          <li>{city.name.common}</li>
        </ul>
      ))}
    </div>
  );
};

export default Cites;
