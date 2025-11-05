import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';

const Covarage = () => {

  const warehouse = useLoaderData()


  return (
    <div>
      <BangladeshMap warehouse={warehouse} />
    </div>
  );
}

export default Covarage